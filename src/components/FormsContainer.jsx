import { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm';

function FormsContainer() {

  const [hideLogin, setHideLogin] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const handleCLick = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setHideLogin(!hideLogin);
      setAnimationClass('fade-in');
    }, 300);
  };

  return (
    <div className='flex flex-col w-[450px] bg-purp-light'>
      <div className='p-4 pb-0 flex'>
        <button type='button' onClick={handleCLick} className='w-[35%] flex flex-col items-center text-xl font-semibold'>
          Iniciar sesión
          {!hideLogin && <p className='mt-1 w-[80%] border-b-4 border-b-purp-dark'></p>}
        </button>
        <button type='button' onClick={handleCLick} className='ml-1 w-[35%] flex flex-col items-center text-xl font-semibold'>
          Crear Cuenta
          {hideLogin && <p className='mt-1 w-[82.5%] border-b-4 border-b-purp-dark'></p>}
        </button>
      </div>
      <div className="flex items-center w-full bg-purp-light">
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