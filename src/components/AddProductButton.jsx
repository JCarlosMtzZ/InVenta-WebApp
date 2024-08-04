import { FaPlus } from "react-icons/fa";

function AddProductButton({ handleClick }) {
  return (
    <button onClick={() => handleClick()} type="button" className="bg-purp-dark p-2 rounded-[50%] hover:scale-105 transition">
      <FaPlus color="white" size='1.8rem' />
    </button>

  );
};

export default AddProductButton;