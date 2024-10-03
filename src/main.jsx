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
