function FilterButton({ text, value, onClick, filter }) {
  return (
    <button
      value={value}
      onClick={onClick}
      className={`${filter === value ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
    >
      {text}
    </button>
  );
};

export default FilterButton;