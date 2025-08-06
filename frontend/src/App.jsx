import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home'; // ✅ Import Home component
import Login from './pages/Login'; // ✅ Import Login component (case-sensitive)

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />          {/* ✅ Home route */}
      <Route path='/login' element={<Login />} />    {/* ✅ Login route */}
      <Route path='/signup' element={<Registration />} /> {/* ✅ Registration route */}
    </Routes>
  );
}

export default App;
