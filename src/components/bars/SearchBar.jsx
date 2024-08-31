import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

import { getProductsByNameFilter, getAllProductsCategoriesImagesByNameAndFilter } from "../../services/productsService.js";

import { handleCloseModal, handleOpenModal } from "../../utilities/animation.jsx";

function SearchBar({
  setExternalProducts,
  hasDropdown,
  getFilterName,
  filter }) {

  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleProductNameClick = (id) => {
    handleCloseModal(setIsTyping, setAnimationClass);
    navigate(`/inventory/product/${id}`);
  };

  const fetchProducts = async (term) => {
    setIsWaitingResponse(true);
    try {
      let productsResult;
      if (hasDropdown) {
        productsResult = await getProductsByNameFilter(term);
        setProducts(productsResult);
        if (!isTyping)
          handleOpenModal(setIsTyping, setAnimationClass);
      } else {
        productsResult = await getAllProductsCategoriesImagesByNameAndFilter(1, 10, term, filter === 'all' ? '' : filter);
        setExternalProducts(productsResult.products);
      }
      setIsWaitingResponse(false);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const debouncedSearch = debounce(fetchProducts, 300);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm)
      debouncedSearch(searchTerm);
    if (!searchTerm && hasDropdown)
      handleCloseModal(setIsTyping, setAnimationClass);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseModal(setIsTyping, setAnimationClass);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${hasDropdown && 'z-30'}`}>
      <div className="flex items-center w-fit rounded-lg shadow-md">
        <input
          type="text"
          placeholder={`${hasDropdown ? 'Buscar producto' : 'Buscar en ' + getFilterName()}`}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={products.length > 0 && !isTyping ? () => handleOpenModal(setIsTyping, setAnimationClass) : undefined}
          className={`text-black focus:outline-none p-3 h-[40px] w-[160px] sm:w-[300px] rounded-l-lg focus:border-0`}
        />
        <button type="button" className={`p-1 bg-white h-[40px] w-[40px] rounded-r-lg flex justify-center items-center`}>
          {isWaitingResponse ?
            <div className="animate-spin">
              <AiOutlineLoading size='1.5rem' color="#605399" />
            </div>
          :
            <IoSearchSharp size='1.8rem' color="#605399" />
          }
        </button>
      </div>
      {isTyping && hasDropdown &&
        <div className={`${animationClass} absolute mt-1 bg-white w-[200px] sm:w-[340px] rounded-lg shadow-md z-10`}>
          {products.map((product) => (
            <div onClick={() => handleProductNameClick(product.id)} key={product.id} className="hover:text-mag hover:font-semibold  hover:cursor-pointer h-[35px] w-full my-2 mx-4 flex items-center text-nowrap line-clamp-1">
              {product.name}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default SearchBar;