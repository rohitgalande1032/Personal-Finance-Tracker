import React from 'react'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App