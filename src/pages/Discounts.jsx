import { useState, useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';

function Discounts() {

  const [isLoading, setIsLoading] = useState(true);
  const [discounts, setDiscounts] = useState([]);
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch('http://localhost:3001/discounts')
        if (!response.ok)
          throw new Error('Error fetching discounts');
        const result = await response.json();
        if (result) {
          setDiscounts(result);
          setFilteredDiscounts(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initialFetch();
  }, []);

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

  useEffect(() => {
    handleFilter();
  }, [filter])

  const handleFilter = () => {
    const currentFilter = filter;
    const originalDiscounts = discounts;
    const currentDate = new Date();
    if (filter === 'all')
      setFilteredDiscounts(originalDiscounts);
    if (filter === 'previous') {
      setFilteredDiscounts(originalDiscounts.filter(discount =>
        currentDate > new Date(discount.endDate)
      ));
    }
    if (filter === 'current') {
      setFilteredDiscounts(originalDiscounts.filter(discount =>
        currentDate > new Date(discount.startDate) && currentDate < new Date(discount.endDate)
      ));
    }
    if (filter === 'next') {
      setFilteredDiscounts(originalDiscounts.filter(discount =>
        currentDate < new Date(discount.startDate)
      ));
    }
  };

  return (
    <div className={`p-4 flex ${isLoading && 'items-center'} justify-center w-full min-h-[89.8%]`}>
      {isLoading ? (
          <div className='w-fit h-fit animate-spin'>
            <AiOutlineLoading size='4rem' color='#605399' />
          </div>
      ) : (
        <div className="px-10 w-full h-full">
          <div className='mb-8 flex gap-4 items-center justify-center'>
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
          <div className='w-full px-6 rounded-lg shadow-lg'>
            <table className='w-full'>
              <tr className='border-b-2 border-purp-dark'>
                <th className='text-left p-2 w-[35%]'>Descuento</th>
                <th className='text-left p-2 w-[20%]'>Inicio</th>
                <th className='text-left p-2 w-[20%]'>Fin</th>
                <th className='text-center p-2 w-[12.5%]'>Valor</th>
                <th className='w-[12.5%]'></th>
              </tr>
              {filteredDiscounts.map(discount => (
                <tr className='border-b-2 border-purp-dark/15'>
                  <td className='p-2 '>{discount.name}</td>
                  <td className='p-2'>
                    <p>{discount.startDate.substring(0, 10)}</p>
                    <p>{discount.startDate.substring(11, 19)}</p>
                  </td>
                  <td className='p-2'>
                    <p>{discount.startDate.substring(0, 10)}</p>
                    <p>{discount.startDate.substring(11, 19)}</p>
                  </td>
                  <td className='p-2 text-center'>
                    {getDiscountValue(discount)}
                  </td>
                  <td className='py-2 px-4 flex justify-center'>
                    <button
                      className='scale-95 hover:scale-100 transition hover:opacity-70'
                    >
                      <FaEdit size='1.8rem' className='' />
                    </button>
                  </td>
                </tr>
                ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );  
};
  
export default Discounts;