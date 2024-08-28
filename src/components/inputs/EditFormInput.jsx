function EditFormInput({
  type,
  name,
  id,
  value,
  onChange,
  isValue,
  style }) {

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`${!isValue && 'border-2 border-warn-red rounded-lg bg-warn-red/20'} ${style} focus:outline-none border-b-2 p-1`}
    />
  );
};

export default EditFormInput;