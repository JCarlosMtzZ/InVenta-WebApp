import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import PriceDisplay from "./PriceDisplay";

import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';

function ShopItemDetail() {

  const images = [img1, img2, img3];

  const [imageIndex, setImageIndex] = useState(0);

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/images/discounts/${id}`);
        if (!response.ok)
          throw new Error('Error fetching product');
        const result = await response.json();
        if (result)
          setIsLoading(false);
        console.log(result);
        setProduct(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

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
                <div className="h-[50px] w-[70px] text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
                  <p>Marca:</p>
                  <p>{product.brand}</p>
                </div>
                <div className="h-[50px] w-[70px] text-sm hover:border-mag border-dashed border rounded-lg p-2 flex flex-col items-center justify-center">
                  <p>Tamaño:</p>
                  <p>{product.size}</p>
                </div>
              </div>
            </div>
            {images.map((image, index) => (
              <img
                onMouseOver={() => handleOnMouseOver(index)}
                key={index}
                src={image}
                className={`${imageIndex === index && 'ring-4 ring-mag'} object-cover w-[100px] h-[100px] scale-95 hover:scale-100 transition rounded-lg`} />
            ))}
          </div>
          <div className="relative p-2 w-[100%] md:w-[70%] flex items-center justify-center">
            <img src={images[imageIndex]} className="object-cover w-full h-full rounded-lg" />
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