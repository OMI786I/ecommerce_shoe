import React, { useRef, useState } from "react";
import { IoBag } from "react-icons/io5";
import { PiCarThin } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";
import useAdminViewProducts from "../../customHook/useAdminViewProducts";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Toaster } from "react-hot-toast";

const ManageItems = () => {
  const modalRef = useRef(null); // Create a ref for the modal
  const [category, setCategory] = useState("shoes");
  const [limit, setLimit] = useState(10);
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setLimit(val);
  };
  const { data, isPending, error, refetch } = useAdminViewProducts({
    endPoint: category,
    limit: limit,
  });
  const type = data?.type;
  return (
    <div className="flex justify-center gap-5 ">
      <Toaster />
      <dialog id="my_modal_1" ref={modalRef} className="modal -z-10">
        <div className="modal-box">
          <ProductForm type={type} category={category} refetch={refetch} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div>
        <h1 className="text-xl font-bold text-center">products</h1>

        <select
          onChange={handleItemsPerPage}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>number of products</option>
          <option value="5">5</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>

                <th>Name</th>
                <th>Type</th>
                <th>
                  <button
                    className="btn btn-success text-white"
                    onClick={() => modalRef.current.showModal()} // Open modal using the ref
                  >
                    Add product
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data?.result?.map((res, index) => (
                  <tr key={res._id} className="bg-base-200">
                    <th>{index + 1}</th>
                    <td>
                      <img src={res.image} className="w-16 rounded-3xl"></img>
                    </td>
                    <td>{res.title}</td>
                    <td>{res.type}</td>
                    <td>
                      <button className="btn btn-sm text-white btn-error">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <span className="loading loading-spinner loading-lg"></span>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold my-2 underline p-1">Category</h1>
        <div className="w-48 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <button
            onClick={() => setCategory("shoes")}
            type="button"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <TbShoe className="text-xl" />
            shoes
          </button>
          <button
            onClick={() => setCategory("bags")}
            type="button"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <IoBag className="text-xl" />
            Bags
          </button>
          <button
            onClick={() => setCategory("accessories")}
            type="button"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <PiCarThin className="text-xl" />
            Accessories
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
