import React from "react";
import {
  FaEnvelope,
  FaHome,
  FaList,
  FaUsers,
  FaShoePrints,
  FaCalendar,
  FaShoppingCart,
  FaAd,
  FaSearch,
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../customHook/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin(); // Change this based on user role
  console.log(isAdmin);
  return (
    <div className="flex">
      {/* Sidebar for larger devices */}
      <div className="hidden md:block w-64 min-h-screen bg-[#edf2f9]">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaShoePrints />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FiPackage />
                  Manage Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/user">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/order_history">
                  <FaCalendar />
                  Order history
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/current_order">
                  <FaShoppingCart />
                  Current Order
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd />
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList />
                  Real Payment History
                </NavLink>
              </li>
            </>
          )}
          {/* Shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Drawer for smaller devices */}
      <div className="md:hidden">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Drawer toggle button only visible on mobile */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
            {/* Main content here */}
            <div className="p-8">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaHome />
                      Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addItems">
                      <FaShoePrints />
                      Add Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageItems">
                      <FaList />
                      Manage Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/bookings">
                      <FiPackage />
                      Manage Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users">
                      <FaUsers />
                      All Users
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard/userHome">
                      <FaHome />
                      User Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/order_history">
                      <FaCalendar />
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/current_order">
                      <FaShoppingCart />
                      Current Order
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/review">
                      <FaAd />
                      Add a Review
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/paymentHistory">
                      <FaList />
                      Real Payment History
                    </NavLink>
                  </li>
                </>
              )}
              {/* Shared nav links */}
              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/salad">
                  <FaSearch />
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/contact">
                  <FaEnvelope />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content for larger screens */}
      <div className="flex-1 p-8 hidden md:block">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
