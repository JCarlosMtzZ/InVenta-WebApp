function HeaderButton({ onClick, text, isSelected }) {
  return (
    <button
      onClick={onClick}
      className='w-[150px] flex flex-col items-center text-lg font-semibold'
    >
      {text}
      {isSelected && <p className='mt-1 w-[105px] border-b-4 border-b-purp-dark'></p>}
    </button>
  );
};

export default HeaderButton;