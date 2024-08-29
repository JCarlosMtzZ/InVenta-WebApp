import { CgArrowsExchange } from "react-icons/cg";

function SwitchArrowsButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className='flex gap-1 group hover:drop-shadow-lg transition'
    >
      <CgArrowsExchange size='1.75rem' className='group-hover:rotate-180 transition' />
      {text && text}
    </button>
  );
};

export default SwitchArrowsButton;