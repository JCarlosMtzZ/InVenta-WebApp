import FormFieldWarning from "../FormFieldWarning";

function InputWithWarning({
  label,
  type,
  id,
  name,
  value,
  isValue,
  onChange,
  message,
  width
}) {

  return (
    <div className={`flex flex-col ${width}`}>
      <label htmlFor={id} className="mb-2">{label}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className={`rounded-lg p-2 border-solid border-2 border-opacity-45 ${isValue ? 'border-black' : 'border-warn-red'} resize-none h-14`}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`h-10 rounded-lg p-2 border-solid border-2 border-opacity-45 ${isValue ? 'border-black' : 'border-warn-red'}`}
          />
        )}
        <FormFieldWarning
          hiddingDisplay='invisible'
          isFormField={isValue}
          message={message}
        />
    </div>
  );
};

export default InputWithWarning;