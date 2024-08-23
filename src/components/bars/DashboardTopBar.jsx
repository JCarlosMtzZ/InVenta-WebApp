import { useState, useRef } from "react";

import { FaUser } from "react-icons/fa";

import { MdOutlineDateRange } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import { roundToK, formatDateToYearMonthDay } from "../../utilities/dashboard.jsx";

function DashboardTopBar({ adminData, dateData }) {

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  
  const [selectedStartDate, setSelectedStartDate] = useState(dateData.minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateData.maxDate);

  const handleStartIconClick = () => {
    startDateInputRef.current.showPicker();
  };
  const handleEndIconClick = () => {
    endDateInputRef.current.showPicker();
  };
  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
  };

  return (
    <div className="bg-white flex justify-between w-full rounded-lg shadow-lg">
      <div className="drop-shadow-lg flex items-center gap-4 py-2 px-4">
        <FaUser size='1.5rem' color="#605399" />
        <p className="text-lg font-semibold">{`${adminData.firstName} ${adminData.lastName} (${adminData.email})`}</p>
      </div>
      <div className="flex gap-2 py-2 px-4 items-center rounded-lg shadow-md">
        <p className="text-lg font-semibold">Reporte de</p>
        <div className="flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg">
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
        <div className="flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg">
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
          className="hover:scale-110 transition"
        >
          <IoSearchSharp size='1.5rem' />
        </button>
      </div>
      
    </div>
  );
};

export default DashboardTopBar;