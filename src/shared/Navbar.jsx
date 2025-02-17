import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout, MdWifiCalling } from "react-icons/md";
import { PiBag, PiHeartStraight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { HiLogout } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa";
import { IoIosOptions } from "react-icons/io";
import "../styles/styles.css";
import DrawerContent from "./DrawerContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

import { useForm } from "react-hook-form";
import useWishListFetch from "../customHook/useWishListFetch";
import axios from "axios";
import useCartFetch from "../customHook/useCartFetch";
import useAdmin from "../customHook/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { count, refetch } = useWishListFetch();
  const { count2, price } = useCartFetch();
  const [userData, setUserData] = useState();
  const [isAdmin] = useAdmin();
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
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("https://ecommerce1-server.vercel.app/searchText", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.results);

        navigate("/searchResult", {
          state: { results: response.data.results },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://ecommerce1-server.vercel.app/user?email=${user.email}`, {
          withCredentials: true,
        })
        .then((data) => {
          setUserData(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    refetch();
  }, [user, count, refetch]);
  console.log(userData);
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
          {user ? (
            <button className="btn btn-sm" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="btn btn-sm">Login</button>
            </Link>
          )}
        </div>
      </div>
      {/**navlink upper */}
      <div className="flex items-center justify-around my-4">
        {/**drawer */}
        <div className=" block lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-circle drawer-button">
              <IoIosOptions />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <DrawerContent />
            </ul>
          </div>
        </div>
        <Link to={"/"}>
          <span className="text-3xl md:text-5xl text-center font-bold">
            KenaKata
          </span>
        </Link>
        <div className="w-full hidden lg:block max-w-sm min-w-[200px] relative mt-4">
          <div className="relative">
            <form onClick={handleSubmit(onSubmit)}>
              {" "}
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter your text"
                name="search"
                {...register("search")}
              />
              <button
                className="btn absolute right-1 top-1 rounded bg-red-600 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
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
            </form>
          </div>
        </div>
        <div className="hidden  gap-2 lg:flex items-center">
          <MdWifiCalling className="text-4xl" />
          <div>
            <p className="text-gray-400">Call Us:</p>
            <p>1234567890</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {/** Mobile View for Avatar Dropdown */}
          <div className="flex">
            {user && userData && userData.length > 0 ? (
              <Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/user"}>
                <div>
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    {userData[0]?.image ? (
                      <div className="w-16 rounded-full">
                        <img src={userData[0].image} alt="User Avatar" />
                      </div>
                    ) : (
                      <div className="w-16 rounded-full">
                        <img
                          src="https://i.ibb.co.com/nqpJrWtt/avatar.jpg"
                          alt="Default Avatar"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </Link>
            ) : (
              <Link to={"/login"}>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-16 rounded-full">
                    <img
                      src="https://i.ibb.co.com/nqpJrWtt/avatar.jpg"
                      alt="Default Avatar"
                    />
                  </div>
                </label>
              </Link>
            )}
          </div>

          {/** Wishlist Indicator */}
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              {count}
            </span>
            <Link to={"/wishlist"}>
              <div className="tooltip" data-tip="Wishlist">
                <button>
                  <PiHeartStraight className="text-3xl" />
                </button>
              </div>
            </Link>
          </div>

          {/** Cart Indicator */}
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              {count2}
            </span>
            <Link to={"/cart"}>
              <div className="tooltip" data-tip="Cart">
                <button>
                  <PiBag className="text-3xl" />
                </button>
              </div>
            </Link>
          </div>

          {/** Price Display */}
          <div className="hidden md:flex">
            <p>${price}</p>
          </div>
        </div>
      </div>
      {/**navlink lower */}

      <div className="hidden lg:flex md:justify-center w-full my-4">
        {navLink}
      </div>
    </div>
  );
};

export default Navbar;
