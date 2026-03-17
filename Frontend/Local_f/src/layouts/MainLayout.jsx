import Navbar from "../Account/Navbar"
import { Outlet } from "react-router-dom"
import Specilal_nav from "../Customer_pages/Specilal_nav"
function MainLayout(){
  return (
    <>
      <Navbar/>
      <Specilal_nav/>
      <Outlet/>
    </>
  )
}

export default MainLayout