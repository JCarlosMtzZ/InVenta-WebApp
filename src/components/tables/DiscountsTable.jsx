import { useState } from 'react';

import { FaEdit } from 'react-icons/fa';

import { getDiscountValue, formatDatetime } from '../../utilities/discounts.jsx';

import DiscountForm from '../forms/DiscountForm.jsx';

function DiscountsTable({
  formAnimation,
  isWaitingResponse,
  setIsWaitingResponse,
  discounts,
  setDiscounts,
  isAdding,
  handleIsNotAdding
}) {

  const [editFormAnimation, setEditFormAnimation] = useState('');

  const handleIsEditing = (id) => {
    handleIsNotAdding();
    setEditFormAnimation('animate-fadeInRight');
    setDiscounts((currentDiscounts) => 
      currentDiscounts.map(discount => {
        if (discount.id === id) {
          return { ...discount, isEditing: true, value: '' };
        }
        return { ...discount, isEditing: false, value: '' };
      })
    );
    setTimeout(() => {
      setEditFormAnimation('');
    }, 200);
  };

  const handleIsNotEditing = (id) => {
    setEditFormAnimation('animate-fadeOutRight');
    setTimeout(() => {
      setDiscounts((currentDiscounts) => 
        currentDiscounts.map(discount => {
          if (discount.id === id) {
            return { ...discount, isEditing: false, value: '' };
          }
          return discount;
        })
      );
      setEditFormAnimation('');
    }, 180);
  };

  return(
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
              animationClass={formAnimation}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
              handleClose={handleIsNotAdding}
              isEditing={false}
              setDiscounts={setDiscounts}
            />
          )}
          {discounts.map(discount => (
            discount.isEditing ? (
              <DiscountForm 
                key={discount.id}
                animationClass={editFormAnimation}
                isWaitingResponse={isWaitingResponse}
                setIsWaitingResponse={setIsWaitingResponse}
                handleClose={() => handleIsNotEditing(discount.id)}
                isEditing={true}
                discount={discount}
                setDiscounts={setDiscounts}
              />
            ) : (
              <tr key={discount.id} className='border-b-2 border-purp-dark/15'>
                <td className='p-4 '>
                  {discount.name}
                </td>
                <td className='p-4'>
                  <p>{formatDatetime(new Date(discount.startDate))}</p>
                </td>
                <td className='p-4'>
                  <p>{formatDatetime(new Date(discount.endDate))}</p>
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
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsTable;