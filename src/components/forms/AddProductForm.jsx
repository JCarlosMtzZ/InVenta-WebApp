import { useState, useEffect } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import FormFieldWarning from "../FormFieldWarning.jsx";
import FormSubmitButton from "../FormSubmitButton.jsx";

function AddProductForm({ categories, isOpen, setIsOpen }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  //const [categories, setCategories] = useState([]);

  //useEffect(() => {
  //  const fetchCategories = async () => {
  //    try {
  //      const response = await fetch('http://localhost:3001/categories');
  //      if (!response.ok)
  //        throw new Error('Error fetching categories');
  //      const result = await response.json();
  //      if (result)
  //        setIsLoading(false);
  //      console.log(result);
  //      setCategories(result);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };
  //  fetchCategories();
  //}, []);

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

  const [priceFieldMessage, setPriceFieldMessage] = useState("Requerido");
  const [stockFieldMessage, setStockFieldMessage] = useState("Requerido");

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
      
      const newProductResponse = await
      fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
    
      if (!newProductResponse.ok)
        throw new Error('Error al crear producto');

      const newProduct = await newProductResponse.json();

      const form_Data = new FormData();
      form_Data.append('prefix', newProduct.id);
      const currentSelectedFiles = selectedFiles;
      for (let file of currentSelectedFiles)
        form_Data.append('files', file);

      const uploadFilesResponse = await
      fetch('http://localhost:3001/files/', {
        method: 'POST',
        body: form_Data
      });

      if (!uploadFilesResponse.ok)
        throw new Error('Error al subir archivos');

      const uploadedFilesResponse = await
        fetch(`http://localhost:3001/files/${newProduct.id}`);

      if (!uploadedFilesResponse.ok)
        throw new Error('Error al obtener archivos');

      const uploadedFiles = await uploadedFilesResponse.json();

      for (let file of uploadedFiles) {
        const newImageResponse = await
          fetch('http://localhost:3001/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              url: file.name,
              productId: newProduct.id
            })
          });
        if (!newImageResponse.ok)
          throw new Error('Error al subir imagen');
      }
    } catch (error) {
      console.log(error); 
    } finally {
      setIsWaitingResponse(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return(
    <div className={`w-full h-full flex justify-center items-center bg-black/70`}>
      {isLoading ? (
        <div className="bg-white flex items-center justify-center w-full h-full sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg">
          <div className='w-fit h-fit animate-spin'>
            <AiOutlineLoading size='4rem' color='#605399' />
          </div>
        </div>
      ) : (
        <div className='relative bg-white w-full h-full sm:w-[500px] sm:h-[500px] sm:rounded-lg sm:shadow-lg flex flex-col items-center'>
          <div className="mt-4 mb-2 w-[90%] flex justify-between items-center">
            <p className="text-lg font-semibold">Agregar un nuevo producto</p>
            <button
              type="button"
              onClick={handleClose}
              className="hover:scale-110 transition"  
            >
              <IoCloseCircleOutline size="1.75rem" />
            </button>
          </div>
          <div className={`ml-[5%] self-start border-b-4 border-purp-dark rounded-lg ${isFirstPage ? 'w-[45%]' : 'w-[90%]'}`} />
          <div className={`${isFirstPage ? 'opacity-100 z-10' : 'opacity-0'} absolute top-20 w-[90%] flex flex-col`}>
            <label htmlFor="name" className="mb-2">Nombre del producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`p-2 h-10 border-solid border-2 ${isFormData.isName ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
            />
            <FormFieldWarning
              isFormField={isFormData.isName}
              message='Requerido'
            />
            <label htmlFor="description" className="mb-2">Descripción</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`resize-none p-2 h-14 border-solid border-2 ${isFormData.isDescription ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
            />
            <FormFieldWarning
              isFormField={isFormData.isDescription}
              message='Requerido'
            />
            <div className="flex w-full justify-between">
              <div className="flex flex-col w-[47.5%]">
                <label htmlFor="brand" className="mb-2">Marca</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`p-2 h-10 border-solid border-2 ${isFormData.isBrand ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
                />
                <FormFieldWarning
                  isFormField={isFormData.isBrand}
                  message='Requerido'
                />
              </div>
              <div className="flex flex-col w-[47.5%]">
                <label htmlFor="size" className="mb-2">Tamaño</label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className={`p-2 h-10 border-solid border-2 ${isFormData.isSize ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
                />
                <FormFieldWarning
                  isFormField={isFormData.isSize}
                  message='Requerido'
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleNextPage}
              className={`mt-4 self-end w-[40%] h-10 bg-purp-dark text-white rounded-lg disabled:opacity-75
                enabled:hover:bg-white enabled:hover:text-black enabled:hover:border-black enabled:hover:border-2
                transition`}>
              Siguiente
            </button> 
          </div>
              
          <div className={`${isFirstPage ? 'opacity-0' : 'opacity-100 z-10'} absolute top-20 w-[90%] h-full flex flex-col`}>
            <div className="flex w-full justify-between">
              <div className="flex flex-col w-[47.5%]">
                <label htmlFor="unitPrice" className="mb-2">Precio unitario</label>
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  className={`p-2 h-10 border-solid border-2 ${isFormData.isUnitPrice ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
                  />
                <FormFieldWarning
                  isFormField={isFormData.isUnitPrice}
                  message={priceFieldMessage}
                />
              </div>
              <div className="flex flex-col w-[47.5%]">
                <label htmlFor="stock" className="mb-2">Inventario</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`p-2 h-10 border-solid border-2 ${isFormData.isStock ? 'border-black' : 'border-warn-red'} border-opacity-45 rounded-lg`}
                  />
                <FormFieldWarning
                  isFormField={isFormData.isStock}
                  message={stockFieldMessage}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col w-full mt-1 mb-6">
                <label htmlFor="categoryId" className="mb-2">Categoría</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`pl-2 h-10 border-2 rounded-lg border-opacity-45 ${isFormData.isCategoryId ? 'border-black' : 'border-warn-red'}`}>
                  <option value="" disabled>Selecciona una categoría</option>
                  {categories.length > 0 && (
                    categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
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
                  className="hidden" />
              </div>
              <FormFieldWarning
                  isFormField={areFiles}
                  message='Utiliza al menos 1 foto'
              />
            </div>
            <div className="mt-2 flex w-full justify-between">
              <button
                type="button"
                onClick={handlePreviousPage}
                className={`w-[40%] h-10 bg-purp-dark text-white rounded-lg disabled:opacity-75
                  enabled:hover:bg-white enabled:hover:text-black enabled:hover:border-black enabled:hover:border-2
                  transition`}>
                Anterior
              </button>
              <div className="w-[40%]">
                <FormSubmitButton
                  isWaitingResponse={isWaitingResponse}
                  handleSubmit={handleSubmit}
                  text='Enviar'
                />
              </div> 
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};  

export default AddProductForm;