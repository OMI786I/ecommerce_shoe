import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaUser } from "react-icons/fa";
import useUserFetch from "../../customHook/useUserFetch";
import { MdManageAccounts, MdNoAccounts } from "react-icons/md";
import axios from "axios";
const AdminUser = () => {
  const { isPending, error, data, refetch } = useUserFetch();

  const [avatClicked, setAvatarClicked] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  console.log(avatClicked);
  console.log(data);

  //const res = axios.get("https://ecommerce1-server.vercel.app/count");

  axios
    .get("https://ecommerce1-server.vercel.app/user", {
      withCredentials: true,
    })
    .then((res) => {
      setTotalUser(res.data.length);
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get("https://ecommerce1-server.vercel.app/count")
    .then(function (response) {
      setTotalProduct(response.data.totalProducts);
    })
    .catch(function (error) {
      console.log(error);
    });

  if (!data) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div>
        <div className="flex justify-between">
          {" "}
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="flex flex-row-reverse  ">
            <label
              role="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar "
              onClick={() => setAvatarClicked(!avatClicked)}
            >
              <div className="  rounded-full">
                <img
                  className="w-16"
                  src={data[0]?.image || "/src/assets/images/avatar.jpg"}
                ></img>
              </div>
            </label>

            <ul
              tabIndex={0}
              className={`absolute top-24 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ${
                !avatClicked ? "hidden" : ""
              }`}
            >
              <li>
                <button className="flex">
                  <FaUser />
                  {data[0]?.name}
                </button>
              </li>

              <li>
                <Link to={"/dashboard/user"}>
                  <button className="flex">
                    <MdManageAccounts />
                    Account
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Total Sales</h2>
              <p>$12,300</p>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <h2 className="card-title">Orders</h2>
              <p>245</p>
            </div>
          </div>
          <div className="card bg-accent text-accent-content">
            <div className="card-body">
              <h2 className="card-title">Customers</h2>
              <p>{totalUser}</p>
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body">
              <h2 className="card-title">Products</h2>
              <p>{totalProduct}</p>
            </div>
          </div>
        </div>

        {/* Charts or Tables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Revenue Over Time</h2>
              {/* Chart placeholder */}
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <p>Chart goes here</p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Recent Orders</h2>
              <ul>
                <li>Order #102 - $120.50</li>
                <li>Order #103 - $80.25</li>
                <li>Order #104 - $60.00</li>
                <li>Order #105 - $140.75</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
