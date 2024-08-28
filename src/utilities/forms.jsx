export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLocaleLowerCase());
};

export const validatePassword = (password) => {
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