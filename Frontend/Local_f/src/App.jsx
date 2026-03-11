import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Register from './Account/Register'
import Login from './Account/Login'
import {Route,Routes} from "react-router-dom";
import Home from './Customer_pages/Home'
import Navbar from './Account/Navbar'
function App() {

  return (
    <>
      <Navbar/>
       <Routes>
        <Route  path='/' element={<Register/>}/>
        <Route  path='login/' element={<Login/>}/>
        <Route  path='home/' element={<Home/>}/>


       </Routes>
    </>
  )
}

export default App
