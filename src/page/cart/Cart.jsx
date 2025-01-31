import React, { useEffect, useState } from "react";
import useCartFetch from "../../customHook/useCartFetch";
import { AiFillDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useWishlistDelete from "../../customHook/useWishlistDelete";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUserFetch from "../../customHook/useUserFetch";

const Cart = () => {
  const { data, isPending } = useUserFetch();
  console.log(data);
  const { fetchData, setPage, setLimit, refetch, count2, price, limit, page } =
    useCartFetch();
  const [finalPrice, setFinalPrice] = useState(price);
  const [productQuantity, setProductQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const handlePayment = () => {
    axios
      .post(
        "https://ecommerce1-server.vercel.app/create-payment",
        {
          name: data[0].name,
          email: data[0].email,
          money: finalPrice,
          currency: "USD",
          products: fetchData,
          quantity: productQuantity,
          location: data[0].location,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.payment_url);
        window.location.href = res.data.payment_url;
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = useWishlistDelete();
  console.log(limit, page);

  console.log(fetchData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleDelete2 = (id) => {
    handleDelete(id);
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

  const numberOfPages = Math.ceil(count2 / limit);
  const pages = [...Array(numberOfPages).keys()];

  const handleQuantity = (e, id) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log("New quantity for item with id", id, "is", newQuantity);
    const quantity = { quantity: newQuantity };
    setProductQuantity(quantity);
    axios
      .patch(`https://ecommerce1-server.vercel.app/cart/${id}`, quantity, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          refetch();
          console.log("changed count");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setLimit(val);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false); // Set loading to false when data is available
    }
  }, [data]);

  if (!fetchData) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <label>Items per page: </label>
        <select value={limit} onChange={handleItemsPerPage} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">15</option>
          <option value="50">20</option>
        </select>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-">
        <h1 className="text-2xl font-bold mb-4">
          You have {count2} items in your cart
        </h1>
        <p className="text-gray-500 mb-6">
          Sort items or update quantities as needed.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          {fetchData?.map((res) => (
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
                      defaultValue={res.quantity}
                      onChange={(e) => handleQuantity(e, res._id)}
                    />
                  </div>

                  <div className="flex flex-col text-center">
                    <p className="text-gray-600">Price</p>
                    <p className="text-xl font-semibold">${res.price}</p>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDelete2(res._id)}
                  >
                    <AiFillDelete className="text-2xl" />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center my-2">
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
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : data[0]?.location && fetchData?.length > 0 ? (
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-colors"
          >
            Proceed to Checkout
          </button>
        ) : (
          <p className="text-red-600">
            {" "}
            Add your address and add products in the cart
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
