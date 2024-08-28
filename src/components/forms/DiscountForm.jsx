import { useEffect, useState } from 'react';

import { TbCirclePercentage } from 'react-icons/tb';
import { AiOutlineDollarCircle } from 'react-icons/ai';

import { addDiscount, updateDiscount } from '../../services/discountsService.js';

import { isoToDateTimeLocal } from '../../utilities/discounts.jsx';

import FormFieldWarning from '../FormFieldWarning.jsx';
import DatetimeInput from '../inputs/DatetimeInput.jsx';
import EditingFormButtons from '../buttons/EditingFormButtons.jsx';
import EditFormInput from '../inputs/EditFormInput.jsx';

function DiscountForm({
  isWaitingResponse,
  setIsWaitingResponse,
  handleClose,
  isEditing,
  discount,
  setDiscounts }) {

  const [isPercentage, setIsPercentage] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [warnMessage, setWarnMessage] = useState('Requerido');

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

  useEffect(() => {
    if (isEditing) {
      const currentDiscount = {
        id: discount.id,
        name: discount.name,
        startDate: isoToDateTimeLocal(discount.startDate),
        endDate: isoToDateTimeLocal(discount.endDate),
        percentage: '',
        amount: '',
        value: '',
        isEditing: discount.isEditing
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

    if (name === 'value' || name === 'startDate')
      if (!value) setWarnMessage('Requerido');
  };

  const handleDiscountValue = () => {
    setIsPercentage(!isPercentage);
  };

  useEffect(() => {
    const processDiscount = async (discount) => {
      try {
        if (isEditing) {
          await updateDiscount(discount);
          setDiscounts((currentDiscounts) =>
            currentDiscounts.map(d =>
            d.id === discount.id
            ? { ...d, ...discount}
            : d
          ));
        }
        else {
          const newDiscountResult = await addDiscount(discount);
          discount.id = newDiscountResult.id;
          setDiscounts((currentDiscounts) =>
            [...currentDiscounts, discount]);
        }
      } catch (error) {
        console.error('Error processing Discount:', error);
      } finally {
        setIsWaitingResponse(false);
        handleClose();
      }
    };
    if ((newDiscountData.percentage || newDiscountData.amount) && isReady) {
      setIsReady(false);
      processDiscount(newDiscountData);
    }
  }, [isReady, newDiscountData]);

  const handleSubmit = async () => {
    setIsWaitingResponse(true);

    const currentIsNewDiscountData = {
      isName: !!newDiscountData.name,
      isStartDate: !!newDiscountData.startDate,
      isEndDate: !!newDiscountData.endDate,
      isValue: !!newDiscountData.value
    };
    
    if (Object.values(currentIsNewDiscountData).some(value => !value)) {
      setIsNewDiscountData(currentIsNewDiscountData);
      setIsWaitingResponse(false);
      return;
    }
    const startDate = new Date(newDiscountData.startDate);
    const endDate = new Date(newDiscountData.endDate);
    if (startDate >= endDate) {
      setWarnMessage('La fecha de inicio debe ser menor a la final');
      setIsNewDiscountData({
        ...isNewDiscountData,
        isStartDate: false});
        setIsWaitingResponse(false);
      return;
    }
    const currentDiscountValue = parseFloat(newDiscountData.value);
    if (currentDiscountValue <= 0) {
      setWarnMessage('El valor debe ser mayor a cero');
      setIsNewDiscountData({
        ...isNewDiscountData,
        isValue: false});
      setIsWaitingResponse(false);
      return;
    }
    if (isPercentage && currentDiscountValue >= 100) {
      setWarnMessage('El valor debe ser menor a 100');
      setIsNewDiscountData({
        ...isNewDiscountData,
      isValue: false});
      setIsWaitingResponse(false);
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
    <tr className={`relative w-full border-b-2 border-purp-dark/15`}>
      <td className={`${warnMessage != 'Requerido' && 'pb-7'} p-4`}>
        <EditFormInput
          type="text" 
          placeholder='Nombre'
          name='name'
          value={newDiscountData.name}
          isValue={isNewDiscountData.isName}
          onChange={handleInputChange}
          style='w-[250px]'
        />
      </td>
      <td className={`${warnMessage != 'Requerido' && 'pb-7'} p-4`}>
        <DatetimeInput
          isDatetime={isNewDiscountData.isStartDate}
          name='startDate'
          value={newDiscountData.startDate}
          handleInputChange={handleInputChange}
        />
      </td>
      <td className={`${warnMessage != 'Requerido' && 'pb-7'} p-4`}>
        <DatetimeInput
          isDatetime={isNewDiscountData.isEndDate}
          name='endDate'
          value={newDiscountData.endDate}
          handleInputChange={handleInputChange}
        />
      </td>
      <td className={`${warnMessage != 'Requerido' && 'pb-7'} p-4`}>
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
          <EditFormInput
            type="number"
            name='value'
            value={newDiscountData.value}
            isValue={isNewDiscountData.isValue}
            onChange={handleInputChange}
            style='text-center w-[60px]'
          />
        </div>
      </td>
      <td className={`${warnMessage != 'Requerido' && 'pb-7'} p-4`}>
        <EditingFormButtons 
          isWaitingResponse={isWaitingResponse}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </td>
      <td className='-bottom-1 left-4 absolute'>
        <FormFieldWarning
          hiddingDisplay='hidden'
          isFormField={warnMessage === 'Requerido' ? true : false}
          message={warnMessage}
        />
      </td>
    </tr>
  );
};

export default DiscountForm;