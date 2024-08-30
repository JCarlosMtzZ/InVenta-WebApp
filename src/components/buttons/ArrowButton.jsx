import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

function ArrowButton({ onClick, direction, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-purp-dark/10 rounded-lg enabled:hover:scale-110 transition p-1 shadow-lg disabled:opacity-50"
    >
      {direction === 'left' && <IoMdArrowDropleft size='2.5rem' color="#605399" />}
      {direction === 'right' && <IoMdArrowDropright size='2.5rem' color="#605399" />}
    </button>
  );
};

export default ArrowButton;