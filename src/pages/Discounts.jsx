import { useState, useEffect } from 'react';

import { getAllDiscounts, getDiscountsByValidity } from '../services/discountsService';

import { AiOutlineLoading } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import DiscountForm from '../components/DiscountForm';

function Discounts() {

  const handleIsAdding = () => {
    setIsAdding(true);
  };

  const handleIsNotAdding = () => {
    setIsAdding(false);
  };

  const handleIsEditing = (id) => {
    const currentDiscounts = discounts;
    setDiscounts(currentDiscounts.map(discount =>
      discount.id === id
        ? { ...discount, isEditing: true }
        : discount
    ));
  };

  const handleIsNotEditing = (id) => {
    const currentDiscounts = discounts;
    setDiscounts(currentDiscounts.map(discount =>
      discount.id === id
        ? { ...discount, isEditing: false }
        : discount
    ));
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [discounts, setDiscounts] = useState([]);
  const [filter, setFilter] = useState('all');

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

  useEffect(() => {
    fetchDiscounts();
  }, []);

  useEffect(() => {
    updateDiscounts(filter);
  }, [filter])

  const getDiscountValue = (discount) => {
    let isPercentage;
    if ((discount.percentage && discount.amount) || (discount.percentage && !discount.amount))
      isPercentage = true;
    else
      isPercentage = false;
    if (isPercentage)
      return discount.percentage * 100 + '%';
    else
      return '$' + discount.amount;
  };

  const handleOnFilterClick = (e) => {
    const value = e.target.value;
    setFilter(value);
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
          <div className='overflow-auto w-full px-6 rounded-lg shadow-lg'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-purp-dark'>
                  <th className='text-left p-2'>Descuento</th>
                  <th className='text-left p-2'>Inicio</th>
                  <th className='text-left p-2'>Fin</th>
                  <th className='text-center p-2'>Valor</th>
                  <th className=''></th>
                </tr>
              </thead>
              <tbody>
                {isAdding && (
                  <DiscountForm 
                    handleClose={handleIsNotAdding}
                    isEditing={false}
                  />
                )}
                {discounts.map(discount => (
                  discount.isEditing ? (
                    <DiscountForm 
                      key={discount.id}
                      handleClose={() => handleIsNotEditing(discount.id)}
                      isEditing={true}
                      discount={discount}
                    />
                  ) : (
                    <tr key={discount.id} className='border-b-2 border-purp-dark/15'>
                      <td className='p-4 '>
                        {discount.name}
                      </td>
                      <td className='p-4'>
                        <p>{new Date(discount.startDate).toLocaleString()}</p>
                      </td>
                      <td className='p-4'>
                        <p>{new Date(discount.endDate).toLocaleString()}</p>
                      </td>
                      <td className='p-4 text-center'>
                        <p>{getDiscountValue(discount)}</p>
                      </td>
                      <td className='p-4 text-center'>
                        <button
                          onClick={() => handleIsEditing(discount.id)}
                          className='scale-95 hover:scale-100 transition hover:opacity-70'
                        >
                          <FaEdit size='1.8rem' color='#605399' />
                        </button>
                      </td>
                  </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );  
};
  
export default Discounts;