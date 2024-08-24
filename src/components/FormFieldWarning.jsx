import { RiErrorWarningFill } from "react-icons/ri";

function FormFieldWarning({ hiddingDisplay, isFormField, message }) {

  return (
    <p
      className={`${isFormField ? hiddingDisplay : 'visible'} h-6 text-sm mt-1 mb-2 flex items-center text-warn-red`}>
        <RiErrorWarningFill className="mr-1"/>
          {message}
    </p>
  );

};

export default FormFieldWarning;