import React from "react";
import img1 from "../assets/images/4_1.jpg";
import img2 from "../assets/images/5_1.jpg";
import img3 from "../assets/images/6_1.jpg";
import img4 from "../assets/images/7_1.jpg";

const Category = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 my-3">
      <div className="row-span-2 relative">
        <img src={img1} className="h-full w-full object-cover" />
        <p className=" absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2  btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  ">
          Shop
        </p>
      </div>
      <div className="row-span-2 relative">
        <img src={img2} className="h-full w-full object-cover" />
        <p className=" absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2  btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  ">
          Shop
        </p>
      </div>
      <div className=" relative">
        <img src={img3} className="h-full w-full object-cover" />
        <p className=" absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2  btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  ">
          Shop
        </p>
      </div>
      <div className=" relative">
        <img src={img4} className="h-full w-full object-cover" />
        <p className=" absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2  btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  ">
          Shop
        </p>
      </div>
    </div>
  );
};

export default Category;
