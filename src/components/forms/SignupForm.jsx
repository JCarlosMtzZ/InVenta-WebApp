import { useState } from "react";
import { useNavigate } from "react-router";

import FormFieldWarning from "../FormFieldWarning.jsx";
import PasswordFormField from "../inputs/PasswordFormField.jsx";
import FormSubmitButton from "../buttons/FormSubmitButton.jsx";
import InputWithWarning from "../inputs/InputWithWarning.jsx";

import { validateEmail, validatePassword } from "../../utilities/forms.jsx";

import { signup } from "../../services/adminsService.js";

function SignupForm({ checkAdmin, handleClose, className, isWaitingResponse, setIsWaitingResponse }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isFormData, setIsFormData] = useState({
    isFirstName: true,
    isLastName: true,
    isEmail: true,
    isPassword: true
  });
  const [emailFieldMessage, setEmailFieldMessage] = useState("Requerido");
  const [passwordFieldMessage, setPasswordFieldMessage] = useState("Requerido");

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

    if (name === "email")
      if (!value) setEmailFieldMessage("Requerido");
    if (name === "password")
      if (!value) setPasswordFieldMessage("Requerido");
  };

  const handleSubmit = async () => {
    setIsWaitingResponse(true);

    const currentIsFormData = {
      isFirstName: !!formData.firstName,
      isLastName: !!formData.lastName,
      isEmail: !!formData.email,
      isPassword: !!formData.password
    };
    
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      setIsWaitingResponse(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setEmailFieldMessage("Utiliza una dirección válida");
      setIsFormData({
        ...isFormData,
        isEmail: false});
      setIsWaitingResponse(false);
      return;
    }
    const passwordWarnMsg = validatePassword(formData.password);
    if (passwordWarnMsg) {
      setPasswordFieldMessage("Utiliza al menos " + passwordWarnMsg);
      setIsFormData({
        ...isFormData,
        isPassword: false});
      setIsWaitingResponse(false);
      return;
    }

    try {
      await signup(formData);
      await checkAdmin();
      navigate('/dashboard');
      handleClose();
    } catch (error) {
      setEmailFieldMessage("Correo electrónico en uso");
      setIsFormData({
        ...isFormData,
        isEmail: false,
      });
      console.error('Error while signing up:', error);
    } finally {
      setIsWaitingResponse(false);
    }
  };

  return (
    <div className={`w-[100%] h-[100%] p-8 flex flex-col justify-center relative ${className}`}>
      <div className='flex justify-between'>
        <InputWithWarning
          label='Nombre(s)'
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          isValue={isFormData.isFirstName}
          onChange={handleInputChange}
          message='Requerido'
          width='w-[48%]'
        />
        <InputWithWarning
          label='Apellidos'
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          isValue={isFormData.isLastName}
          onChange={handleInputChange}
          message='Requerido'
          width='w-[48%]'
        />
      </div>
      <InputWithWarning
        label='Correo electrónico'
        type='email'
        id='email'
        name='email'
        value={formData.email}
        isValue={isFormData.isEmail}
        onChange={handleInputChange}
        message={emailFieldMessage}
        width='w-full'
      />
      <PasswordFormField
        value={formData.password}
        handleInputChange={handleInputChange}
        isValue={isFormData.isPassword} />
      <FormFieldWarning
        hiddingDisplay='invisible'
        isFormField={isFormData.isPassword}
        message={passwordFieldMessage}
      />
      <FormSubmitButton
        isWaitingResponse={isWaitingResponse}
        handleSubmit={handleSubmit}
        text='Enviar'
      />
    </div>
  );
};

export default SignupForm;