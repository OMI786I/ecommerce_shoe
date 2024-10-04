import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Toaster />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
