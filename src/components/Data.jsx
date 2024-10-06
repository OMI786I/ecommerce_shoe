import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import usePublicFetch from "../customHook/usePublicFetch";
import Rating from "react-rating";
import "font-awesome/css/font-awesome.min.css";

const Data = () => {
  const [query, setQuery] = useState("men");
  const [manButton, setManButton] = useState(false);
  const [womanButton, setWomanButton] = useState(false);
  const [casualButton, setCasualButton] = useState(false);
  console.log(manButton);
  console.log(query);
  const { isPending, error, data, refetch } = usePublicFetch({
    endPoint: "shoes",
    query: `${query}`,
    min: 0,
    max: 100000,
  });

  console.log(data);

  if (isPending) {
    <span className="loading loading-spinner loading-lg text-center"></span>;
  }

  return (
    <div>
      <div className="flex justify-center my-5 gap-1">
        <button
          className={
            manButton
              ? "btn hover:bg-red-500 bg-red-500 text-white"
              : "btn hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500"
          }
          onClick={() => {
            setQuery("men"),
              refetch(),
              setManButton(!false),
              setWomanButton(false);
            setCasualButton(false);
          }}
        >
          Men
        </button>
        <button
          className={
            womanButton
              ? "btn hover:bg-red-500 bg-red-500 text-white"
              : "btn hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500"
          }
          onClick={() => {
            setQuery("women"),
              refetch(),
              setWomanButton(!false),
              setManButton(false);
            setCasualButton(false);
          }}
        >
          Women
        </button>
        <button
          className={
            casualButton
              ? "btn hover:bg-red-500 bg-red-500 text-white"
              : "btn hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500"
          }
          onClick={() => {
            setQuery("casual"),
              refetch(),
              setWomanButton(false),
              setManButton(false);
            setCasualButton(!false);
          }}
        >
          Casual
        </button>
      </div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data
          ? data.map((res) => (
              <div
                key={res._id}
                className="group w-full md:w-[230px] lg:w-96 relative"
              >
                <div className="inline-block">
                  {/** card */}
                  <div className="p-2 w-full transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 rounded-xl border">
                    <div className="relative">
                      <img src={res.image} className="w-60 h-60" />
                      <p className="absolute text-white bg-red-600 p-1 text-sm rounded-lg right-1 top-1">
                        New
                      </p>
                    </div>
                    <div>
                      <h1 className="text-gray-500">{res.title}</h1>
                      <div>
                        <div className="rating">
                          <Rating
                            initialRating={res.rating}
                            readonly
                            emptySymbol={["fa fa-star-o fa-2x"]}
                            fullSymbol={["fa fa-star fa-2x"]}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <h1 className="font-bold">${res.price}</h1>
                        <div className="flex">
                          <div className="flex md:hidden gap-1">
                            <div className="tooltip" data-tip="add to wishlist">
                              <button className="btn btn-xs rounded-full">
                                <HiHeart />
                              </button>
                            </div>

                            <Link to={`/products/details/${res._id}`}>
                              <div className="tooltip" data-tip="Quick View">
                                <button className="btn btn-xs rounded-full">
                                  <BiSearch />
                                </button>
                              </div>
                            </Link>
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
                  <Link to={`/products/details/${res._id}`}>
                    <div className="tooltip" data-tip="Quick View">
                      <button className="btn btn-xs rounded-full">
                        <BiSearch />
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          : "loading..."}
      </div>
    </div>
  );
};

export default Data;
