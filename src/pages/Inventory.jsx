import { useEffect, useState } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import { RiShoppingCartLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

import ShopItem from '../components/cards/ShopItem.jsx';
import AddProductForm from '../components/forms/AddProductForm.jsx';
import ManagementBar from '../components/bars/ManagementBar.jsx';
import ShoppingCart from "../components/ShoppingCart.jsx";
import OpenModalButton from '../components/buttons/OpenModalButton.jsx';
import PaginationBar from '../components/bars/PaginationBar.jsx';

import { getAllProductsCategoriesImagesByNameAndFilter } from '../services/productsService.js';
import { getAllCategories } from '../services/categoriesService.js';
import { addOrder } from "../services/ordersService.js";
import { addOrderItem } from "../services/orderItemsService.js";

function Inventory({
  adminId,
  isAddingProduct,
  setIsAddingProduct,
  cart,
  setCart,
  isCart,
  setIsCart,
  isWaitingResponse,
  setIsWaitingResponse
 }) {

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState('all');
  const [isManaging, setIsManaging] = useState(true);

  const fetchData = async (page = 1, pageSize = 10, name = '', filter = '') => {
    try {
      const categoriesResult = await getAllCategories();
      const productsResult = await getAllProductsCategoriesImagesByNameAndFilter(page, pageSize, name, filter === 'all' ? '' : filter);
      setCategories(categoriesResult);
      setProducts(productsResult.products);
      setPage(productsResult.page);
      setTotalPages(productsResult.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(page, 10, '', filter);
  }, [page]);

  const handleFilterChange = async (e) => {
    setIsLoading(true);
    setFilter(e.target.value);
    await fetchData(1, 10, '', e.target.value);
  };

  const handlePreviousPage = () => {
    if (page > 1)
      setPage(page - 1)
  };

  const handleNextPage = () => {
    if (page < totalPages)
      setPage(page + 1)
  };

  const handleMode = () => {
    setIsManaging(!isManaging);
  };

  const handleOpenCart = () => {
    setIsCart(!isCart);
  };

  const handlePlusButtonClick = () => {
    setIsAddingProduct(!isAddingProduct);
  };

  const handleSubmitCart = async () => {
    if (cart.length <= 0)
      return;
    setIsWaitingResponse(true);
    try {
      const newOrderResult = await addOrder(adminId);
      for (let orderItem of cart)
        await addOrderItem(orderItem, newOrderResult.id);
      setIsWaitingResponse(false);
      setCart([]);
      setIsCart(!isCart);
    } catch (error) {
      console.error('Error submitting cart', error);
    }
  };

  return (
    <div className={`w-full h-[calc(100%-65px)] ${isLoading && 'flex justify-center items-center'}`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className={`relative w-full min-h-full max-h-[500px]  ${isAddingProduct && 'overflow-hidden'} ${isCart && 'overflow-hidden'} `}>
          {adminId && (
            <div>
              <OpenModalButton
                onClick={handleOpenCart}
                items={cart}
                Icon={<RiShoppingCartLine color="white" size='2rem' />}
                style='bottom-[100px] right-[20px]'
              />
              <OpenModalButton
                onClick={handlePlusButtonClick}
                Icon={<FaPlus color="white" size='2rem' />}
                style='bottom-[30px] right-[20px]'
              />
            </div>
          )}
          {isCart &&
            <ShoppingCart
              cart={cart}
              setCart={setCart}
              handleClose={handleOpenCart}
              handleSubmit={handleSubmitCart}
              isWaitingResponse={isWaitingResponse}
            />
          }
          {isAddingProduct && (
            <AddProductForm
              categories={categories}
              products={products}
              setProducts={setProducts}
              handleClose={handlePlusButtonClick}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
            />
          )}
          <ManagementBar
            adminId={adminId}
            filter={filter}
            handleFilterChange={handleFilterChange}
            isManaging={isManaging}
            handleMode={handleMode}
            categories={categories}
            setProducts={setProducts}
          />
          <div className='pb-4 w-full flex flex-wrap justify-center gap-4'>
            {products.length > 0 && (
              products.map((product) => (
                <ShopItem
                  key={product.id}
                  product={product}
                  showButtons={!isManaging && adminId}
                  cart={cart}
                  setCart={setCart}
                />
            )))}
          </div>
          <PaginationBar
            handleLeftClick={handlePreviousPage}
            handleRightClick={handleNextPage}
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};
  
export default Inventory;