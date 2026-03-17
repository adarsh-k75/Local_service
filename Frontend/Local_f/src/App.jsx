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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Services_selecter from './Services/Servies_selceter'
import User_services from './Customer_pages/User_Services'
import About from './Customer_pages/About'
import Contact from './Customer_pages/Contact'
import Specilal_nav from './Customer_pages/Specilal_nav'
function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />

       <Routes>
      <Route element={<AuthLayout/>}>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Re-password" element={<Reset_password/>}/>
        <Route path="/profile_edit" element={<Profile_edit/>}/>

      </Route>

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Services" element={<Services_selecter/>}/>
        <Route path='/User_service' element={<User_services/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

      </Route>
    </Routes>
    </>
  )
}

export default App
