import { MdOutlineCloudUpload } from "react-icons/md";

import FormFieldWarning from "../FormFieldWarning";

function UploadImageButton({ areFiles, selectedFiles, handleFileChange }) {
  return (
    <div className="flex flex-col">
      <div className={`flex flex-col w-full justify-center items-center border-2 ${areFiles ? 'border-black' : 'border-warn-red'} border-opacity-45 border-dashed rounded-lg`}>
        <label htmlFor="file-upload" className="p-2 w-full flex flex-col justify-center items-center cursor-pointer">
          <MdOutlineCloudUpload size="4rem" className="opacity-45" color={`${selectedFiles.length > 0 ? '#138808' : '#000000'}`} />
          {selectedFiles.length > 0 ? (
            <p className="text-sm">{`${selectedFiles.length} foto(s) seleccionada(s)`}</p>
          ) : (
            <p className="text-sm">Subir fotos</p>
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
      </div>
      <FormFieldWarning
        hiddingDisplay='invisible'
        isFormField={areFiles}
        message='Utiliza al menos 1 foto'
      />
    </div>
  );
};

export default UploadImageButton;