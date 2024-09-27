import React from "react";
import { BiSearch } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Data = () => {
  return (
    <div>
      <div className="group w-full md:w-60 lg:w-96 relative">
        <div className="inline-block">
          {/** card */}
          <div className="p-2 w-full transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 rounded-xl border">
            <div className="relative">
              <img
                src="/src/assets/images/data/female_10.jpeg"
                className="w-full"
              />
              <p className="absolute text-white bg-red-600 p-1 text-sm rounded-lg right-1 top-1">
                New
              </p>
            </div>
            <div>
              <h1 className="text-gray-500">Water and wind resistant</h1>
              <div>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <h1 className="font-bold">$11.90</h1>
                <div className="flex">
                  <div className="flex md:hidden gap-1">
                    <div className="tooltip" data-tip="add to wishlist">
                      <button className="btn btn-xs rounded-full">
                        <HiHeart />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Quick View">
                      <button className="btn btn-xs rounded-full">
                        <BiSearch />
                      </button>
                    </div>
                  </div>
                  <div className="tooltip" data-tip="Add to cart">
                    <Link to={"/wishlist"}>
                      <button className="btn btn-xs rounded-full">
                        <IoCartOutline className="text-xl" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bottom-[55%] left-[35%] absolute md:group-hover:block text-red-500 duration-75">
          <div className="tooltip" data-tip="add to wishlist">
            <button className="btn btn-xs rounded-full">
              <HiHeart />
            </button>
          </div>
          <div className="tooltip" data-tip="Quick View">
            <button className="btn btn-xs rounded-full">
              <BiSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
