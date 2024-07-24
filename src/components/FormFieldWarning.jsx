import { RiErrorWarningFill } from "react-icons/ri";

function FormFieldWarning({ isFormField, message }) {

  return (
    <p
      className={`${isFormField ? 'invisible' : 'visible'} h-6 text-xs mt-0 mb-2 flex items-center text-warn-red`}>
        <RiErrorWarningFill className="mr-1"/>
          {message}
    </p>
  );

};

export default FormFieldWarning;