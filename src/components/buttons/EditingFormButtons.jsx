import { AiOutlineLoading } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";

function EditingFormButtons({
  isWaitingResponse,
  handleSubmit,
  handleClose
}) {
  return (
    <div className='flex gap-1'>
      <button
        disabled={isWaitingResponse}
        onClick={handleSubmit}
        className='flex items-center justify-center w-[40px] h-[40px] disabled:opacity-70 scale-95 hover:scale-100 transition hover:opacity-70 bg-purp-dark rounded-lg p-1'    
      >
        {isWaitingResponse ? (
          <div className='animate-spin w-fit'>
            <AiOutlineLoading size='1.5rem' color='white' />
          </div>
        ) : (
          <GiConfirmed size='2rem' color='white' />
        )}
      </button>
      <button
        onClick={handleClose}
        className='w-[40px] h-[40px] scale-95 hover:scale-100 transition hover:opacity-70 bg-purp-dark rounded-lg p-1'    
      >
        <MdOutlineCancel size='2rem' color='white' />
      </button>
    </div>
  );
};

export default EditingFormButtons;