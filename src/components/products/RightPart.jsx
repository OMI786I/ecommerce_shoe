import { useState } from "react";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import useWishList from "../../customHook/useWishList";
import useCartPost from "../../customHook/useCartPost";

const RightPart = ({
  isPending,

  data,

  sort,
  limit,
  page,

  setPage,
  setLimit,
  setSort,
}) => {
  const [active, setActive] = useState(false);
  const [activeCard, setActiveCard] = useState(false);
  const handleClickCard = () => {
    setActive(!active);
  };
  const handleClickHero = () => {
    setActiveCard(!activeCard);
  };
  const wishPost = useWishList();
  const cartPost = useCartPost();
  const handleWishList = (res) => {
    wishPost(res);
  };
  const handleAddCart = (res) => {
    cartPost(res);
  };

  console.log(activeCard, active);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setLimit(val);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    console.log(sort);
    setSort(sort);
  };

  const numberOfPages = Math.ceil(data.totalDocuments / limit);

  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < pages.length) {
      setPage(page + 1);
    }
  };

  if (isPending) {
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>;
    </div>;
  }

  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className=" hidden navbar-start gap-1">
            <button className="" onClick={handleClickCard}>
              {" "}
              <AiFillAppstore className="text-xl hover:text-red-600 " />
            </button>
            <button onClick={handleClickHero}>
              {" "}
              <AiOutlineBars className="text-xl hover:text-red-600  " />
            </button>
          </div>
          <div className="mx-2 hidden md:flex navbar-start">
            There are products: <b> {data.totalDocuments}</b>
          </div>
          <div className="navbar-center  lg:flex">
            {" "}
            <label className="font-bold">Sort by: </label>
            <select value={sort} onChange={handleSort} name="" id="">
              <option value="">Relevant</option>
              <option value="asc">Asc by price</option>
              <option value="desc">Dsc by price</option>
            </select>
          </div>

          <div className="navbar-end">
            <label className="font-bold">Items per page: </label>
            <select value={limit} onChange={handleItemsPerPage} name="" id="">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div>
          <div className="grid w-full h-full place-items-center grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {data
              ? data?.result?.map((res) => (
                  <div key={res._id} className="group w-full relative ">
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
                                <div
                                  className="tooltip"
                                  data-tip="add to wishlist"
                                >
                                  <button
                                    className="btn btn-xs rounded-full"
                                    onClick={() => handleWishList(res)}
                                  >
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
                                <button
                                  className="btn btn-xs rounded-full"
                                  onClick={() => handleAddCart(res)}
                                >
                                  <IoCartOutline className="text-xl" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden bottom-[55%] left-[35%] absolute md:group-hover:block text-red-500 duration-75">
                      <div className="tooltip" data-tip="add to wishlist">
                        <button
                          className="btn btn-xs rounded-full"
                          onClick={() => handleWishList(res)}
                        >
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
          <div className="flex justify-center my-2">
            {" "}
            <button className="btn" onClick={handlePrevPage}>
              Prev
            </button>
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
            <button className="btn" onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPart;
