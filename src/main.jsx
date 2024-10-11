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
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/user",
        element: <User />,
      },
      {
        path: "/dashboard//edit/:id",
        element: <UserEdit />,
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
