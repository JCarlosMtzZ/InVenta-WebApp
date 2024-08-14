import { useEffect, useState } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import { RiShoppingCartLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import ShopItem from '../components/ShopItem.jsx';
import AddProductForm from '../components/AddProductForm.jsx';
import ManagementBar from '../components/ManagementBar.jsx';
import ShoppingCart from "../components/ShoppingCart.jsx";

import { 
  getAllProductsCategoriesImagesDiscounts,
  getAllProductsCategoriesImagesDiscountsByNameAndFilter
 } from '../services/productsService.js';
import { getAllCategories } from '../services/categoriesService.js';

function Inventory({
  isLoading, 
  setIsLoading,
  isAddingProduct,
  setIsAddingProduct,
  cart,
  setCart,
  isCart,
  setIsCart
 }) {

  const [filter, setFilter] = useState('all');

  const handleFilterChange = async (e) => {
    setIsLoading(true);
    const filter = e.target.value;
    if (filter === 'all') {
      const productsResult = await getAllProductsCategoriesImagesDiscounts();
      setProducts(productsResult);
    } else {
      const productsResult = await getAllProductsCategoriesImagesDiscountsByNameAndFilter('', filter);
      setProducts(productsResult);
    }
    setFilter(filter);
    setIsLoading(false);
  };

  const [isManaging, setIsManaging] = useState(true);

  const handleMode = () => {
    setIsManaging(!isManaging);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleOpenCart = () => {
    setIsCart(!isCart);
  };

  const handlePlusButtonClick = () => {
    setIsAddingProduct(true);
  };

  const fetchData = async () => {
    try {
      const categoriesResult = await getAllCategories();
      const productsResult = await getAllProductsCategoriesImagesDiscounts();
      setCategories(categoriesResult);
      setProducts(productsResult);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
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
          <div className={`relative w-full min-h-full max-h-[500px]  ${isAddingProduct && 'overflow-hidden'} ${isCart && 'overflow-hidden'} `}>
            <button
              type="button"
              onClick={handleOpenCart}
              className="p-3 hover:scale-105 transition fixed bottom-[100px] right-[20px] rounded-[50%] bg-purp-dark z-10"
            >
              {cart.length > 0 &&
                <div className="text-white text-sm font-semibold flex items-center justify-center p-1 w-[25px] h-[25px] absolute -top-[7px] -right-[7px] rounded-[50%] bg-mag">
                  {cart.length}
                </div>
              }
              <RiShoppingCartLine color="white" size='2rem' />
            </button>
                  <button
                    onClick={handlePlusButtonClick}
                    type="button"
                    className="bg-purp-dark p-3 rounded-[50%] hover:scale-105 transition fixed right-[20px] bottom-[30px] z-10">
                  <FaPlus color="white" size='2rem' />
                  </button>
            {isCart &&
              <div className="absolute w-full h-full z-20">
                <ShoppingCart
                  cart={cart}
                  setCart={setCart}
                  handleClose={handleOpenCart}
                />
              </div>
            }
            {isAddingProduct && (
                  <div className='absolute w-full h-full flex items-center justify-center z-20'>
                  <AddProductForm
                  categories={categories}
                  isOpen={isAddingProduct}
                  setIsOpen={setIsAddingProduct}
                  />
                  </div>
                
                )}
            <div className='w-full'>
              <ManagementBar
                setIsLoading={setIsLoading}
                filter={filter}
                handleFilterChange={handleFilterChange}
                isManaging={isManaging}
                handleMode={handleMode}
                categories={categories}
                setProducts={setProducts}
              />
            </div>
            
              <div className='w-full h-full'>
                <div className='pb-4 w-full flex flex-wrap justify-center gap-4'>
                  {products.length > 0 && (
                    products.map((product) => (
                      <ShopItem
                        key={product.id}
                        product={product}
                        onClick={isManaging && handleShopItemClick}
                        showButtons={!isManaging}
                        cart={cart}
                        setCart={setCart}
                      />
                    )))}
                </div>
              </div>
            
          </div>
        )}
      </div>
  );
};
  
export default Inventory;