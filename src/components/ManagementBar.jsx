import { MdOutlineInventory } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';
import SearchBar from '../components/SearchBar.jsx';

function ManagementBar({
  handleMode,
  isManaging,
  handleFilterChange,
  filter,
  categories,
  originalProducts,
  filteredProducts,
  setFilteredProducts }) {
  return (
    <div className='scrollbar-none w-full h-20 flex items-center px-4 min-[900px]:px-0 min-[900px]:justify-center gap-10 overflow-x-scroll'>
      <div className='drop-shadow-md flex gap-8 text-purp-dark text-xs font-semibold'>
        <button
          onClick={handleMode}
          className={`${isManaging ? 'opacity-100' : 'opacity-50'} flex flex-col items-center justify-center hover:scale-105 transition`}>
          <MdOutlineInventory size='2.5rem' color='#605399' />
          <p className=''>Inventario</p>
        </button>
        <button
          onClick={handleMode}
          className={`${isManaging ? 'opacity-50' : 'opacity-100'} flex flex-col items-center justify-center hover:scale-105 transition`}>
          <AiOutlineStock size='2.5rem' color='#605399' />
          <p className=''>Venta</p>
        </button>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button
          type='button'
          value='all'
          onClick={handleFilterChange}
          className={`${filter === 'all' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
        >
          Todos
        </button>
        <button
          type='button'
          value='discounts'
          onClick={handleFilterChange}
          className={`${filter === 'discounts' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition`}
        >
          Ofertas
        </button>
        <select
          name="categoryId"
          id="categoryId"
          value={`${filter === 'all' || filter === 'discounts' ? '' : filter}`}
          onChange={handleFilterChange}
          className={`${filter != 'all' && filter != 'discounts' ? 'bg-purp-dark/90 text-white' : 'bg-purp-dark/20'} h-10 w-fit px-4 rounded-lg hover:scale-105 transition cursor-pointer focus:outline-none`}
        >
          <option
            value=""
            disabled
          >
            Categorías
          </option>
            {categories.length > 0 && (
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))
            )}
        </select>
        <SearchBar
          prefetchedDataSource={filter}
          categories={categories}
          originalProducts={originalProducts}
          externalProducts={filteredProducts}
          setExternalProducts={setFilteredProducts}
          hasDropdown={false}  
        />
      </div>
    </div>
  );
}

export default ManagementBar;