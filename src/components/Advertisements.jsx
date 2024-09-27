import React from "react";
import { BiBox } from "react-icons/bi";
import { FcCustomerSupport } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { RiCustomerServiceFill } from "react-icons/ri";
import { TbTruck } from "react-icons/tb";

const Advertisements = () => {
  return (
    <div>
      <div className="my-12 gap-4 p-8 grid grid-cols-1 md:grid-cols-4 bg-red-600 text-white">
        <div className="flex items-center gap-4">
          <div>
            <TbTruck className="text-4xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Free Shipping</h1>
            <p>On all orders over $75.00</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <BiBox className="text-4xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Free Returns</h1>
            <p>Returns are free within 9 days</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <RiCustomerServiceFill className="text-4xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Support 24/7</h1>
            <p>Contact us 24 hours a day</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <GrSecure className="text-4xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold">100% Payments Secure</h1>
            <p>Your payments are safe with us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
