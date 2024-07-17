import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header/Header';
import Post from './components/Post/Post';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Post />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/login" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
