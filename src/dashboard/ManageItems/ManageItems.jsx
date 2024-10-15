import React, { useState } from "react";
import { IoBag } from "react-icons/io5";
import { PiCarThin } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";
import useAdminViewProducts from "../../customHook/useAdminViewProducts";

const ManageItems = () => {
  const [category, setCategory] = useState("shoes");
  const { data, isPending, error, refetch } = useAdminViewProducts({
    endPoint: category,
  });
  console.log(data);
  return (
    <div className="flex justify-center gap-5 ">
      {/**products */}
      <div>
        <h1 className="text-xl font-bold text-center">products</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>
                  <button className="btn btn-sm btn-success text-white">
                    Add Product
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {data ? (
                data.result.map((res, index) => (
                  <tr key={res._id} className="bg-base-200">
                    <th>{index + 1}</th>
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

      {/**category */}
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
