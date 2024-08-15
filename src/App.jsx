import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Discounts from "./pages/Discounts.jsx";
import ShopItemDetail from "./components/ShopItemDetail.jsx";
import FormsContainer from './components/FormsContainer.jsx';

import UserNavBar from './components/UserNavBar.jsx';
import AdminNavBar from "./components/AdminNavBar.jsx";

import { checkAdmin } from './services/adminsService.js';

function App() {

  const [adminId, setAdminId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCheckAdmin = async () => {
    try {
      const result = await checkAdmin();
      setAdminId(result.adminId);
    } catch (error) {
      setAdminId('');
      console.error('Error checking admin: ', error);
    }
  };

  useEffect(() => {
    fetchCheckAdmin();
  }, []);
  
  const [isLogging, setIsLogging] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className={`w-full h-screen ${isLogging && 'overflow-hidden'}`}>
      {isLogging && (
          <div className={`bg-black/70 absolute w-full min-h-[89.8%] top-[60px] flex items-center justify-center z-20`}>
            <FormsContainer
              setIsOpen={setIsLogging}
              checkAdmin={fetchCheckAdmin}
            />
          </div>
      )}
      <BrowserRouter>
        {adminId ? (
          <AdminNavBar
            checkAdmin={fetchCheckAdmin}
          />
          ) : (
            <UserNavBar
              setIsLogging={setIsLogging}
              setIsAddingProduct={setIsAddingProduct}
              setIsCart={setIsCart}
            />
          )}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/inventory"
            element={
              <Inventory
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isLogging={isLogging}
                isAddingProduct={isAddingProduct}
                setIsAddingProduct={setIsAddingProduct}
                cart={cart}
                setCart={setCart}
                isCart={isCart}
                setIsCart={setIsCart}
              />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/inventory/product/:id" element={<ShopItemDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
