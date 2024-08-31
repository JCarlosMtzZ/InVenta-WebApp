import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormFieldWarning from "../FormFieldWarning.jsx";
import PasswordFormField from "../inputs/PasswordFormField.jsx";
import FormSubmitButton from "../buttons/FormSubmitButton.jsx";
import InputWithWarning from "../inputs/InputWithWarning.jsx";

import { login } from "../../services/adminsService.js";

function LoginForm({ animationClass, checkAdmin, handleClose, isWaitingResponse, setIsWaitingResponse }) {

  const [isResponseOk, setIsResponseOk] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isFormData, setIsFormData] = useState({
    isEmail: true,
    isPassword: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setIsFormData({
      ...isFormData,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}`]: !!value
    })
  };

  const handleSubmit = async () => {
    setIsResponseOk(true);
    setIsWaitingResponse(true);

    const currentIsFormData = {
      isEmail: !!formData.email,
      isPassword: !!formData.password
    };
    
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      setIsWaitingResponse(false);
      return;
    }

    try {
      const loginResult = await login(formData);
      if (loginResult === 404 || loginResult === 401) {
        setIsResponseOk(false);
        throw new Error('Invalid email or password');
      } else if (loginResult === 200) {
        await checkAdmin();
        navigate('/dashboard');
        handleClose();
      }
    } catch (error) {
      console.error('Error while logging in:', error); 
    } finally {
      setIsWaitingResponse(false);
    }
  };

  return (
    <div className={`${animationClass} w-[100%] h-[100%] p-8 flex flex-col justify-center relative`}>
      <FormFieldWarning
        hiddingDisplay='hidden'
        isFormField={isResponseOk}
        message='Correo o contraseña incorrectos'
      />
      <InputWithWarning
        label='Correo electrónico'
        type='email'
        id='email'
        name='email'
        value={formData.email}
        isValue={isFormData.isEmail}
        onChange={handleInputChange}
        message='Requerido'
        width='w-full'
      />
      <PasswordFormField
        value={formData.password}
        handleInputChange={handleInputChange}
        isValue={isFormData.isPassword} />
      <FormFieldWarning
        hiddingDisplay='invisible'
        isFormField={isFormData.isPassword}
        message='Requerido'
      />
      <FormSubmitButton
        isWaitingResponse={isWaitingResponse}
        handleSubmit={handleSubmit}
        text='Enviar'
        width='w-full'
      />
    </div>
  );
};

export default LoginForm;