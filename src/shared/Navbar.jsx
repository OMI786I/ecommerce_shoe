import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingCartCheckout, MdWifiCalling } from "react-icons/md";
import { PiBag, PiHeartStraight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { HiLogout } from "react-icons/hi";

const Navbar = () => {
  const navLink = (
    <div className="flex-row  md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-red-500 border-transparent font-bold   hover:text-red-500  p-2  focus:border-red-500 ">
          Home
        </button>
      </NavLink>
      <div className="dropdown">
        {/* Button to trigger dropdown */}
        <label
          tabIndex="0"
          className="hover:border-red-500 border-transparent font-bold   hover:text-red-500  p-2  focus:border-red-500 m-1"
        >
          <NavLink to="/products">Bags and Shoes</NavLink>
        </label>

        {/* Dropdown content */}
        <ul
          tabIndex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
        >
          <li>
            <ul className="p-2">
              <li>
                <a href="#submenu1">Submenu 1</a>
              </li>
              <li>
                <a href="#submenu2">Submenu 2</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        {/* Button to trigger dropdown */}
        <label
          tabIndex="0"
          className="hover:border-red-500 border-transparent font-bold   hover:text-red-500  p-2  focus:border-red-500 m-1"
        >
          <NavLink to="/accessories">Others and accessories</NavLink>
        </label>

        {/* Dropdown content */}
        <ul
          tabIndex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
        >
          <li>
            <ul className="p-2">
              <li>
                <a href="#submenu1">Submenu 1</a>
              </li>
              <li>
                <a href="#submenu2">Submenu 2</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <NavLink to="/contact">
        <button className="hover:border-red-500 border-transparent font-bold  hover:text-red-500  p-2  focus:border-red-500 ">
          Contact Us
        </button>
      </NavLink>
      <NavLink to="/about">
        <button className="hover:border-red-500 border-transparent font-bold  hover:text-red-500  p-2  focus:border-red-500 ">
          About Us
        </button>
      </NavLink>
    </div>
  );

  return (
    <div>
      {/**cupon */}
      <div className="bg-black text-white flex justify-between items-center p-2">
        <p>
          Join our showroom and get
          <span className="text-red-500"> 50% off</span>! Coupon code :{" "}
          <span className="text-red-500">Junno50</span>
        </p>
        <div>
          <Link to={"/login"}>
            <button className="btn btn-sm">Login</button>
          </Link>
        </div>
      </div>
      {/**navlink upper */}
      <div className="flex items-center justify-evenly my-4">
        <Link to={"/"}>
          <span className="text-5xl font-bold">Junno</span>
        </Link>
        <div className="w-full max-w-sm min-w-[200px] relative mt-4">
          <div className="relative">
            <input
              type="email"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter your text"
            />
            <button
              className="absolute right-1 top-1 rounded bg-red-600 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className=" gap-2 flex items-center">
          <MdWifiCalling className="text-4xl" />
          <div>
            <p className="text-gray-400">Call Us:</p>
            <p>1234567890</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {/**avatar */}
          <div>
            {" "}
            <div className="dropdown dropdown-end  ">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"></img>
                </div>
              </label>

              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link to={"/dashboard"}>
                    <button className="flex items-center gap-2">
                      <RxDashboard />
                      My Account
                    </button>
                  </Link>
                  <Link to={"/checkout"}>
                    <button className="flex items-center gap-2">
                      <MdOutlineShoppingCartCheckout />
                      Checkout
                    </button>
                  </Link>
                </li>
                <li>
                  <button>
                    <HiLogout />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">0</span>
            <div className="tooltip" data-tip="Cart">
              <button className="">
                <PiHeartStraight className="text-3xl" />
              </button>
            </div>
          </div>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">0</span>
            <div className="tooltip" data-tip="Cart">
              <button className="">
                <PiBag className="text-3xl" />
              </button>
            </div>
          </div>
          <div>
            <p>$0</p>
          </div>
        </div>
      </div>
      {/**navlink lower */}
      <div className="flex md:justify-center w-full my-4">{navLink}</div>
    </div>
  );
};

export default Navbar;
