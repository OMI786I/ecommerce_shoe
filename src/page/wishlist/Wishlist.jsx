import React, { useEffect, useState } from "react";
import useWishListFetch from "../../customHook/useWishListFetch";
import { BiCart } from "react-icons/bi";
import useCartPost from "../../customHook/useCartPost";
import { AiTwotoneDelete } from "react-icons/ai";
import useCartDelete from "../../customHook/useCartDelete";

const Wishlist = () => {
  const {
    isPending,
    error,
    count,
    fetchData,
    refetch,
    setLimit,
    setPage,
    limit,
    page,
  } = useWishListFetch();
  const cartPost = useCartPost();

  const handleDelete = useCartDelete();
  const handleDeleteProduct = (id) => {
    handleDelete(id);
  };
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleAddCart = (res) => {
    cartPost(res);
  };
  const numberOfPages = Math.ceil(count / limit);

  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setLimit(val);
  };
  return (
    <div className="">
      <div>
        <label>Items per page: </label>
        <select value={limit} onChange={handleItemsPerPage} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {fetchData && fetchData.length > 0 ? (
        <div className="grid grid-cols-1">
          {fetchData.map((res) => (
            <div
              key={res._id} // Add a unique key for each item
              href="#"
              className=" w-full h-64 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="w-60 h-60 object-contain"
                src={res.image}
                alt={res.title}
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {res.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {res.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  ${res.price}
                </p>
                <div className="flex gap-1">
                  {" "}
                  <button
                    onClick={() => handleAddCart(res)}
                    className="btn hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500"
                  >
                    <BiCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(res._id)}
                    className="btn btn-error text-white"
                  >
                    <AiTwotoneDelete /> delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg text-gray-600">
            No items in your wishlist yet.
          </p>
        </div>
      )}
      <div className="flex justify-center my-2">
        {" "}
        {pages.map((page2) => (
          <button
            className={
              page === page2 + 1 ? "btn bg-orange-700" : "btn bg-orange-500"
            }
            onClick={() => setPage(page2 + 1)}
            key={page2}
          >
            {page2 + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
