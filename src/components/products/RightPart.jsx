import { useState } from "react";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const RightPart = ({ isPending, error, data, refetch }) => {
  const [active, setActive] = useState(false);
  const [activeCard, setActiveCard] = useState(false);
  const handleClickCard = () => {
    setActive(!active);
  };
  const handleClickHero = () => {
    setActiveCard(!activeCard);
  };

  console.log(activeCard, active);

  if (isPending) {
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>;
    </div>;
  }

  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start gap-1">
            <button className="" onClick={handleClickCard}>
              {" "}
              <AiFillAppstore className="text-xl hover:text-red-600 " />
            </button>
            <button onClick={handleClickHero}>
              {" "}
              <AiOutlineBars className="text-xl hover:text-red-600  " />
            </button>
            There are products {data.length}
          </div>
          <div className="navbar-center  lg:flex"></div>
          <div className="navbar-end">sort by:</div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data
              ? data.map((res) => (
                  <div key={res._id} className="group  relative">
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
                            <h1 className="font-bold">{res.price}</h1>
                            <div className="flex">
                              <div className="flex md:hidden gap-1">
                                <div
                                  className="tooltip"
                                  data-tip="add to wishlist"
                                >
                                  <button className="btn btn-xs rounded-full">
                                    <HiHeart />
                                  </button>
                                </div>

                                <Link to={`/products/details/${res._id}`}>
                                  <div
                                    className="tooltip"
                                    data-tip="Quick View"
                                  >
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
      </div>
    </div>
  );
};

export default RightPart;
