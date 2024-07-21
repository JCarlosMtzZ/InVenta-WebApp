import viewIcon from '../assets/icons/view-pass.png';
import hideIcon from '../assets/icons/hide-pass.png';
import { useState } from "react";

function SignupForm() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormProcessing, setisFormProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/admins/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleShowPassword = () => {
    if (showPassword)
      setShowPassword(false);
    else
      setShowPassword(true);
  };

  return (
    <div className='w-[100%]'>
      <div className="p-10 flex flex-col relative bg-white">
        <div className="mb-4 text-2xl font-semibold text-center">
          Create an account
        </div>
        <div className='flex'>
          <div className='w-[48%] flex flex-col mr-[2%]'>
            <label htmlFor="firstName" className="my-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-2 h-10 border-solid border-2 border-black border-opacity-45 rounded-lg"
            />
          </div>
          <div className='w-[48%] flex flex-col ml-[2%]'>
            <label htmlFor="lastName" className="my-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-2 h-10 border-solid border-2 border-black border-opacity-45 rounded-lg"
            />
          </div>
        </div>
        <label htmlFor="email" className="my-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 h-10 border-solid border-2 border-black border-opacity-45 rounded-lg"
        />
        <div>
          <label htmlFor="password" className="block my-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-[100%] p-2 h-10 border-solid border-2 border-black border-opacity-45 rounded-lg"
          />
          <button
            type="button"
            id="togglePassword"
            onClick={handleShowPassword}
            className="p-2 h-10 absolute right-10"
          >
            <div className="relative">
              <img
                className={`w-6 transition-opacity duration-350 hover:drop-shadow-md ${showPassword ? 'opacity-0' : 'opacity-45'}`}
                src={viewIcon}
                alt="View Icon"
              />
              <img
                className={`w-6 transition-opacity duration-350 hover:drop-shadow-md absolute top-0 left-0 ${showPassword ? 'opacity-45' : 'opacity-0'}`}
                src={hideIcon}
                alt="Hide Icon"
              />
            </div>
          </button>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-10 w-[50%] mt-4 bg-black text-white rounded-lg self-center
            hover:bg-white hover:text-black hover:border-black hover:border-2
            transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignupForm;