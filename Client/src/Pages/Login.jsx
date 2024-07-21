import React, { useState } from 'react';

const LoginForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  function handleInputChange(e){
    const { value, id } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  return (
    <div className=" w-1/4 container mx-auto px-4 mt-6">
      
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form className='' onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address:</label>
            <input
              type="email"
              className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="form-control mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full py-2 px-4 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </form>
      </div>
  
  );
};

export default LoginForm;
