import { useEffect, useState } from 'react';
import ShopItem from '../components/ShopItem.jsx';

import { AiOutlineLoading } from 'react-icons/ai';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AddProductButton from '../components/AddProductButton.jsx';
import AddProductForm from '../components/AddProductForm.jsx';

function Inventory({ isLogging, isAddingProduct, setIsAddingProduct }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  const [categories, setCategories] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const handlePlusButtonClick = () => {
    setIsAddingProduct(true);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setFilteredProducts(products);
    } else if (value === 'discounts') {
      const productsByFilter = products.filter((product) => product.Discounts.length > 0);
      setFilteredProducts(productsByFilter);
    } else {
      const productsByFilter = products.filter((product) => product.categoryId === value);
      setFilteredProducts(productsByFilter);
    }
    setFilter(value);
  };

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const productsResponse = await fetch('http://localhost:3001/products/category/images/discounts');
        const categoriesResponse = await fetch('http://localhost:3001/categories')
        if (!productsResponse.ok)
          throw new Error('Error fetching products');
        if (!categoriesResponse.ok)
          throw new Error('Error fetching categories');
        const productsResult = await productsResponse.json();
        const categoriesResult = await categoriesResponse.json();
        if (productsResult && categoriesResult) {
          setCategories(categoriesResult);
          setProducts(productsResult.sort(
            (a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
          }));
          setFilteredProducts(productsResult);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initialFetch();
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
              <div className={`${isLogging && 'hidden'} fixed right-[35px] bottom-[30px] z-10`}>
                <button onClick={handlePlusButtonClick} type="button" className="bg-purp-dark p-2 rounded-[50%] hover:scale-105 transition">
                  <FaPlus color="white" size='1.8rem' />
                </button>
              </div>
            )}
            <div className='w-full flex flex-wrap justify-center gap-4'>
              <div className='w-full h-14 flex items-center justify-center gap-4 overflow-y-hidden'>
                <button
                  type='button'
                  value='all'
                  onClick={handleFilterChange}
                  className={`${filter === 'all' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
                >
                  Todos
                </button>
                <button
                  type='button'
                  value='discounts'
                  onClick={handleFilterChange}
                  className={`${filter === 'discounts' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
                >
                  Ofertas
                </button>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={`${filter === 'all' || filter === 'discounts' ? '' : filter}`}
                  onChange={handleFilterChange}
                  className={`${filter != 'all' && filter != 'discounts' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition cursor-pointer focus:outline-none`}
                >
                  <option
                    value=""
                    disabled
                  >
                    Categorías
                  </option>
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
              {filteredProducts.length > 0 && (
                filteredProducts.map((product) => (
                <ShopItem
                  key={product.id}
                  product={product}
                  onClick={handleShopItemClick}
                  showButtons={false} />
              )))}
            </div>
          </div>
        )}
      </div>
  );
};
  
export default Inventory;