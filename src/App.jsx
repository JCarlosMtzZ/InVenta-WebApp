import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

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
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className={`w-full h-screen ${isLogging && 'overflow-hidden'}`}>
      {isLogging && (
          <div className={`bg-black/70 absolute w-full min-h-[89.8%] top-[60px] flex items-center justify-center z-20`}>
            <FormsContainer
              setIsOpen={setIsLogging}
            />
          </div>
      )}
      <BrowserRouter>
        {!isAdminLogged ? (
          <AdminNavBar />
          ) : (
            <UserNavBar
              setIsLogging={setIsLogging}
              setIsAddingProduct={setIsAddingProduct}
            />
          )}
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route
            path="/inventory"
            element={
              <Inventory
                isLogging={isLogging}
                isAddingProduct={isAddingProduct}
                setIsAddingProduct={setIsAddingProduct}
              />}
          />
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
