import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiShoppingCartLine } from "react-icons/ri";

import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ShopItem from '../components/ShopItem.jsx';
import AddProductForm from '../components/AddProductForm.jsx';
import ManagementBar from '../components/ManagementBar.jsx';
import ShoppingCart from "../components/ShoppingCart.jsx";


function Inventory({ 
  isAddingProduct,
  setIsAddingProduct,
  cart,
  setCart,
  isCart,
  setIsCart
 }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsBySearch, setProductsBySearch] = useState([]);
  const [filter, setFilter] = useState('all');

  const [categories, setCategories] = useState([]);
  
  const [isManaging, setIsManaging] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenCart = () => {
    const currentIsCart = isCart;
    setIsCart(!currentIsCart);
  };

  const handleMode = () => {
    const currentMode = isManaging;
    setIsManaging(!currentMode);
  };

  const handlePlusButtonClick = () => {
    setIsAddingProduct(true);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setFilteredProducts(products);
      setProductsBySearch(products);
    } else if (value === 'discounts') {
      const productsByFilter = products.filter((product) => product.Discounts.length > 0);
      setFilteredProducts(productsByFilter);
      setProductsBySearch(productsByFilter);
    } else {
      const productsByFilter = products.filter((product) => product.categoryId === value);
      setFilteredProducts(productsByFilter);
      setProductsBySearch(productsByFilter);
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
          setProductsBySearch(productsResult);
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
                handleMode={handleMode}
                isManaging={isManaging}
                handleFilterChange={handleFilterChange}
                filter={filter}
                categories={categories}
                originalProducts={filteredProducts}
                filteredProducts={productsBySearch}
                setFilteredProducts={setProductsBySearch}
              />
            </div>
            
              <div className='w-full h-full'>
                <div className='pb-4 w-full flex flex-wrap justify-center gap-4'>
                  {productsBySearch.length > 0 && (
                    productsBySearch.map((product) => (
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