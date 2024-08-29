import { useState } from "react";

import { FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

import FormFieldWarning from '../FormFieldWarning.jsx';
import DateInput from "../inputs/DateInput.jsx";

function DashboardTopBar({ fetchData, adminData, dateData }) {
  
  const [selectedStartDate, setSelectedStartDate] = useState(dateData.minDate);
  const [selectedEndDate, setSelectedEndDate] = useState(dateData.maxDate);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isEndDate, setIsEndDate] = useState(true);

  const [hideDateRangeError, setHideDateRangeError] = useState(true);

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

    if (!isStartDate || !isEndDate)
      return;
    
    const formattedStartDate = new Date(selectedStartDate);
    const formattedEndDate = new Date(selectedEndDate);
    
    if (formattedStartDate >= formattedEndDate) {
      setHideDateRangeError(false);
      return;
    }
    
    const abortController = new AbortController();
    await fetchData(abortController, true, formattedStartDate, formattedEndDate);
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
          <DateInput
            isDate={isStartDate}
            value={selectedStartDate}
            handleInputChange={handleStartDateChange}
          />
          <p className="text-lg font-semibold">a</p>
          <div className="flex gap-2">
            <DateInput
              isDate={isEndDate}
              value={selectedEndDate}
              handleInputChange={handleEndDateChange}
            />
            <button
              onClick={handleSubmit}
              className="hover:scale-110 transition"
            >
              <IoSearchSharp size='1.5rem' />
            </button>
          </div>
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