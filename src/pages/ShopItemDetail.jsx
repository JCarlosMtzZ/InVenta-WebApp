import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";

import { deleteFromDB} from '../services/imagesService.js';
import { getAllDiscounts } from "../services/discountsService.js";
import { getAllCategories } from "../services/categoriesService.js";
import { getProductCategoryImagesDiscountsById } from "../services/productsService.js";
import { bucketURL } from "../services/util.js";

import PriceDisplay from "../components/PriceDisplay";
import EditProductForm from "../components/forms/EditProductForm.jsx";
import DeleteImageButton from "../components/buttons/DeleteImageButton.jsx";
import AddImageButton from "../components/buttons/AddImageButton.jsx";

function ShopItemDetail({
  adminId,
  isWaitingResponse,
  setIsWaitingResponse }) {

  const [isLoading, setIsLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const { id } = useParams();
  const [product, setProduct] = useState();

  const [discounts, setDiscounts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isEditingInfo, setIsEditingInfo] = useState(false);

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
    <div className={`w-full px-8 py-4 items-center min-h-[calc(100%-65px)] flex justify-center`}>
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
                isWaitingResponse={isWaitingResponse}
                setIsWaitingResponse={setIsWaitingResponse}
              />
            ) : (
              <div className="flex flex-col w-full border-b border-mag mb-3">
                <div className="p-2">
                  <div className="py-2 flex justify-between items-center">
                    <p className="font-bold text-lg">{product.name}</p>
                    {adminId &&
                      <button
                      onClick={handleIsEditingInfo}
                      className='scale-95 hover:scale-100 transition hover:opacity-70'    
                      >
                        <FaEdit size='2rem' color='#605399' />
                      </button>
                    }
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
                  src={bucketURL + image.url}
                  className={`${imageIndex === index && 'ring-4 ring-mag'} object-cover w-[80px] h-[80px] scale-95 group-hover:scale-100 transition rounded-lg`}
                />
                {images.length > 1 && adminId && !isEditingInfo &&
                  <DeleteImageButton
                    image={image}
                    handleDelete={handleDeleteFile}
                  />
                }
              </div>
            ))}
            {adminId && !isEditingInfo &&
              <AddImageButton
                product={product}
                images={images}
                setImages={setImages}
                setImageIndex={setImageIndex}
                isWaitingResponse={isWaitingResponse}
                setIsWaitingResponse={setIsWaitingResponse}
              />
            }
          </div>

          <div className="relative w-full lg:w-[60%] h-full flex items-center justify-center">
            <img
              src={bucketURL + images[imageIndex].url}
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