import { BiSearch } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import Rating from "react-rating";
import { Link, useLocation } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] }; // Fallback to empty array if no data
  console.log(results);

  if (!results) {
    <div className="flex justify-center">
      {" "}
      <span className="loading loading-spinner loading-lg"></span>;
    </div>;
  } else
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {results.map((res) => (
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
                        <button className="btn btn-xs rounded-full">
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
        ))}
      </div>
    );
};

export default SearchResult;
