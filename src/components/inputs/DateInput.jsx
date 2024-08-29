import { useRef } from "react";

import { MdOutlineDateRange } from "react-icons/md";

import { formatDateToYearMonthDay } from "../../utilities/dashboard";

function DateInput({ isDate, value, handleInputChange }) {

  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    dateInputRef.current.showPicker();
  };

  return (
    <div className={`${!isDate && 'border-2 border-warn-red bg-warn-red/20'} flex items-center gap-2 justify-between min-w-[220px] p-2 bg-purp-dark/10 rounded-lg`}>
      <input 
        type="date" 
        ref={dateInputRef}
        onChange={handleInputChange}
        className="opacity-0 absolute pointer-events-none w-0 h-0"
      />
      <p className="text-lg">{value && formatDateToYearMonthDay(new Date(value))}</p>
      <button
        onClick={handleIconClick}
        className="hover:scale-110 transition"
        >
        <MdOutlineDateRange size='1.5rem' />
      </button>
    </div>
  );
};

export default DateInput;