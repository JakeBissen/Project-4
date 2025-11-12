import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './Login_page';
import Dashboard from './dashboard-frontend';
import Register from './Register';


function App() {


  <Routes>
    <Route path='/' element={<Login />} />
     <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
       <Route path='/' element={<Login />} />
  </Routes>
  

  return (
    <>
     
    </>
  )
}

export default App
