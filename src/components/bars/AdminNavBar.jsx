import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { IoHomeOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';

import { logout } from '../../services/adminsService.js';

function AdminNavBar({ checkAdmin }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [isToggled, setIsToggled] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-down");

  const handleLogout = async () => {
    try {
      await logout();
      await checkAdmin();
      navigate('/inventory');
    } catch (error) {
      console.error('Error while logging out: ', error);
    }
  };

  const handleToggle = () => {
    setAnimationClass('fade-up');
    setTimeout(() => {
      setIsToggled(!isToggled);
      setAnimationClass('fade-down');
    }, 100);
  };

  return (
    <div className='flex flex-col'>
      <nav className='w-[100%] h-[65px] bg-purp-dark flex justify-between items-center'>
        <Link to='/dashboard' className='ml-4 hover:scale-110 transition'>
          <IoHomeOutline color='white' size='2rem' />
        </Link>
        <div className='hidden sm:flex text-white gap-x-8'>
          <Link to='/dashboard' className={`${location.pathname === '/dashboard' && 'border-b-2 border-white'} hover:scale-110 transition`}>Tablero</Link>
          <Link to='/inventory' className={`${location.pathname === '/inventory' && 'border-b-2 border-white'} hover:scale-110 transition`}>Inventario</Link>
          <Link to='/discounts' className={`${location.pathname === '/discounts' && 'border-b-2 border-white'} hover:scale-110 transition`}>Descuentos</Link>
        </div>
        <button
          onClick={handleLogout}
          className='hidden sm:block mr-4 hover:scale-110 transition'
        >
          <IoIosLogOut color='white' size='2rem' />
        </button>
        <button type='button' onClick={handleToggle} className={`block sm:hidden mr-3 hover:scale-110 transition ${isToggled ? 'rotate-90' : 'rotate-0'}`}>
          <SlOptions color='white' size='1.5rem' />
        </button>
      </nav>
      <div className={`sm:hidden w-[100%] flex-col gap-y-3 p-3 text-white bg-purp-dark ${isToggled ? 'flex' : 'hidden'} ${animationClass}`}>
        <Link to='/dashboard' onClick={handleToggle} className='scale-95 hover:scale-100 transition'>Tablero</Link>
        <Link to='/inventory' onClick={handleToggle} className='scale-95 hover:scale-100 transition'>Inventario</Link>
        <Link to='/discounts' onClick={handleToggle} className='scale-95 hover:scale-100 transition'>Descuentos</Link>
        <button onClick={handleLogout} className='scale-95 hover:scale-100 transition'>Cerrar sesión</button>
      </div>
    </div>    
  );
};

export default AdminNavBar;

