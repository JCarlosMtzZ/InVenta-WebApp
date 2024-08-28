function DropdownButton({
  filter,
  name,
  id,
  value,
  isValue,
  onChange,
  defaultOption,
  data,
  isDiscountsData
}) {

  return (
    <select
      name={name}
      id={id}
      value={`${filter ? (
        filter === 'all' || filter === 'discounts' ? '' : filter
      ) : (
        value
      )}`}
      onChange={onChange}
      className={`${filter ?
        `${filter != 'all' && filter != 'discounts' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition cursor-pointer focus:outline-none`
        :
        `p-1 rounded-lg border-2 h-10 border-opacity-45 w-full ${isValue ? 'border-black' : 'border-warn-red'}`}`}
    >
      {defaultOption && defaultOption}
      {data.length > 0 && (
        data.map(item => (
          <option
            key={item.id}
            value={item.id}
          >
            {isDiscountsData ?
              `${item.name} (${item.percentage ? item.percentage * 100 + '%' : '$' + item.amount})`
              :
              item.name
            }
          </option>
        ))
      )}
    </select>
  );
};

export default DropdownButton;