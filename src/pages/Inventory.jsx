import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem.jsx';

function Inventory() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products/images/discounts');
        if (!response.ok)
          throw new Error('Error fetching products');
        const result = await response.json();
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);


  return (
      <div className='w-full h-[90%] flex flex-wrap justify-center gap-4 p-2'>
        {products.length > 0 && (
          products.map((product) => (
          <ShopItem product={product} />
        )))}
      </div>
  );
};
  
export default Inventory;