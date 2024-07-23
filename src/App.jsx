import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login.jsx";
import Inventory from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sale from "./pages/Sale.jsx";
import Account from "./pages/Account.jsx";

import AdminNavBar from "./components/AdminNavBar.jsx";

function App() {

  return (
    <div>
      <BrowserRouter>
        <AdminNavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
{/*<div className="w-[100vw] h-[100vh] bg-gray-100 flex flex-col justify-center items-center ">
      <FormsContainer />
      
      <LoginForm />
      <SignupForm />
      
      <h1 className="text-6xl font-bold text-mag">Hello, TailwindCSS</h1>
      
      </div>*/}
    </div>
    
  );
};

export default App;
