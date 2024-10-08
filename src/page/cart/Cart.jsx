import React, { useEffect, useState } from "react";
import useCartFetch from "../../customHook/useCartFetch";
import { AiFillDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Cart = () => {
  const { data, price } = useCartFetch();
  const [finalPrice, setFinalPrice] = useState(price);
  console.log(finalPrice);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setFinalPrice(price);
  }, [price]);

  const onSubmit = (data) => {
    if (data.coupon === "Junno50") {
      const halfPrice = price / 2;
      setFinalPrice(halfPrice);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Offer is Applied",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  if (!data) {
    return "loading....";
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-">
        <h1 className="text-2xl font-bold mb-4">
          You have {data.length} items in your cart
        </h1>
        <p className="text-gray-500 mb-6">
          Sort items or update quantities as needed.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          {data?.map((res) => (
            <div
              key={res._id}
              className="p-4 rounded-xl bg-white shadow-lg flex flex-col md:flex-row items-center gap-4 transform hover:scale-105 transition duration-300 my-1"
            >
              <img
                src={res.image}
                className="w-32 h-32 object-cover rounded-md"
                alt={res.title}
              />

              <div className="flex-1">
                <h1 className="text-lg font-bold mb-2">{res.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <h1 className="text-gray-600">Quantity</h1>
                    <input
                      type="number"
                      className="input input-bordered w-20 text-center"
                      min={0}
                      max={30}
                      defaultValue={1}
                    />
                  </div>

                  <div className="flex flex-col text-center">
                    <p className="text-gray-600">Price</p>
                    <p className="text-xl font-semibold">${res.price}</p>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDelete(res._id)}
                  >
                    <AiFillDelete className="text-2xl" />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl mt-4 shadow-xl">
          {/**Estimated total heading */}
          <div className="flex justify-center gap-4   ">
            <div>
              <h1 className="text-xl font-bold mt-2">
                Estimated total: ${finalPrice}
              </h1>
            </div>
          </div>
          {/**Estimated total list */}
          <div>
            <div className="flex flex-col my-4 items-center">
              <label>Add Coupon</label>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  {...register("coupon")}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
                <input
                  type="submit"
                  value={"Add Coupon"}
                  className="btn btn-error text-white my-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
