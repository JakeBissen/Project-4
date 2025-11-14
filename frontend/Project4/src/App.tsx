import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './Login_page';
import Dashboard from './dashboard-frontend';
import Register from './Register';
import Homepage from './Homepage';
import Navbar from './Navbar';


function App() {


 


  return (
    <>
    <Router>
      <Navbar />
   <Routes>
  <Route path='/' element={<Homepage />} />
   <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
     <Route path="/dashboard" element={<Dashboard />
      }
     />
</Routes>
  </Router>
    </>
  )
}

export default App
