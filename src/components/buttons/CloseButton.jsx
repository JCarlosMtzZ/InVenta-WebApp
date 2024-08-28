import { IoCloseCircleOutline } from "react-icons/io5";

function CloseButton({ onClick }) {

  return (
    <button
      onClick={onClick}
      className="hover:scale-110 transition"  
    >
      <IoCloseCircleOutline size="1.75rem" />
    </button>
  );
};

export default CloseButton;