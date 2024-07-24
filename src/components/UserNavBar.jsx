import { IoHomeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function UserNavBar() {
  return (
    <nav className='w-[100%] h-[10%] bg-purp-dark flex justify-between items-center'>
      <button type='button' className='ml-4 hover:scale-110 transition'>
        <IoHomeOutline color='white' size='2rem' />
      </button>
      <SearchBar />  
      <Link to="/login" className="h-[40px] flex items-center justify-center text-white sm:py-1.5 sm:px-2 mr-4 rounded-lg sm:border-solid sm:border-2 sm:border-white hover:scale-105 transition">
        <FaRegUserCircle color="white" size='2rem' className="hover:scale-110 sm:scale-90 sm:hover:scale-90 transition"/>
        <p className="ml-2 hidden sm:block">Acceder</p>
      </Link>
    </nav>
  );
};

export default UserNavBar;