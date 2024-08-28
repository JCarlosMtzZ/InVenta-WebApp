import { MdOutlineInventory } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';

import SearchBar from './SearchBar.jsx';
import InventoryModeButton from '../buttons/InventoryModeButton.jsx';
import FilterButton from '../buttons/FilterButton.jsx';
import DropdownButton from '../buttons/DropdownButton.jsx';

function ManagementBar({
  adminId,
  filter,
  handleFilterChange,
  isManaging,
  handleMode,
  categories,
  setProducts }) {

  const getFilterName = (filter) => {
    if (filter === 'all')
      return 'Todos';
    if (filter === 'discounts')
      return 'Ofertas';
    else {
      return categories.find(category => category.id === filter).name;
    }
  };

  return (
    <div className='p-4 w-full flex flex-wrap items-center justify-center gap-x-4 md:gap-x-10 gap-y-3'>
      {adminId &&
        <div className='drop-shadow-md flex gap-8 text-purp-dark text-xs font-semibold'>
          <InventoryModeButton
            onClick={handleMode}
            isManaging={isManaging}
            Icon={<MdOutlineInventory size='2.5rem' color='#605399' />}
            text='Inventario'
          />
          <InventoryModeButton
            onClick={handleMode}
            isManaging={!isManaging}
            Icon={<AiOutlineStock size='2.5rem' color='#605399' />}
            text='Venta'
          />
        </div>
      }
      {adminId &&
        <SearchBar
          filter={filter}
          getFilterName={() => getFilterName(filter)}
          setExternalProducts={setProducts}
          hasDropdown={false}  
        />
      }
      <div className='flex items-center justify-center gap-4'>
        <FilterButton
          text='Todos'
          value='all'
          onClick={handleFilterChange}
          filter={filter}
        />
        <FilterButton
          text='Ofertas'
          value='discounts'
          onClick={handleFilterChange}
          filter={filter}
        />
        <DropdownButton
          filter={filter}
          name='categoryId'
          id='categoryId'
          onChange={handleFilterChange}
          defaultOption={<option value='' disabled>Categorías</option>}
          data={categories}
        />
      </div>
    </div>
  );
}

export default ManagementBar;