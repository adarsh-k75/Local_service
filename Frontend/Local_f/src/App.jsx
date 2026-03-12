import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Register from './Account/Register'
import Login from './Account/Login'
import {Route,Routes} from "react-router-dom";
import Home from './Customer_pages/Home'
import Navbar from './Account/Navbar'
import Profile from './Account/Profile'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Reset_password from './Account/Reset_password'
import Profile_edit from './Account/Profile_edit'
function App() {

  return (
    <>
       <Routes>

      <Route element={<AuthLayout/>}>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Re-password" element={<Reset_password/>}/>
        <Route path="/profile_edit" element={<Profile_edit/>}/>

      </Route>

      <Route element={<MainLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
