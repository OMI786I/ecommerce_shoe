import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Root from "./Root";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Products from "./page/products/Products";
import Accessories from "./page/accessories/Accessories";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import ProductDetails from "./page/products/ProductDetails";
import SignUp from "./page/signUp/signUp";
import AuthProvider from "./provider/AuthProvider";
import Wishlist from "./page/wishlist/Wishlist";
import PrivateRoute from "./provider/PrivareRoute";
import Cart from "./page/cart/Cart";
import Dashboard from "./dashboard/Dashboard";
import User from "./dashboard/user/User";
import UserEdit from "./dashboard/user/UserEdit";
import History from "./dashboard/history/History";
import CurrentOrder from "./dashboard/current_order/CurrentOrder";
import AddReview from "./dashboard/review/AddReview";
import Review from "./dashboard/review/Review";
import AllUsers from "./dashboard/All_user/AllUsers";
import AdminRoute from "./provider/AdminRoute";
import AdminUser from "./dashboard/user/AdminUser";
import ManageItems from "./dashboard/ManageItems/ManageItems";
import Cancel from "./paymentStatus/Cancel";
import Error from "./paymentStatus/Error";
import Success from "./paymentStatus/Success";
import ManagerOrders from "./dashboard/ManageOrders/ManagerOrders";
import ManagerOrderDetails from "./dashboard/ManageOrders/ManagerOrderDetails";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/details/:id",
        element: <ProductDetails />,
      },

      {
        path: "/products/:category",
        element: <Products />,
      },

      {
        path: "/products/:category/:subCategory",
        element: <Products />,
      },
      {
        path: "/products/:category/:subCategory/:product",
        element: <Products />,
      },
      {
        path: "/accessories",
        element: <Accessories />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/success/:id",
        element: <Success />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/user",
        element: <User />,
      },
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminUser />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard//edit/:id",
        element: <UserEdit />,
      },
      {
        path: "/dashboard/order_history",
        element: <History />,
      },
      {
        path: "/dashboard/current_order",
        element: <CurrentOrder />,
      },
      {
        path: "/dashboard/review",
        element: <Review />,
      },
      {
        path: "/dashboard/addReview",
        element: <AddReview />,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageOrders",
        element: (
          <AdminRoute>
            {" "}
            <ManagerOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageOrders/:id",
        element: (
          <AdminRoute>
            {" "}
            <ManagerOrderDetails />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
