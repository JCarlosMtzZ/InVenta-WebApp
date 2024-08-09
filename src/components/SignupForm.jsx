import { useState } from "react";
import FormFieldWarning from "./FormFieldWarning.jsx";
import PasswordFormField from "./PasswordFormField.jsx";
import FormSubmitButton from "./FormSubmitButton.jsx";

function SignupForm({ className, isWaitingResponse, setIsWaitingResponse }) {

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLocaleLowerCase());
  };

  const validatePassword = (password) => {
    const validationResult = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[\W_]/.test(password),
    };
    if (!validationResult.minLength) return "8 caracteres";
    if (!validationResult.hasUppercase) return "1 letra mayúscula";
    if (!validationResult.hasLowercase) return "1 letra minúscula";
    if (!validationResult.hasDigit) return "1 dígito";
    if (!validationResult.hasSpecialChar) return "1 carácter especial";
    return "";
  };

  const handleSubmit = () => {
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
    const currentEmail = formData.email;
    if (!validateEmail(currentEmail)) {
      setEmailFieldMessage("Utiliza una dirección válida");
      setIsFormData({
        ...isFormData,
        isEmail: false});
      setIsWaitingResponse(false);
      return;
    }
    const currentPassword = formData.password;
    const passwordWarnMsg = validatePassword(currentPassword);
    if (passwordWarnMsg) {
      setPasswordFieldMessage("Utiliza al menos " + passwordWarnMsg);
      setIsFormData({
        ...isFormData,
        isPassword: false});
      setIsWaitingResponse(false);
      return;
    }
    
    fetch('http://localhost:3001/admins/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) return response.json();
      if (response.status === 500) {
        setEmailFieldMessage("Correo electrónico en uso");
        setIsFormData({
          ...isFormData,
          isEmail: false,
        });
        throw new Error('Correo electrónico en uso');
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
    });
  };

  return (
    <div className={`w-[100%] h-[100%] p-8 flex flex-col justify-center relative ${className}`}>
      <div className='flex'>
        <div className="flex flex-col w-[48%] mr-[4%]">
          <label htmlFor="firstName" className="mb-2">Nombre(s)</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`p-2 h-10 border-solid border-2 ${isFormData.isFirstName ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
          />
          <FormFieldWarning
            isFormField={isFormData.isFirstName}
            message='Requerido'
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="lastName" className="mb-2">Apellidos</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`p-2 h-10 border-solid border-2 ${isFormData.isLastName ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
          />
          <FormFieldWarning
            isFormField={isFormData.isLastName}
            message='Requerido'
          />
        </div>
      </div>
      <label htmlFor="email" className="mb-2">Correo electrónico</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="correo@ejemplo.com"
        value={formData.email}
        onChange={handleInputChange}
        className={`mt-2 p-2 h-10 border-solid border-2 ${isFormData.isEmail ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
      />
      <FormFieldWarning
        isFormField={isFormData.isEmail}
        message={emailFieldMessage}
      />
      <PasswordFormField
        value={formData.password}
        handleInputChange={handleInputChange}
        isValue={isFormData.isPassword} />
      <FormFieldWarning
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