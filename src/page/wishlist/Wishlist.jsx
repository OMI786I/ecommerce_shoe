import React from "react";
import useWishListFetch from "../../customHook/useWishListFetch";

const Wishlist = () => {
  const { fetchData, refetch, isPending } = useWishListFetch();
  console.log(fetchData);
  if (isPending) {
    return (
      <div className="flex justify-center ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        {fetchData
          ? fetchData.map((res) => (
              <div key={res._id} className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                  <img
                    src={res.image}
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                  <div>
                    <h1 className="text-5xl font-bold">{res.title}</h1>
                    <p className="py-6">{res.description}</p>
                    <button className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    );
};

export default Wishlist;
