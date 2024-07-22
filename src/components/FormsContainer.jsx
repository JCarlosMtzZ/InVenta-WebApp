import { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm';

function FormsContainer() {

  const [hideLogin, setHideLogin] = useState(false);
  const [btnText, setBtnText] = useState("Crear cuenta");
  const [leftText, setLeftText] = useState("Utilizar una cuenta existente o");
  const [animationClass, setAnimationClass] = useState("fade-in");

  const handleCLick = () => {
    if (hideLogin) {
      setLeftText("Utilizar una cuenta existente o:");
      setBtnText("Crear cuenta");
    } else {
      setLeftText("Crea una nueva cuenta o:")
      setBtnText("Iniciar sesión");
    }
    setAnimationClass('fade-out');
    setTimeout(() => {
      setHideLogin(!hideLogin);
      setAnimationClass('fade-in');
    }, 300);
  };

  return (
    <div className="flex w-[80%] h-[70%] border-solid border-2 rounded-lg border-purp-dark">
      <div className="flex flex-col items-center justify-center w-[50%] h-[100%] bg-purp-dark">
        <FaRegUserCircle color="white" size="8rem" />
        <p className='mt-4 w-[60%] text-lg font-normal text-white text-center'>
          {leftText}
        </p>
        <button
          type='button'
          onClick={handleCLick}
          className='mt-4 h-10 w-[60%] text-white rounded-lg border-solid border-2 border-white
            hover:bg-white hover:text-black hover:border-black hover:scale-110 transition ease-in-out'>
          {btnText}
        </button>
      </div>
      <div className="flex items-center w-[50%] h-[100%] bg-purp-light">
        {hideLogin ? (
          <SignupForm className={animationClass} />
        ) : (
          <LoginForm className={animationClass} />
        )}
      </div>
    </div>
  );
};

export default FormsContainer;