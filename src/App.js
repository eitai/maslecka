import React from 'react';
import HomePage from './pages/homePage/homePage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path='dashboard' element={<Dashboard />} />
            <Routes path='customer' element={<Customer />} /> */}
      </Routes>
    </>
  );
};

export default App;
