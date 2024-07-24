import { useState } from "react";
import FormFieldWarning from "./FormFieldWarning.jsx";
import PasswordFormField from "./PasswordFormField.jsx";

function LoginForm({ className }) {

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
    const currentIsFormData = {
      isEmail: !!formData.email,
      isPassword: !!formData.password
    };
    
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      return;
    }
  };

  return (
    <div className={`w-[100%] h-[100%] p-8 flex flex-col justify-center relative ${className}`}>
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
      <button
        type="button"
        onClick={handleSubmit}
        className="h-10 mt-2 bg-purp-dark text-white rounded-lg
          hover:bg-white hover:text-black hover:border-black hover:border-2
          transition"
      >
        Enviar
      </button>
    </div>
  );
};

export default LoginForm;