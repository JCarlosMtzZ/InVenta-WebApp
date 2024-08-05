import { useState, useEffect, useRef} from "react";
import debounce from "lodash.debounce";
import { IoSearchSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";


function SearchBar() {

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef(null);

  const fetchProducts = async (term) => {
    try {
      const response = await fetch(`http://localhost:3001/products?name=${term}`);
      if (!response.ok)
        throw new Error('Error fetching products');
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce(fetchProducts, 300);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsTyping(true);
  };

  useEffect(() => {
    const term = searchTerm;
    if (term)
      debouncedSearch(searchTerm);
    else
      setProducts([]);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTyping(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleProductNameClick = (id) => {
    setIsTyping(false);
    navigate(`/inventory/product/${id}`);
    //window.location.reload();
  };

  return (
    <div ref={dropdownRef} className="relative z-30">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsTyping(true)}
          onfocusout
          className="text-black focus:outline-none p-3 h-[40px] w-[160px] sm:w-[300px] rounded-l-lg focus:border-0"
        />
        <button type="button" className="p-1 bg-white h-[40px] w-[40px] rounded-r-lg flex justify-center items-center">
          <IoSearchSharp size='1.8rem' color="#605399" className="hover:scale-110 transition"/>
        </button>
      </div>
      {isTyping && 
        <div className="absolute mt-1 bg-white w-[200px] sm:w-[340px] rounded-lg shadow-md z-10">
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

export default SearchBar