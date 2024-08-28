import { useState } from "react";

import FormSubmitButton from "../buttons/FormSubmitButton.jsx";
import CloseButton from "../buttons/CloseButton.jsx";
import InputWithWarning from "../inputs/InputWithWarning.jsx";
import DropdownButton from "../buttons/DropdownButton.jsx";
import UploadImageButton from "../buttons/UploadImageButton.jsx";
import CommonButton from "../buttons/CommonButton.jsx";

import { addProduct, getProductCategoryImagesDiscountsById } from "../../services/productsService.js";
import { getFilesByPrefix, uploadToBucket } from "../../services/filesService.js";
import { uploadImage } from "../../services/imagesService.js";

function AddProductForm({
  categories,
  products,
  setProducts,
  handleClose,
  isWaitingResponse,
  setIsWaitingResponse }) {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    size: '',
    unitPrice: '',
    stock: '',
    categoryId: ''
  });
  const [isFormData, setIsFormData] = useState({
    isName: true,
    isDescription: true,
    isBrand: true,
    isSize: true,
    isUnitPrice: true,
    isStock: true,
    isCategoryId: true
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [areFiles, setAreFiles] = useState(true);

  const [isFirstPage, setIsFirstPage] = useState(true);
  
  const [priceFieldMessage, setPriceFieldMessage] = useState("Requerido");
  const [stockFieldMessage, setStockFieldMessage] = useState("Requerido");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setIsFormData({
      ...isFormData,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}`]: !!value
    })

    if (name === "unitPrice")
      if (!value) setPriceFieldMessage("Requerido");
    if (name === "stock")
      if (!value) setStockFieldMessage("Requerido");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setAreFiles(files.length > 0);
  };

  const handleNextPage = () => {
    const currentIsFormData = {
      isName: !!formData.name,
      isDescription: !!formData.description,
      isBrand: !!formData.brand,
      isSize: !!formData.size
    };
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      setAreFiles(false)
      return;
    }
    setIsFirstPage(false);
  };

  const handlePreviousPage = () => {
    setIsFirstPage(true);
  };

  const handleSubmit = async () => {
    setIsWaitingResponse(true);

    const currentIsFormData = {
      isName: !!formData.name,
      isDescription: !!formData.description,
      isBrand: !!formData.brand,
      isSize: !!formData.size,
      isUnitPrice: !!formData.unitPrice,
      isStock: !!formData.stock,
      isCategoryId: !!formData.categoryId
    };
    
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      const currentFiles = selectedFiles;
      if (currentFiles.length <= 0)
        setAreFiles(false);
      setIsWaitingResponse(false);
      return;
    }
    const currentPrice = parseFloat(formData.unitPrice);
    const currentStock = parseFloat(formData.stock);
    let newIsFormData = { ...isFormData };
    let hasError = false;
    if (currentPrice <= 0 || currentStock <= 0) {
      if (currentPrice <= 0) {
        setPriceFieldMessage("Debe ser mayor a 0")
        newIsFormData.isUnitPrice = false;
        hasError = true;
      }
      if (currentStock <= 0) {
        setStockFieldMessage("Debe ser mayor a 0");
        newIsFormData.isStock = false;
        hasError = true;
      }
      if (hasError) {
        setIsFormData(newIsFormData);
        setIsWaitingResponse(false);
        return;
      }
    }

    try {
      const newProduct = await addProduct(formData);

      const imageFiles = new FormData();
      imageFiles.append('prefix', newProduct.id);
      for (let file of selectedFiles)
        imageFiles.append('files', file);
      await uploadToBucket(imageFiles);

      const uploadedFiles = await getFilesByPrefix(newProduct.id);

      for (let file of uploadedFiles)
        await uploadImage(file.name, newProduct.id);

      const fullNewProduct = await getProductCategoryImagesDiscountsById(newProduct.id);

      setProducts([
        ...products,
        fullNewProduct
      ]);

      setIsWaitingResponse(false);
      handleClose();
    } catch (error) {
      console.log(error); 
    }
  };

  return(
    <div className={`absolute z-20 w-full h-full flex justify-center items-center bg-black/70`}>
      <div className='relative bg-white w-full h-full sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg flex flex-col items-center'>
        <div className="mt-4 mb-2 w-[90%] flex justify-between items-center">
          <p className="text-lg font-semibold">Agregar un nuevo producto</p>
          <CloseButton
            onClick={handleClose}
          />
        </div>
        <div className={`ml-[5%] self-start border-b-4 border-purp-dark rounded-lg transition-all duration-300 ${isFirstPage ? 'w-[45%]' : 'w-[90%]'}`} />
        <div className={`${isFirstPage ? 'opacity-100 z-10' : 'opacity-0'} absolute top-20 w-[90%] flex flex-col`}>
          <InputWithWarning
            label='Nombre del producto'
            type='text'
            id='name'
            name='name'
            value={formData.name}
            isValue={isFormData.isName}
            onChange={handleInputChange}
            message='Requerido'
            width='w-full'
          />
          <InputWithWarning
            label='Descripción'
            type='textarea'
            id='description'
            name='description'
            value={formData.description}
            isValue={isFormData.isDescription}
            onChange={handleInputChange}
            message='Requerido'
            width='w-full'
          />
          <div className="flex w-full justify-between">
            <InputWithWarning
              label='Marca'
              type='text'
              id='brand'
              name='brand'
              value={formData.brand}
              isValue={isFormData.isBrand}
              onChange={handleInputChange}
              message='Requerido'
              width='w-[47.5%]'
            />
            <InputWithWarning
              label='Tamaño'
              type='text'
              id='size'
              name='size'
              value={formData.size}
              isValue={isFormData.isSize}
              onChange={handleInputChange}
              message='Requerido'
              width='w-[47.5%]'
            />
          </div>
          <CommonButton
            onClick={handleNextPage}
            width='w-[40%] self-end'
            text='Siguiente'
          />
        </div>
            
        <div className={`${isFirstPage ? 'opacity-0' : 'opacity-100 z-10'} absolute top-20 w-[90%] h-full flex flex-col`}>
          <div className="flex w-full justify-between">
            <InputWithWarning
              label='Precio unitario'
              type='number'
              id='unitPrice'
              name='unitPrice'
              value={formData.unitPrice}
              isValue={isFormData.isUnitPrice}
              onChange={handleInputChange}
              message={priceFieldMessage}
              width='w-[47.5%]'
            />
            <InputWithWarning
              label='Inventario'
              type='number'
              id='stock'
              name='stock'
              value={formData.stock}
              isValue={isFormData.isStock}
              onChange={handleInputChange}
              message={stockFieldMessage}
              width='w-[47.5%]'
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col w-full mt-1 mb-6">
              <label htmlFor="categoryId" className="mb-2">Categoría</label>
              <DropdownButton
                name='categoryId'
                id='categoryId'
                value={formData.categoryId}
                isValue={isFormData.isCategoryId}
                onChange={handleInputChange}
                defaultOption={<option value='' disabled>Selecciona una categoría</option>}
                data={categories}
              />
            </div>
            <UploadImageButton
              areFiles={areFiles}
              selectedFiles={selectedFiles}
              handleFileChange={handleFileChange}
            />
          </div>
          <div className="mt-2 flex w-full justify-between">
            <CommonButton
              onClick={handlePreviousPage}
              width='w-[40%]'
              text='Anterior'
            />
            <FormSubmitButton
              isWaitingResponse={isWaitingResponse}
              handleSubmit={handleSubmit}
              text='Enviar'
              width='w-[40%]'
            />
          </div>
        </div>
      </div>
    </div>
  );  
};  

export default AddProductForm;