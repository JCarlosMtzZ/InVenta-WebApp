import { useState } from "react";
import FormFieldWarning from "../FormFieldWarning.jsx";
import PasswordFormField from "../PasswordFormField.jsx";
import FormSubmitButton from "../FormSubmitButton.jsx";

function LoginForm({ checkAdmin, className, isWaitingResponse, setIsWaitingResponse }) {

  const [isResponseOk, setIsResponseOk] = useState(true);

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

  const handleSubmit = () => {
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

    fetch('http://localhost:3001/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) return response.json();
      if (response.status === 404 || response.status === 401) {
        setIsResponseOk(false);
        throw new Error('Correo electrónico o contraseña incorrectos');
      }
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsWaitingResponse(false);
      checkAdmin();
    });

  };

  return (
    <div className={`w-[100%] h-[100%] p-8 flex flex-col justify-center relative ${className}`}>
      <div className={`${isResponseOk ? 'hidden' : 'block'} mb-2`}>
        <FormFieldWarning
          isFormField={isResponseOk}
          message='Correo o contraseña incorrectos'
        />
      </div>
      <label htmlFor="email" className="mb-2">Correo electrónico</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="correo@ejemplo.com"
        value={formData.email}
        onChange={handleInputChange}
        className={`p-2 h-10 border-solid border-2 ${isFormData.isEmail ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
      />
      <FormFieldWarning
        isFormField={isFormData.isEmail}
        message='Requerido'
      />
      <PasswordFormField
        value={formData.password}
        handleInputChange={handleInputChange}
        isValue={isFormData.isPassword} />
      <FormFieldWarning
        isFormField={isFormData.isPassword}
        message='Requerido'
      />
      <FormSubmitButton
        isWaitingResponse={isWaitingResponse}
        handleSubmit={handleSubmit}
        text='Enviar'
      />
    </div>
  );
};

export default LoginForm;