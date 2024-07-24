import { IoSearchCircleSharp, IoSearchSharp } from "react-icons/io5";

function SearchBar() {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Buscar producto"
        className="text-black focus:outline-none p-3 h-[40px] w-[150px] sm:w-[300px] rounded-l-lg focus:border-0"
      />
      <button type="button" className="p-1 bg-white h-[40px] rounded-r-lg">
        <IoSearchSharp size='1.8rem' color="#605399" className="hover:scale-110 transition"/>
      </button>
    </div>

  );
};

export default SearchBar