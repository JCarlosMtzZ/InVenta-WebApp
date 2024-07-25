import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login.jsx";
import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sale from "./pages/Sale.jsx";
import Account from "./pages/Account.jsx";

import UserNavBar from './components/UserNavBar.jsx';
import AdminNavBar from "./components/AdminNavBar.jsx";

function App() {

  const [isAdminLogged, setIsAdminLogged] = useState(true);

  return (
    <div className='w-screen h-screen overflow-x-auto overflow-y-auto'>
      <BrowserRouter>
        {isAdminLogged ? <AdminNavBar /> : <UserNavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
