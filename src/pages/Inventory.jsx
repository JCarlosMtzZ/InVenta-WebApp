import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem.jsx';

import { AiOutlineLoading } from 'react-icons/ai';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AddProductButton from '../components/AddProductButton.jsx';
import AddProductForm from '../components/AddProductForm.jsx';

function Inventory() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handlePlusButtonClick = () => {
    setIsAddingProduct(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products/category/images/discounts');
        if (!response.ok)
          throw new Error('Error fetching products');
        const result = await response.json();
        if (result)
          setIsLoading(false);
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleShopItemClick = (id) => {
    navigate(`/inventory/product/${id}`)
  };


  return (
      <div className={`w-full h-[89.8%] ${isLoading && 'flex justify-center items-center'}`}>
        {isLoading ? (
          <div className='w-fit h-fit animate-spin'>
            <AiOutlineLoading size='4rem' color='#605399' />
          </div>
        ) : (
          <div className={`relative w-full min-h-full max-h-[500px]  ${isAddingProduct && 'overflow-hidden'}`}>
            {isAddingProduct ? (
              <div className='absolute w-full h-full flex items-center justify-center z-20'>
                <AddProductForm
                  isOpen={isAddingProduct}
                  setIsOpen={setIsAddingProduct}
                />
              </div>
            ) : (
              <div className='fixed right-[35px] bottom-[30px] z-10'>
                <button onClick={handlePlusButtonClick} type="button" className="bg-purp-dark p-2 rounded-[50%] hover:scale-105 transition">
                  <FaPlus color="white" size='1.8rem' />
                </button>
              </div>
            )}
            <div className='w-full flex flex-wrap justify-center gap-4 pt-2 pl-2'>
              {products.length > 0 && (
                products.map((product) => (
                <ShopItem
                  key={product.id}
                  product={product}
                  onClick={handleShopItemClick} />
              )))}
            </div>
          </div>
        )}
      </div>
  );
};
  
export default Inventory;