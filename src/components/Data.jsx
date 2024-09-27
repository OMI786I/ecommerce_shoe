import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Data = () => {
  return (
    <div>
      {/**card */}
      <div className="w-60 p-2  transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 rounded-xl border">
        <div className="relative ">
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
          <div className="flex justify-between ">
            {" "}
            <h1 className="font-bold">$11.90</h1>
            <Link to={"/wishlist"}>
              <IoCartOutline className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      <div className="group">
        <div className="inline-block">Hover over me.</div>
        <div className="hidden group-hover:block text-red-500 duration-75">
          I am shown when someone hovers over the div above.
        </div>
      </div>
    </div>
  );
};

export default Data;
