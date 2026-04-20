import Navbar from "../Account/Navbar";
import { Outlet } from "react-router-dom"
import Specilal_nav from "../Customer_pages/Specilal_nav"
import Footer from "../Customer_pages/Footer"
const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Specilal_nav/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default ProtectedLayout

