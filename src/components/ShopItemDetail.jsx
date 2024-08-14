import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from "react-icons/ri";

import { deleteFromBucket } from '../services/filesService.js';
import { deleteFromDB } from '../services/imagesService.js';

import { getAllDiscounts, getDiscountsByValidity } from "../services/discountsService.js";
import { getAllCategories } from "../services/categoriesService.js";

import { getProductCategoryImagesDiscountsById } from "../services/productsService.js";

import PriceDisplay from "./PriceDisplay";

import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';

import EditProductForm from "./EditProductForm.jsx";

function ShopItemDetail() {

  const uri = 'https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/';

  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDeleteFile = async (file) => {
    setImages(images.map(image =>
      image.id === file.id
        ? { ...image, isDeleting: true }
        : image
    ));
    try {
      await deleteFromDB(file.id);
      setImages(images.filter(image => image.id !== file.id));
      setImageIndex(0);
    } catch (error) {
      console.error('Error deleting Photo', error);
    }
  };

  const handleSubmitFiles = async () => {
    setIsWaitingResponse(true);
    const form_Data = new FormData();
    form_Data.append('prefix', product.id);
    const currentSelectedFiles = selectedFiles;
    for (let file of currentSelectedFiles)
      form_Data.append('files', file);

    try {
      const uploadFilesResponse = await
      fetch('http://localhost:3001/files/', {
        method: 'POST',
        body: form_Data
      });
      
      if (!uploadFilesResponse.ok)
        throw new Error('Error al subir archivos');

      const uploadedFiles = await uploadFilesResponse.json();

      const newImages = [];
      for (let fileName of uploadedFiles) {
        const newImageResponse = await
          fetch('http://localhost:3001/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              url: fileName,
              productId: product.id
            })
          });
        if (!newImageResponse.ok)
          throw new Error('Error al subir imagen');
        newImages.push(await newImageResponse.json());
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
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const productResult = await getProductCategoryImagesDiscountsById(id);
        const discountsResult = await getAllDiscounts();
        const categoriesResult = await getAllCategories();

        const updatedImages = productResult.Images.map(image => ({
          ...image,
          isDeleting: false,
        }));

        setImages(updatedImages);
        setProduct(productResult);
        setDiscounts(discountsResult);
        setCategories(categoriesResult);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleRightClick = () => {
    if (imageIndex >= images.length - 1)
      setImageIndex(0);
    else
      setImageIndex(imageIndex + 1);
  };

  const handleLeftClick = () => {
    if (imageIndex <= 0)
      setImageIndex(images.length - 1);
    else
      setImageIndex(imageIndex - 1);
  };

  const handleOnMouseOver = (index) => {
    setImageIndex(index);
  };

  const handleIsEditingInfo = () => {
    setIsEditingInfo(!isEditingInfo);
  };

  return (
    <div className={`w-full px-8 py-4 items-center min-h-[89.8%] flex justify-center`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row shadow-lg rounded-lg">
          <div className="w-full lg:w-[40%] h-fit flex flex-wrap justify-center gap-2 p-4">
            {isEditingInfo ? (
              <EditProductForm
                handleClose={handleIsEditingInfo}
                product={product}
                setProduct={setProduct}
                discounts={discounts}
                categories={categories}
              />
            ) : (
              <div className="flex flex-col w-full border-b border-mag mb-3">
                <div className="p-2">
                  <div className="py-2 flex justify-between items-center">
                    <p className="font-bold text-lg">{product.name}</p>
                    <button
                      onClick={handleIsEditingInfo}
                      className='scale-95 hover:scale-100 transition hover:opacity-70'    
                    >
                      <FaEdit size='2rem' color='#605399' />
                    </button>
                  </div>
                    <p className="text-md mt-2 text-wrap break-words">{product.description}</p>
                </div>
                <div className="px-2">
                  <PriceDisplay product={product} />
                </div>
                <div className="flex flex-wrap gap-2 p-2">
                  <div className="h-[50px] w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
                    <p>Marca:</p>
                    <p>{product.brand}</p>
                  </div>
                  <div className="h-[50px] w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
                    <p>Tamaño:</p>
                    <p>{product.size}</p>
                  </div>
                  <div className="h-[50px] w-fit text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
                    <p>Categoría:</p>
                    <p>{product.Category.name}</p>
                  </div>
                </div>
                <p
                  className="text-sm p-2 mb-1"
                >
                  {`${product.stock + (product.stock === 1 ? ' disponible' : ' disponibles')}`}
                </p>
              </div>
            )}  
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  onMouseOver={() => handleOnMouseOver(index)}
                  src={uri + image.url}
                  className={`${imageIndex === index && 'ring-4 ring-mag'} object-cover w-[80px] h-[80px] scale-95 group-hover:scale-100 transition rounded-lg`}
                />
                {images.length > 1 &&
                  <button
                    disabled={image.isDeleting}
                    onClick={() => handleDeleteFile(image)}
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
                }
              </div>
            ))}
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
          </div>

          <div className="relative w-full lg:w-[60%] h-full flex items-center justify-center">
            <img
              src={uri + images[imageIndex].url}
              className="object-cover w-full h-full rounded-lg" />
            <button onClick={handleLeftClick} type="button" className="opacity-0 hover:opacity-70 transition flex items-center justify-center left-0 top-0 bottom-0 rounded-l-lg absolute w-12 bg-white">
              <FaAngleLeft size='3rem' color="black" />
            </button>
            <button onClick={handleRightClick} type="button" className="opacity-0 hover:opacity-70 transition flex items-center justify-center right-0 top-0 bottom-0 rounded-r-lg absolute w-12 bg-white">
              <FaAngleRight size='3rem' color="black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopItemDetail;