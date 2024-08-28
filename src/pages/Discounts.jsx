import { useState, useEffect } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';

import { getAllDiscounts, getDiscountsByValidity } from '../services/discountsService';

import DiscountsTable from '../components/tables/DiscountsTable.jsx';
import FilterButton from '../components/buttons/FilterButton.jsx';
import CommonButton from '../components/buttons/CommonButton.jsx';

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
          <div className='py-2 mb-4 w-full flex flex-wrap gap-4 items-center justify-between'>
            <FilterButton
              text='Todos'
              value='all'
              onClick={handleOnFilterClick}
              filter={filter}
            />
            <FilterButton
              text='Anteriores'
              value='previous'
              onClick={handleOnFilterClick}
              filter={filter}
            />
            <FilterButton
              text='Vigentes'
              value='current'
              onClick={handleOnFilterClick}
              filter={filter}
            />
            <FilterButton
              text='Próximos'
              value='next'
              onClick={handleOnFilterClick}
              filter={filter}
            />
            <CommonButton
              onClick={handleIsAdding}
              width='ml-auto w-[100px]'
              text='Agregar'
            />
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