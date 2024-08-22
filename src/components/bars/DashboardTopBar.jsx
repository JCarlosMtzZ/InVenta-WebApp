import { useState, useRef } from "react";

import NumberAnimation from "../NumberAnimation.jsx";

import { MdOutlineDateRange } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import { roundToK, formatDateToYearMonthDay } from "../../utilities/dashboard.jsx";

function DashboardTopBar({ data }) {

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

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
    <div className="flex justify-between w-full border">
      <div className="flex gap-2 py-2 px-4 items-center rounded-lg shadow-md">
        <p className="text-xl font-semibold">Reporte de</p>
        <div className="flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg">
          <input 
            type="date" 
            ref={startDateInputRef}
            onChange={handleStartDateChange}
            className="opacity-0 absolute pointer-events-none w-0 h-0"
          />
          <p>{selectedStartDate && formatDateToYearMonthDay(new Date(selectedStartDate))}</p>
          <button
            onClick={handleStartIconClick}
            className="hover:scale-110 transition"
          >
            <MdOutlineDateRange size='1.5rem' />
          </button>
        </div>
        <p className="text-xl font-semibold">a</p>
        <div className="flex items-center gap-2 p-2 bg-purp-dark/10 rounded-lg">
          <input 
            type="date" 
            ref={endDateInputRef}
            onChange={handleEndDateChange}
            className="opacity-0 absolute pointer-events-none w-0 h-0"
          />
          <p>{selectedEndDate && formatDateToYearMonthDay(new Date(selectedEndDate))}</p>
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
      <div className="flex gap-2">
        <div className="rounded-lg shadow-md flex flex-col gap-0.5 py-2 px-4 justify-center items-center">
          <NumberAnimation
            textSize="text-xl"
            fontWeight="font-semibold"
            endValue={roundToK(data.totalUnits)}
            prefix=''
            suffix={Math.floor(data.totalUnits / 1000) >= 1 ? 'K' : ''}
            duration={1000}
          />
          <p className="text-xs">Unidades vendidas</p>
        </div>
        <div className="rounded-lg shadow-md flex flex-col gap-0.5 py-2 px-4 justify-center items-center">
          <NumberAnimation
            textSize="text-xl"
            fontWeight="font-semibold"
            endValue={roundToK(data.subtotal)}
            prefix='$'
            suffix={Math.floor(data.subtotal / 1000) >= 1 ? 'K' : ''}
            duration={1000}
          />
          <p className="text-xs">Ingresos brutos</p>
        </div>
        <div className="rounded-lg shadow-md flex flex-col gap-0.5 py-2 px-4 justify-center items-center">
          <NumberAnimation
            textSize="text-xl"
            fontWeight="font-semibold"
            endValue={roundToK(data.total)}
            prefix='$'
            suffix={Math.floor(data.total / 1000) >= 1 ? 'K' : ''}
            duration={1000}
          />
          <p className="text-xs">Ingresos netos</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;