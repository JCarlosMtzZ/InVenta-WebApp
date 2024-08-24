import { useState, useRef } from "react";

import { FaUser } from "react-icons/fa";

import FormFieldWarning from '../FormFieldWarning.jsx';

import { MdOutlineDateRange } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import { roundToK, formatDateToYearMonthDay } from "../../utilities/dashboard.jsx";

function DashboardTopBar({ updateData, adminData, dateData }) {

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  
  const [selectedStartDate, setSelectedStartDate] = useState(dateData.minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateData.maxDate);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isEndDate, setIsEndDate] = useState(true);

  const [hideDateRangeError, setHideDateRangeError] = useState(true);

  const handleStartIconClick = () => {
    startDateInputRef.current.showPicker();
  };
  const handleEndIconClick = () => {
    endDateInputRef.current.showPicker();
  };
  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
    setIsStartDate(!!e.target.value);
    setHideDateRangeError(true);
  };
  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
    setIsEndDate(!!e.target.value);
    setHideDateRangeError(true);
  };

  const handleSubmit = async () => {
    const isCurrentStartDate = isStartDate;
    const isCurrentEndDate = isEndDate;

    if (!isCurrentStartDate || !isCurrentEndDate)
      return;
    
    const formattedStartDate = new Date(selectedStartDate);
    const formattedEndDate = new Date(selectedEndDate);
    
    if (formattedStartDate >= formattedEndDate) {
      setHideDateRangeError(false);
      return;
    }
    
    //formattedStartDate.setDate(formattedStartDate.getDate() + 1);
    //formattedEndDate.setDate(formattedEndDate.getDate() + 1);
    
    await updateData(formattedStartDate, formattedEndDate);
  };

  return (
    <div className="bg-white flex flex-wrap justify-between w-full rounded-lg shadow-lg">
      <div className="drop-shadow-lg flex items-center gap-4 py-2 px-4">
        <FaUser size='1.5rem' color="#605399" />
        <p className="text-lg font-semibold">{`${adminData.firstName} ${adminData.lastName} (${adminData.email})`}</p>
      </div>
      <div className="flex flex-col px-4">
        <div className="flex flex-wrap gap-2 py-2 items-center">
          <p className="text-lg font-semibold">Reporte de</p>
          <div className={`${!isStartDate && 'border-2 border-warn-red'} flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg`}>
            <input 
              type="date" 
              ref={startDateInputRef}
              onChange={handleStartDateChange}
              className="opacity-0 absolute pointer-events-none w-0 h-0"
            />
            <p className="text-lg">{selectedStartDate && formatDateToYearMonthDay(new Date(selectedStartDate))}</p>
            <button
              onClick={handleStartIconClick}
              className="hover:scale-110 transition"
              >
              <MdOutlineDateRange size='1.5rem' />
            </button>
          </div>
          <p className="text-lg font-semibold">a</p>
          <div className={`${!isEndDate && 'border-2 border-warn-red'} flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg`}>
            <input 
              type="date" 
              ref={endDateInputRef}
              onChange={handleEndDateChange}
              className="opacity-0 absolute pointer-events-none w-0 h-0"
            />
            <p className="text-lg">{selectedEndDate && formatDateToYearMonthDay(new Date(selectedEndDate))}</p>
            <button
              onClick={handleEndIconClick}
              className="hover:scale-110 transition"
            >
              <MdOutlineDateRange size='1.5rem' />
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="hover:scale-110 transition"
          >
            <IoSearchSharp size='1.5rem' />
          </button>
        </div>
        <FormFieldWarning
          hiddingDisplay='hidden'
          isFormField={hideDateRangeError}
          message='La fecha de inicio debe ser menor a la final'
        />
      </div>
    </div>
  );
};

export default DashboardTopBar;