import React from "react";
import img1 from "../assets/images/4_1.jpg";
import img2 from "../assets/images/5_1.jpg";
import img3 from "../assets/images/6_1.jpg";
import img4 from "../assets/images/7_1.jpg";

const Category = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-4 my-3">
      <div
        className="hero row-span-2 min-h-[150px] sm:min-h-[300px] md:min-h-[500px] bg-cover bg-center  hover:scale-110 duration-300"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <button className="btn btn-xs md:btn my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Men's
            </button>
          </div>
        </div>
      </div>

      <div
        className="hero row-span-2 min-h-[150px] sm:min-h-[300px] md:min-h-[500px] bg-cover bg-center  hover:scale-110 duration-300"
        style={{
          backgroundImage: `url(${img2})`,
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <button className="btn btn-xs md:btn my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Women's
            </button>
          </div>
        </div>
      </div>

      <div
        className="hero min-h-[100px] sm:min-h-[200px] bg-cover bg-center  hover:scale-110 duration-300"
        style={{
          backgroundImage: `url(${img3})`,
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <button className="btn btn-xs md:btn my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Running
            </button>
          </div>
        </div>
      </div>

      <div
        className="hero min-h-[100px] sm:min-h-[200px] bg-cover bg-center  hover:scale-110 duration-300"
        style={{
          backgroundImage: `url(${img4})`,
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <button className="btn btn-xs md:btn my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Accessories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
