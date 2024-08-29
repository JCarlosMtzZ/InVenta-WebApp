import { useState } from 'react';

import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import HeaderButton from '../buttons/HeaderButton.jsx';
import CloseButton from '../buttons/CloseButton.jsx';

function FormsContainer({ setIsOpen, checkAdmin, isWaitingResponse, setIsWaitingResponse }) {

  const [hideLogin, setHideLogin] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const handleClick = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setHideLogin(!hideLogin);
      setAnimationClass('fade-in');
    }, 300);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`bg-black/70 absolute w-full min-h-[calc(100%-65px)] top-[65px] flex items-center justify-center z-20`}>
      <div className='bg-white w-full h-[calc(100vh-65px)] sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg flex flex-col'>
        <div className='ml-2 mr-7 mt-5 flex items-center'>
          <HeaderButton
            onClick={handleClick}
            text='Iniciar sesión'
            isSelected={!hideLogin}
          />
          <HeaderButton
            onClick={handleClick}
            text='Crear cuenta'
            isSelected={hideLogin}
          />
          <div className='ml-auto'>
            <CloseButton
              onClick={handleClose}
            />
          </div>
        </div>
        <div>
          {hideLogin ? (
            <SignupForm
              checkAdmin={checkAdmin}
              handleClose={handleClose}
              className={animationClass}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
            />
          ) : (
            <LoginForm
              checkAdmin={checkAdmin}
              handleClose={handleClose}
              className={animationClass}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
            />
          )}
        </div>
      </div>  
    </div> 
  );
};

export default FormsContainer;