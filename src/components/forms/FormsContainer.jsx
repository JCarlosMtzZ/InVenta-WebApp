import { useState } from 'react';

import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import HeaderButton from '../buttons/HeaderButton.jsx';
import CloseButton from '../buttons/CloseButton.jsx';

import { handleSlideAnimation } from '../../utilities/animation.jsx';

function FormsContainer({
  animationClass,
  formAnimation,
  setFormAnimation,
  handleClose,
  checkAdmin,
  isWaitingResponse,
  setIsWaitingResponse }) {

  const [hideLogin, setHideLogin] = useState(false);

  return (
    <div className={`${animationClass} bg-black/70 absolute w-full min-h-[calc(100%-65px)] top-[65px] flex items-center justify-center z-20`}>
      <div className='bg-white w-full h-[calc(100vh-65px)] sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg flex flex-col'>
        <div className='ml-2 mr-7 mt-5 flex items-center'>
          <HeaderButton
            onClick={hideLogin ? () => handleSlideAnimation(setFormAnimation, 'fadeOutRight', 'fadeInRight', !hideLogin, setHideLogin) : undefined}
            text='Iniciar sesión'
            isSelected={!hideLogin}
          />
          <HeaderButton
            onClick={!hideLogin ? () => handleSlideAnimation(setFormAnimation, 'fadeOutLeft', 'fadeInLeft', !hideLogin, setHideLogin) : undefined}
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
              animationClass={formAnimation}
              checkAdmin={checkAdmin}
              handleClose={handleClose}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
            />
          ) : (
            <LoginForm
              animationClass={formAnimation}
              checkAdmin={checkAdmin}
              handleClose={handleClose}
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