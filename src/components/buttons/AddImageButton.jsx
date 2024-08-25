import { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";

import { uploadImage } from "../../services/imagesService";
import { uploadToBucket } from "../../services/filesService.js";

function AddImageButton({
  product,
  images,
  setImages,
  setImageIndex,
  isWaitingResponse,
  setIsWaitingResponse  }) {

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmitFiles = async () => {
    setIsWaitingResponse(true);

    const form_Data = new FormData();
    form_Data.append('prefix', product.id);
    const currentSelectedFiles = selectedFiles;
    for (let file of currentSelectedFiles)
      form_Data.append('files', file);

    try {
      const uploadedFiles = await uploadToBucket(form_Data);

      const newImages = [];
      for (let fileName of uploadedFiles) {
        const newImageResult = await uploadImage(fileName, product.id);
        newImages.push(newImageResult);
      }
      const updatedNewImages = newImages.map(image => ({
        ...image,
        isDeleting: false,
      }));
      setImages([...images, ...updatedNewImages]);
      setImageIndex(0);
    } catch (error) {
      console.log(error); 
    } finally {
      setIsWaitingResponse(false);
      setSelectedFiles([]);
    }
  };

  return (
    <div className={`flex ${selectedFiles.length > 0 ? 'w-[120px]' : 'w-[80px]'}  h-[80px]`}>
      <label htmlFor="file-upload" className={`bg-purp-dark/10 scale-95 transition hover:scale-100 flex items-center justify-center  w-[80px] h-[80ox] cursor-pointer border-4 border-purp-dark border-dashed rounded-lg`}>
        {selectedFiles.length > 0 ? (
          <p>{`${selectedFiles.length} foto(s)`}</p>
        ) : (
          <FaPlus size='2.5rem' color="#605399" />
        )}
      </label>
      <input
        type="file"
        id='file-upload'
        multiple
        accept=".jpeg,.jpg,.png,.gif"
        onChange={handleFileChange}
        className="hidden"
        />
      {selectedFiles.length > 0 &&
        <button
        type="button"
        onClick={handleSubmitFiles}
        disabled={isWaitingResponse}
        className={`flex items-center justify-center scale-95 transition hover:scale-100 bg-purp-dark w-[35px] h-full rounded-lg disabled:opacity-75 disabled:hover:scale-95`}
        >
          {isWaitingResponse ? (
            <AiOutlineLoading color='white' size='1.4rem' className='animate-spin' />
          ) : (
            <HiUpload color="white" size='1.5rem' />
          )}
        </button>
      }
    </div>
  );
};

export default AddImageButton;