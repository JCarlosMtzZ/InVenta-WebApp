export const handleCloseModal = (setModal, setAnimation, animation = 'fadeOutUp') => {
  setAnimation('animate-' + animation);
  setTimeout(() => {
    setModal(false);
    setAnimation('');
  }, 180);
};

export const handleOpenModal = (setModal, setAnimation, animation = 'fadeInDown') => {
  setAnimation('animate-' + animation);
  setModal(true);
  setTimeout(() => {
    setAnimation('');
  }, 200);
};

export const handleSlideAnimation = (setAnimation, startAnimation, endAnimation, value, setValue) => {
  setAnimation('animate-' + startAnimation);
  setTimeout(() => {
    setValue(value);
    setAnimation('animate-' + endAnimation);
    setTimeout(() => {
      setAnimation('');
    }, 200);
  }, 180);
};