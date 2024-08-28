function OpenModalButton({ onClick, items, Icon, style }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 hover:scale-105 transition fixed ${style} rounded-[50%] bg-purp-dark z-10`}
    >
      {items && items.length > 0 &&
        <div className="text-white text-sm font-semibold flex items-center justify-center p-1 w-[25px] h-[25px] absolute -top-[7px] -right-[7px] rounded-[50%] bg-mag">
          {items.length}
        </div>
      }
      {Icon}
    </button>

  );
};

export default OpenModalButton;