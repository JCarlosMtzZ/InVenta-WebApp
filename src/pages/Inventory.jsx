import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem.jsx';

import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Inventory() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className={`w-full h-[90%] ${isLoading && 'flex justify-center items-center'}`}>
        {isLoading ? (
          <div className='w-fit h-fit animate-spin'>
            <AiOutlineLoading size='4rem' color='#605399' />
          </div>
        ) : (
          <div className='w-full flex flex-wrap justify-center gap-4 pt-2 pl-2'>
            {products.length > 0 && (
              products.map((product) => (
              <ShopItem
                key={product.id}
                product={product}
                onClick={handleShopItemClick} />
            )))}
          </div>
        )}
      </div>
  );
};
  
export default Inventory;