function OpenModalButton({ handleClick, icon }) {
  return (
    <button
      onClick={() => handleClick()}
      type="button"
      className="bg-purp-dark p-2 rounded-[50%] hover:scale-105 transition"
    >
      {icon}
    </button>

  );
};

export default OpenModalButton;