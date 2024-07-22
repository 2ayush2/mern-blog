import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const  [redirect,setRedirect]=useState(false);

  function handleInputChange(e){
    const { value, id } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  // Handle form submit
 // Handle form submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    setRedirect(true);

    const result = await response.json();
    console.log(result);
    alert('Account created Sucessfylly')
    // Handle success response
  } catch (error) {
    alert('This account has been already created:', error); // Handle error response
  }
};
if(redirect){
  return <Navigate to='/login'/>
}
  return (
    <div className=" w-1/4 container mx-auto px-4 mt-6">
      
        <h2 className="text-2xl font-semibold mb-4 text-center">Register your Account</h2>
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
