import { AiOutlineLoading } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

function DeleteImageButton({image, handleDelete}) {
  return (
    <button
      disabled={image.isDeleting}
      onClick={() => handleDelete(image)}
      className="transition p-1 top-0 right-0 rounded-lg bg-warn-red hover:bg-warn-red/50 absolute"
    >
      {image.isDeleting ?
        <div className="animate-spin">
          <AiOutlineLoading color="white" size='1.25rem' />
        </div>
        :
        <RiDeleteBin2Line color="white" size='1.25rem' />
      }
    </button>
  );
};

export default DeleteImageButton;