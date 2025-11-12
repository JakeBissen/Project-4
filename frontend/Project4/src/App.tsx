import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './Login_page';
import Dashboard from './dashboard-frontend';
import Register from './Register';
import Homepage from './Homepage';


function App() {


 
  

  return (
    <>
    <Router>
     <Routes>
    <Route path='/' element={<Homepage />} />
     <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
       <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
  </Router>o
    </>
  )
}

export default App
