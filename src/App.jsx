import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Discounts from "./pages/Discounts.jsx";
import ShopItemDetail from "./pages/ShopItemDetail.jsx";
import FormsContainer from './components/forms/FormsContainer.jsx';

import UserNavBar from './components/bars/UserNavBar.jsx';
import AdminNavBar from "./components/bars/AdminNavBar.jsx";

import { checkAdmin } from './services/adminsService.js';

function App() {

  const [adminId, setAdminId] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

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
          <Route path="/discounts" element={
            <Discounts
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
            />}
          />
          <Route path="/inventory/product/:id" element={
            <ShopItemDetail
              adminId={adminId}
              isWaitingResponse={isWaitingResponse}
              setIsWaitingResponse={setIsWaitingResponse}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
