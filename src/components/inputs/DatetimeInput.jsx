import { useRef } from "react";

import { MdOutlineDateRange } from "react-icons/md";

import { formatDatetime } from "../../utilities/discounts";

function DatetimeInput({
  isDatetime,
  name,
  value,
  handleInputChange

}) {

  const datetimeInputRef = useRef(null);
  const handleIconClick = () => {
    datetimeInputRef.current.showPicker();
  };

  return (
    <div className={`${!isDatetime && 'p-2 border-2 border-warn-red rounded-lg bg-warn-red/20'} flex justify-between py-1 w-[220px] border-b-2 border-black/50 focus:outline-none`}>
      <input
        type="datetime-local"
        name={name}
        ref={datetimeInputRef}
        value={value}
        onChange={handleInputChange}
        className={`opacity-0 absolute pointer-events-none w-0 h-0`}
      />
      <p className="text-lg">{value && formatDatetime(new Date(value))}</p>
      <button
        onClick={handleIconClick}
        className="hover:scale-110 transition"
      >
        <MdOutlineDateRange size='1.5rem' />
      </button>
    </div>
  );
};

export default DatetimeInput;