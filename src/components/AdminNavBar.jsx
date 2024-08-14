import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoHomeOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';

function AdminNavBar() {

  const [isToggled, setIsToggled] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-down");

  const handleToggle = () => {
    setAnimationClass('fade-up');
    setTimeout(() => {
      setIsToggled(!isToggled);
      setAnimationClass('fade-down');
    }, 100);
  };

  return (
    <div className='flex flex-col'>
      <nav className='w-[100%] h-[60px] bg-purp-dark flex justify-between items-center'>
        <Link to='/dashboard' className='ml-4 hover:scale-110 transition'>
          <IoHomeOutline color='white' size='2rem' />
        </Link>
        <div className='hidden sm:flex text-white gap-x-8'>
          <Link to='/dashboard' className='hover:scale-110 transition'>Tablero</Link>
          <Link to='/inventory' className='hover:scale-110 transition'>Inventario</Link>
          <Link to='/discounts' className='hover:scale-110 transition'>Descuentos</Link>
        </div>
        <button type='button' className='hidden sm:block mr-4 hover:scale-110 transition'>
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
        <Link to='/discounts' onClick={handleToggle} className='scale-95 hover:scale-100 transition'>Cerrar sesión</Link>
      </div>
    </div>    
  );
};

export default AdminNavBar;

