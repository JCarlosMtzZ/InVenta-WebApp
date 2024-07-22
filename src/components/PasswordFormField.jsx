import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function PasswordFormField({ value, handleInputChange, isValue }) {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword)
      setShowPassword(false);
    else
      setShowPassword(true);
  };

  return (
    <div>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Contraseña"
        value={value}
        onChange={handleInputChange}
        className={`mt-2 w-[100%] p-2 h-10 border-solid border-2 ${isValue ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
      />
      <button
        type="button"
        id="togglePassword"
        onClick={handleShowPassword}
        className="mt-2 h-10 absolute right-10 hover:scale-110 transition duration-200"
      >
        <div className="relative">
          <FaEye size='1.3rem'
            className={`transition-opacity duration-350 ${showPassword ? 'opacity-0' : 'opacity-45'}`} />
          
          <FaEyeSlash size='1.3rem'
            className={`transition-opacity duration-350 absolute top-0 left-0 ${showPassword ? 'opacity-45' : 'opacity-0'}`}
          />
        </div>
      </button>
    </div>
  );
};

export default PasswordFormField;
