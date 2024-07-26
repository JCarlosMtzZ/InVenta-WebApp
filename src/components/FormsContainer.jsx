import { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm';

function FormsContainer() {

  const [hideLogin, setHideLogin] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const handleCLick = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setHideLogin(!hideLogin);
      setAnimationClass('fade-in');
    }, 300);
  };

  return (
    <div className='w-full h-full sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg flex flex-col'>
      <div className='ml-2 mt-5 flex'>
        <button type='button' onClick={handleCLick} className='w-[150px] flex flex-col items-center text-lg font-semibold'>
          Iniciar sesión
          {!hideLogin && <p className='mt-1 w-[105px] border-b-4 border-b-purp-dark'></p>}
        </button>
        <button type='button' onClick={handleCLick} className='ml-1 w-[150px] flex flex-col items-center text-lg font-semibold'>
          Crear Cuenta
          {hideLogin && <p className='mt-1 w-[110px] border-b-4 border-b-purp-dark'></p>}
        </button>
      </div>
      <div>
        {hideLogin ? (
          <SignupForm
            className={animationClass}
            isWaitingResponse={isWaitingResponse}
            setIsWaitingResponse={setIsWaitingResponse}
          />
        ) : (
          <LoginForm
            className={animationClass}
            isWaitingResponse={isWaitingResponse}
            setIsWaitingResponse={setIsWaitingResponse}
          />
        )}
      </div>
    </div>  
  );
};

export default FormsContainer;