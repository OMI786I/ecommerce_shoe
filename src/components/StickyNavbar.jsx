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
        <Link to={"/products/shoes_bags"}>
          <button className="dropbtn flex items-center gap-1">
            <span>Bags and Shoes</span> <FaArrowDown />
          </button>
        </Link>

        <div className="dropdown-content">
          <div className="grid grid-cols-2 gap-3 justify-center">
            <div>
              <Link
                className="p-0 font-bold hover:text-red-600 my-2"
                to={"/products/shoes_bags/shoes"}
              >
                <h1 className="">
                  <span>Shoes</span>
                </h1>
              </Link>

              <div>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/shoes/women_shoes"}
                >
                  <p>Women Shoes</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/shoes/men_shoes"}
                >
                  <p>Men Shoes</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/shoes/boots"}
                >
                  <p>Boots</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/shoes/casual_shoes"}
                >
                  <p>Casual Shoes</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/shoes/flip_shoes"}
                >
                  <p>Flip Shoes</p>
                </Link>
              </div>
            </div>
            <div>
              <Link to={"/products/shoes_bags/luggage_bags"}>
                {" "}
                <h1 className="font-bold hover:text-red-600 my-2">
                  Luggage and bags
                </h1>
              </Link>

              <div>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/luggage_bags/stylishBags"}
                >
                  <p>Stylish Bag packs</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/luggage_bags/crossBodyBags"}
                >
                  <p>Cross body bags</p>
                </Link>

                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/luggage_bags/briefCases"}
                >
                  <p>Brief Cases</p>
                </Link>
                <Link
                  className="hoverText cursor-pointer"
                  to={"/products/shoes_bags/luggage_bags/luggage_travel"}
                >
                  <p>Luggage and Travel</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**others and accessories */}

      <div className="dropdown">
        <Link to={"/products/others_accessories"}>
          <button className="dropbtn flex items-center gap-1">
            <span>Others and Accessories</span> <FaArrowDown />
          </button>
        </Link>
        <div className="dropdown-content-accessories flex flex-row gap-10 text-xl ">
          <Link
            className="hoverText cursor-pointer"
            to={"/products/others_accessories/cosmeticBags_cases"}
          >
            <p>Cosmetic bags and Cases</p>
          </Link>

          <Link
            className="hoverText cursor-pointer"
            to={"/products/others_accessories/wallet_cardHolders"}
          >
            <p>Wallet and cardHolders</p>
          </Link>
          <Link
            className="hoverText cursor-pointer"
            to={"/products/others_accessories/luggage_covers"}
          >
            <p>Luggage and Covers</p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 bg-base-100 opacity-80 hover:opacity-100 transition ease-in-out delay-100 ">
      {navLink}
    </div>
  );
};

export default StickyNavbar;
