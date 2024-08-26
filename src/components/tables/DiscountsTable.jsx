import { FaEdit } from 'react-icons/fa';

import { getDiscountValue, formatDatetime } from '../../utilities/discounts.jsx';

import DiscountForm from '../forms/DiscountForm.jsx';

function DiscountsTable({
  isWaitingResponse,
  setIsWaitingResponse,
  discounts,
  setDiscounts,
  isAdding,
  setIsAdding,
  handleIsAdding
}) {

  const handleIsEditing = (id) => {
    setIsAdding(false);
    setDiscounts((currentDiscounts) => 
      currentDiscounts.map(discount => {
        if (discount.id === id) {
          return { ...discount, isEditing: !discount.isEditing, value: '' };
        }
        return discount;
      })
    );
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
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
              handleClose={handleIsAdding}
              isEditing={false}
              setDiscounts={setDiscounts}
            />
          )}
          {discounts.map(discount => (
            discount.isEditing ? (
              <DiscountForm 
                key={discount.id}
                isWaitingResponse={isWaitingResponse}
                setIsWaitingResponse={setIsWaitingResponse}
                handleClose={() => handleIsEditing(discount.id)}
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