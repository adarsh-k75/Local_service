import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Register from './Account/Register'
import Login from './Account/Login'
import {Route,Routes} from "react-router-dom";
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
import Notfication from './Customer_pages/Notfication'
import Booking_deatils from './Customer_pages/Booking_deatils'
import Search from './Customer_pages/Search'
import Admin_nav from './layouts/Admin_nav'
import User_list from './Admin_pages/User_list'
import Address_edit from './Account/Address_edit'
import Rquestsview from './Admin_pages/Rquestsview'
import Provider_list from './Admin_pages/Provider_list'
import Provider_verification from './Admin_pages/Provider_verification'
import Dashboard from './Admin_pages/Dashboard'
import Email from './Account/Email'
import Forget_reset from './Account/Forget_reset'
import Homes from './Customer_pages/Home'
import Fq from './Customer_pages/Fq'
import ChatPage from './Chat/ChatPage'
import ProtectedRoute from './Protection/ProtectedRoute'
import ProtectedLayout from './layouts/ProtectedLayout'
import RoleProtectedRoute from './Protection/RoleProtectedRoute'
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
        <Route path='/email' element={<Email/>}/>
        <Route path='/forget_reset/:uid/:token' element={<Forget_reset/>}/>
        
      </Route>
     

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Homes/>}/>
        <Route path='/User_service' element={<User_services/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/notfication' element={<Notfication/>}/>
        <Route path='/Search/:query' element={<Search/>}/>
        <Route path='/fq' element={<Fq/>}/>
      </Route>
    
        <Route element={<ProtectedRoute />}>    
              <Route element={<ProtectedLayout />}>
                  <Route path='/addres_edit' element={<Address_edit/>}/>
                  <Route path="/User_service/:catId/:subId" element={<User_services />} />
                  <Route path="/profile_edit" element={<Profile_edit/>}/>
                  <Route path='/chat/:id' element={<ChatPage/>}/>
                  <Route path="/Re-password" element={<Reset_password/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path='/Booking/:id' element={<Booking_deatils />}/>
              </Route>
        </Route>


        <Route element={<RoleProtectedRoute allowedRoles={["provider"]} />}>
              <Route element={<ProtectedLayout />}>
        
                  <Route path="/Services" element={<Services_selecter/>}/>
                      
              </Route>
        </Route>


      <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<Admin_nav/>}>
              <Route path='/All_user' element={<User_list/>}/>
              <Route path='/booking_view/:id' element={<Rquestsview/>}/>
              <Route path='/providers' element={<Provider_list/>}/>
              <Route path='/providers_verifaction' element={<Provider_verification/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
       </Route>


  
  </Routes>
    </>
  )
}

export default App
