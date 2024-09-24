import { Link } from "react-router-dom";

const Navbar = () => {
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
    </div>
  );
};

export default Navbar;
