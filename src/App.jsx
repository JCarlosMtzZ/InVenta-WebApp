import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AiOutlineLoading } from 'react-icons/ai';

import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Discounts from "./pages/Discounts.jsx";
import ShopItemDetail from "./pages/ShopItemDetail.jsx";
import FormsContainer from './components/forms/FormsContainer.jsx';
import UserNavBar from './components/bars/UserNavBar.jsx';
import AdminNavBar from "./components/bars/AdminNavBar.jsx";

import { checkAdmin } from './services/adminsService.js';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  
  const [adminId, setAdminId] = useState('');
  const [cart, setCart] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const fetchCheckAdmin = async () => {
    try {
      const result = await checkAdmin();
      setAdminId(result.adminId);
    } catch (error) {
      setAdminId('');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckAdmin();
  }, []);

  return (
    <div className={`w-full h-screen ${isLogging && 'overflow-hidden'} flex items-center justify-center`}>
      {isLoading ? (
        <div className='w-fit h-fit animate-spin'>
          <AiOutlineLoading size='4rem' color='#605399' />
        </div>
      ) : (
        <div className='w-full h-full'>
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
            {isLogging && (
              <FormsContainer
                setIsOpen={setIsLogging}
                checkAdmin={fetchCheckAdmin}
                isWaitingResponse={isWaitingResponse}
                setIsWaitingResponse={setIsWaitingResponse}
              />
            )}
            <Routes>
              <Route
                path="/inventory"
                element={
                  <Inventory
                    adminId={adminId}
                    isAddingProduct={isAddingProduct}
                    setIsAddingProduct={setIsAddingProduct}
                    cart={cart}
                    setCart={setCart}
                    isCart={isCart}
                    setIsCart={setIsCart}
                    isWaitingResponse={isWaitingResponse}
                    setIsWaitingResponse={setIsWaitingResponse}
                  />}
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    adminId={adminId}
                  />}
              />
              <Route path="/discounts" element={
                <Discounts
                  adminId={adminId}
                  isWaitingResponse={isWaitingResponse}
                  setIsWaitingResponse={setIsWaitingResponse}
                />}
              />
              <Route path="/inventory/product/:id" element={
                <ShopItemDetail
                  adminId={adminId}
                  isWaitingResponse={isWaitingResponse}
                  setIsWaitingResponse={setIsWaitingResponse}
                />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
};

export default App;
