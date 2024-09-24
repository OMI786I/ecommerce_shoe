import { Link } from "react-router-dom";
import { MdWifiCalling } from "react-icons/md";
import { useState } from "react";
import { PiHeartStraight } from "react-icons/pi";

const Navbar = () => {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <div className="bg-black text-white flex justify-between p-2">
        <p>
          Join our showroom and get
          <span className="text-red-500"> 50% off</span>! Coupon code :{" "}
          <span className="text-red-500">Junno50</span>
        </p>
        <div>
          <Link to={"/login"}>
            <button className="btn btn-sm">Login</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={"/"}>
          <span className="text-5xl font-bold">Junno</span>
        </Link>
        <div className="w-full max-w-sm min-w-[200px] relative mt-4">
          <label className="block mb-2 text-sm text-slate-600">Your Name</label>

          <div className="relative">
            <input
              type="email"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter your text"
            />
            <button
              className="absolute right-1 top-1 rounded bg-red-600 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className=" gap-2 flex items-center">
          <MdWifiCalling className="text-4xl" />
          <div>
            <p className="text-gray-400">Call Us:</p>
            <p>1234567890</p>
          </div>
        </div>
        {/**heart icons */}
        <div>
          <PiHeartStraight
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
            className="text-3xl"
          />{" "}
          {hidden ? null : <h1 className="text-gray-400">Hovering</h1>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
