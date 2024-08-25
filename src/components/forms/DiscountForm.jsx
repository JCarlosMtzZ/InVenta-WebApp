import { useEffect, useState } from 'react';

import { addDiscount, updateDiscount } from '../../services/discountsService.js';

import { TbCirclePercentage } from 'react-icons/tb';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineCancel } from 'react-icons/md';

import FormFieldWarning from '../FormFieldWarning.jsx';

function DiscountForm({ handleClose, isEditing, discount }) {

  const [isPercentage, setIsPercentage] = useState(true);
  const [isReady, setIsReady] = useState(false);


  const [valueFieldMessage, setValueFieldMessage] = useState('Requerido');
  const [dateFieldMessage, setDateFieldMessage] = useState('Requerido');

  const isoToDateTimeLocal = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    if (isEditing) {
      const currentDiscount = {
        id: discount.id,
        name: discount.name,
        startDate: isoToDateTimeLocal(discount.startDate),
        endDate: isoToDateTimeLocal(discount.endDate),
        percentage: '',
        amount: '',
        value: ''
      }
      if (discount.percentage) {
        setIsPercentage(true);
        currentDiscount.value = discount.percentage * 100;
      } else {
        setIsPercentage(false);
        currentDiscount.value = discount.amount;
      }
      setNewDiscountData(currentDiscount);
    }
  }, []);

  const [newDiscountData, setNewDiscountData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    percentage: '',
    amount: '',
    value: ''
  });

  const [isNewDiscountData, setIsNewDiscountData] = useState({
    isName: true,
    isStartDate: true,
    isEndDate: true,
    isValue: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscountData({
      ...newDiscountData,
      [name]: value,
    });

    setIsNewDiscountData({
      ...isNewDiscountData,
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}`]: !!value
    })

    if (name === 'value')
      if (!value) setValueFieldMessage('Requerido');
    if (name === 'startDate')
      if (!value) setDateFieldMessage('Requerido');
  };

  const handleDiscountValue = () => {
    setIsPercentage(!isPercentage);
  };

  useEffect(() => {
    const processDiscount = async (discount) => {
      try {
        if (isEditing) {
          const updatedDiscount = await updateDiscount(discount);
          console.log(updatedDiscount);
        } else {
          const addedDiscount = await addDiscount(discount);
          console.log(addedDiscount);
        }
      } catch (error) {
        console.error('Error processing Discount:', error);
      }
    };
    if ((newDiscountData.percentage || newDiscountData.amount) && isReady) {
      setIsReady(false);
      processDiscount(newDiscountData);
    }
  }, [isReady, newDiscountData]);


  const handleSubmit = async () => {

    const currentIsNewDiscountData = {
      isName: !!newDiscountData.name,
      isStartDate: !!newDiscountData.startDate,
      isEndDate: !!newDiscountData.endDate,
      isValue: !!newDiscountData.value
    };
    
    if (Object.values(currentIsNewDiscountData).some(value => !value)) {
      setIsNewDiscountData(currentIsNewDiscountData);
      //setIsWaitingResponse(false);
      return;
    }
    const startDate = new Date(newDiscountData.startDate);
    const endDate = new Date(newDiscountData.endDate);
    if (startDate >= endDate) {
      setDateFieldMessage('Debe ser menor a la fecha fin');
      setIsNewDiscountData({
        ...isNewDiscountData,
        isStartDate: false});
      return;
    }
    const currentDiscountValue = parseFloat(newDiscountData.value);
    if (currentDiscountValue <= 0) {
      setValueFieldMessage('Mayor a 0');
      setIsNewDiscountData({
        ...isNewDiscountData,
        isValue: false});
      return;
    }
    if (isPercentage && currentDiscountValue >= 100) {
      setValueFieldMessage('Menor a 100');
      setIsNewDiscountData({
        ...isNewDiscountData,
      isValue: false});
      return;
    }
    if (isPercentage) {
      setNewDiscountData({
        ...newDiscountData,
        percentage: currentDiscountValue / 100,
        amount: null
      });
    } else {
      setNewDiscountData({
        ...newDiscountData,
        percentage: null,
        amount: currentDiscountValue
      });
    }
    setIsReady(true);
  };

  return (
    <tr className='t-4 w-full border-b-2 border-purp-dark/15'>
      <td className='p-4 pt-8'>
        <input
          type="text" 
          placeholder='Nombre'
          name='name'
          value={newDiscountData.name}
          onChange={handleInputChange}
          className='w-full p-1 border-b-2 border-black/50 focus:outline-none'
        />
        <FormFieldWarning
          isFormField={isNewDiscountData.isName}
          message='Requerido'
        />
      </td>
      <td className='p-4 pt-8'>
        <input
          type="datetime-local"
          name='startDate'
          value={newDiscountData.startDate}
          onChange={handleInputChange}
          className='py-1 w-full border-b-2 border-black/50 focus:outline-none'
        />
        <FormFieldWarning
          isFormField={isNewDiscountData.isStartDate}
          message={dateFieldMessage}
        />
      </td>
      <td className='p-4 pt-8'>
        <input
          type="datetime-local"
          name='endDate'
          value={newDiscountData.endDate}
          onChange={handleInputChange}
          className='py-1 w-full border-b-2 border-black/50 focus:outline-none'
        />
        <FormFieldWarning
          isFormField={isNewDiscountData.isEndDate}
          message='Requerido'
        />
      </td>
      <td className='p-4 pt-8'>
        <div className='flex justify-center items-center gap-1'>
          <button
            onClick={handleDiscountValue}
            className='hover:opacity-70 transition'
          >
            {isPercentage ?
              <TbCirclePercentage size='1.75rem' color='#605399' />
              :
              <AiOutlineDollarCircle size='1.75rem' color='#605399' />
            }
          </button>
          <input
            type="number"
            name='value'
            value={newDiscountData.value}
            onChange={handleInputChange}
            className='text-center w-[60px] p-1 border-b-2 border-black/50 focus:outline-none'
          />
        </div>
        <FormFieldWarning
          isFormField={isNewDiscountData.isValue}
          message={valueFieldMessage}
        />
      </td>
      <td className=''>
        <div className='flex gap-1'>
          <button
            onClick={handleSubmit}
            className='p-1 bg-purp-dark rounded-lg hover:opacity-70 transition'
          >
            <GiConfirmed color='white' size='1.75rem' />
          </button>
          <button
            onClick={handleClose}
            className='p-1 bg-purp-dark rounded-lg hover:opacity-70 transition'
          >
            <MdOutlineCancel color='white' size='1.75rem' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DiscountForm;