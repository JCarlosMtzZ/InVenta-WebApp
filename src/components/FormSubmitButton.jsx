import { AiOutlineLoading } from 'react-icons/ai';

function FormSubmitButton({ isWaitingResponse, handleSubmit, text }) {
  return (
    <button
      disabled={isWaitingResponse}
      type="button"
      onClick={handleSubmit}
      className={`h-10 w-full bg-purp-dark text-white rounded-lg disabled:opacity-75
        enabled:hover:bg-white enabled:hover:text-black enabled:hover:border-black enabled:hover:border-2
        transition`}
    >
      {isWaitingResponse ? (
        <div className='flex items-center justify-center'>
          <AiOutlineLoading color='white' size='1.25rem' className='mr-3 animate-spin' />
          Cargando
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default FormSubmitButton;