import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login.jsx";
import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sale from "./pages/Sale.jsx";
import Account from "./pages/Account.jsx";
import ShopItemDetail from "./components/ShopItemDetail.jsx";
import FormsContainer from './components/FormsContainer.jsx';

import UserNavBar from './components/UserNavBar.jsx';
import AdminNavBar from "./components/AdminNavBar.jsx";

function App() {

  const [isAdminLogged, setIsAdminLogged] = useState(true);
  const [isLogging, setIsLogging] = useState(false);

  return (
    <div className={`w-full h-screen ${isLogging && 'overflow-hidden'}`}>
      {isLogging && (
          <div className={`bg-black/70 absolute w-full min-h-[89.8%] top-[60px] flex items-center justify-center z-20`}>
            <FormsContainer
              isOpen={isLogging}
              setIsOpen={setIsLogging}  
            />
          </div>
      )}
      <BrowserRouter>
        {!isAdminLogged ? (
          <AdminNavBar />
          ) : (
            <UserNavBar
              isLogging={isLogging}
              setIsLogging={setIsLogging}
            />
          )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/account" element={<Account />} />
          <Route path="/inventory/product/:id" element={<ShopItemDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
