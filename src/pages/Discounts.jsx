import { useState, useEffect } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';

import { getAllDiscounts, getDiscountsByValidity } from '../services/discountsService';

import DiscountsTable from '../components/tables/DiscountsTable.jsx';

function Discounts({
  isWaitingResponse,
  setIsWaitingResponse
}) {

  const [isLoading, setIsLoading] = useState(true);

  const [discounts, setDiscounts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDiscounts();
  }, []);

  useEffect(() => {
    updateDiscounts(filter);
  }, [filter]);

  const fetchDiscounts = async () => {
    try {
      const data = await getAllDiscounts();
      const updatedData = data.map(discount => ({
        ...discount,
        isEditing: false,
      }));
      setDiscounts(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Discounts:', error);
    }
  };

  const updateDiscounts = async (filter) => {
    setIsLoading(true);
    try {
      if (filter === 'all') {
        const currentDiscounts = await getAllDiscounts();
        setDiscounts(currentDiscounts);
      }
      else {
        const currentDiscounts = await getDiscountsByValidity(filter);
        setDiscounts(currentDiscounts);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Discounts:', error);
    }
  }

  const handleIsAdding = () => {
    setIsAdding(!isAdding);

    setDiscounts((currentDiscounts) =>
      currentDiscounts.map(discount => ({
        ...discount,
        isEditing: false
    })));
  };

  const handleOnFilterClick = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className={`py-4 px-4 sm:px-14 flex ${isLoading && 'items-center'} justify-center w-full min-h-[89.8%]`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className=" w-full h-full">
          <div className='px-6 scrollbar-none overflow-x-auto mb-8 flex gap-4 justify-between'>
            <div className='flex gap-4 items-center justify-center'>
              <button
                value='all'
                onClick={handleOnFilterClick}
                className={`${filter === 'all' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
              >
                Todos
              </button>
              <button
                value='previous'
                onClick={handleOnFilterClick}
                className={`${filter === 'previous' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
              >
                Anteriores
              </button>
              <button
                value='current'
                onClick={handleOnFilterClick}
                className={`${filter === 'current' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
              >
                Vigentes
              </button>
              <button
                value='next'
                onClick={handleOnFilterClick}
                className={`${filter === 'next' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
              >
                Próximos
              </button>
            </div>
            <button
              onClick={handleIsAdding}
              className={`bg-purp-dark text-white h-10 w-fit px-4 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition`}
            >
              Agregar
            </button>
          </div>
          <DiscountsTable
            isWaitingResponse={isWaitingResponse}
            setIsWaitingResponse={setIsWaitingResponse}
            discounts={discounts}
            setDiscounts={setDiscounts}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            handleIsAdding={handleIsAdding}
          />
        </div>
      )}
    </div>
  );  
};
  
export default Discounts;