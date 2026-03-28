import { Outlet } from "react-router-dom"
import Adminnavbar from "../Admin_pages/Adminnavbar"
function Admin_nav(){
  return (
    <>
      <Outlet/>
      <Adminnavbar/>
    </>
  )
}

export default Admin_nav