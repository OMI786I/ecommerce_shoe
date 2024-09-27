import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "../styles/styles.css";
const StickyNavbar = () => {
  const navLink = (
    <div className="flex-row  md:flex-col gap-6  ">
      <NavLink to="/">
        <button className="hover:border-red-500 border-transparent font-bold   hover:text-red-500  p-2  focus:border-red-500 ">
          Home
        </button>
      </NavLink>
      {/** bags and shoes*/}

      <div className="dropdown dropdown-hover">
        <button className="dropbtn flex items-center gap-1">
          <span>Bags and Shoes</span> <FaArrowDown />
        </button>

        <div className="dropdown-content">
          <div className="grid grid-cols-3 gap-3 justify-center">
            <div>
              <h1 className="font-bold hover:text-red-600 my-2">Shoes</h1>
              <div>
                <p className="hoverText cursor-pointer">Women Shoes</p>
                <p className="hoverText cursor-pointer">Men Shoes</p>
                <p className="hoverText cursor-pointer">Boots</p>
                <p className="hoverText cursor-pointer">Casual Shoes</p>
                <p className="hoverText cursor-pointer">Flip flops</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold hover:text-red-600 my-2">
                Luggage and bags
              </h1>
              <div>
                <p className="hoverText cursor-pointer">Stylish Backpacks</p>
                <p className="hoverText cursor-pointer">Shoulder Bags</p>
                <p className="hoverText cursor-pointer">Crossbody Bags</p>
                <p className="hoverText cursor-pointer">Briefcases</p>
                <p className="hoverText cursor-pointer">Luggage & Travel</p>
              </div>
            </div>
            <div>
              <h1 className="font-bold hover:text-red-600 my-2">
                Other Bags & Accessories
              </h1>
              <div>
                <p className="hoverText cursor-pointer">
                  Cosmetic Bags & Cases
                </p>
                <p className="hoverText cursor-pointer">
                  Wallets & Card Holders
                </p>
                <p className="hoverText cursor-pointer">Luggage Covers</p>
                <p className="hoverText cursor-pointer">Passport Covers</p>
                <p className="hoverText cursor-pointer">
                  Bag Parts & Accessories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**others and accessories */}

      <div className="dropdown">
        <Link to={"/products"}>
          <button className="dropbtn flex items-center gap-1">
            <span>Others and Accessories</span> <FaArrowDown />
          </button>
        </Link>
        <div className="dropdown-content-accessories flex flex-row gap-10 text-xl ">
          <p className="hover:text-red-600 hover:translate-x-3 cursor-pointer transition ease-in-out delay-150 border-b p-1 duration-300">
            Cosmetic Bags & Cases
          </p>
          <p className="hover:text-red-600 hover:translate-x-3 cursor-pointer transition ease-in-out delay-150 border-b  p-1   duration-300">
            Wallets & Card Holders
          </p>
          <p className="hover:text-red-600 hover:translate-x-3 cursor-pointer transition ease-in-out delay-150 border-b p-1  duration-300">
            Luggage Covers
          </p>
          <p className="hover:text-red-600 hover:translate-x-3 cursor-pointer transition ease-in-out delay-150 border-b  p-1  duration-300">
            Passport Covers
          </p>
          <p className="hover:text-red-600 hover:translate-x-3 cursor-pointer transition ease-in-out delay-150 border-b p-1 duration-300">
            Bag Parts & Accessories
          </p>
        </div>
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
    <div className="px-4 bg-base-100 opacity-80 hover:opacity-100 transition ease-in-out delay-100 ">
      {navLink}
    </div>
  );
};

export default StickyNavbar;
