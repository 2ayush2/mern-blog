import React, { useState } from 'react';

const LoginForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  function handleInputChange(e){
    const{value,id}=e.target;
    setFormData(prev=>({
      ...prev,[id]:value
    }));
    
  }
  

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
    
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default LoginForm;
