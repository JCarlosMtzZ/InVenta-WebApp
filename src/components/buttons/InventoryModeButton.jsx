function InventoryModeButton({ onClick, isManaging, Icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`${isManaging ? 'opacity-100' : 'opacity-50'} flex flex-col items-center justify-center hover:scale-105 transition`}>
      {Icon}
      {text}
    </button>
  );
};

export default InventoryModeButton;