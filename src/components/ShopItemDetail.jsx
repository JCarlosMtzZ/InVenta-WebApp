import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";

import PriceDisplay from "./PriceDisplay";

import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';

function ShopItemDetail() {

  const uri = 'https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/';

  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

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
      const uploadFilesResponse = await
      fetch('http://localhost:3001/files/', {
        method: 'POST',
        body: form_Data
      });
      
      if (!uploadFilesResponse.ok)
        throw new Error('Error al subir archivos');

      const uploadedFiles = await uploadFilesResponse.json();

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
      } 
    } catch (error) {
      console.log(error); 
    } finally {
      setIsWaitingResponse(false);
      setSelectedFiles([]);
    }
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/products/category/images/discounts/${id}`);
        if (!response.ok)
          throw new Error('Error fetching product');
        const result = await response.json();
        if (result)
          setIsLoading(false);
        console.log(result);
        setImages(result.Images)
        setProduct(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
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

  return (
    <div className={`w-full p-6 items-center min-h-[90%] flex justify-center`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row shadow-lg rounded-lg">
          <div className="w-[100%] md:w-[30%] h-fit flex flex-wrap justify-center gap-2 p-4">
            <div className="flex flex-col w-full border-b border-mag mb-3">
              <div className="p-2">
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-md mt-2 text-wrap break-words">{product.description}</p>
              </div>
              <div>
                <PriceDisplay product={product} />
              </div>
              <div className="flex gap-2 p-4">
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
            </div>
            <div className={`flex ${selectedFiles.length > 0 ? 'w-[140px]' : 'w-[100px]'}  h-[100px]`}>
              <label htmlFor="file-upload" className={`bg-purp-dark/10 scale-95 transition hover:scale-100 flex items-center justify-center  w-[100px] h-full cursor-pointer border-4 border-purp-dark border-dashed rounded-lg`}>
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
            {images.map((image, index) => (
              <img
                onMouseOver={() => handleOnMouseOver(index)}
                key={index}
                src={uri + image.url}
                className={`${imageIndex === index && 'ring-4 ring-mag'} object-cover w-[100px] h-[100px] scale-95 hover:scale-100 transition rounded-lg`} />
            ))}
            
          </div>
          <div className="relative p-2 w-[100%] md:w-[70%] flex items-center justify-center">
            <img
              src={uri + images[imageIndex].url}
              className="object-cover w-full h-full rounded-lg" />
            <button onClick={handleLeftClick} type="button" className="opacity-0 hover:opacity-70 transition flex items-center justify-center left-2 top-2 bottom-2 rounded-l-lg absolute w-12 bg-white">
              <FaAngleLeft size='3rem' color="black" />
            </button>
            <button onClick={handleRightClick} type="button" className="opacity-0 hover:opacity-70 transition flex items-center justify-center right-2 top-2 bottom-2 rounded-r-lg absolute w-12 bg-white">
              <FaAngleRight size='3rem' color="black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopItemDetail;