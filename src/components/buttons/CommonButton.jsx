function CommonButton({ onClick, width, text }) {
  return (
    <button
      onClick={onClick}
      className={`${width} h-10 bg-purp-dark text-white rounded-lg disabled:opacity-75
        enabled:hover:bg-white enabled:hover:text-black enabled:hover:border-black enabled:hover:border-2
        transition`}
    >
      {text}
    </button>

  );
};

export default CommonButton;