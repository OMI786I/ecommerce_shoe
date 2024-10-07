import React from "react";
import useCartFetch from "../../customHook/useCartFetch";

const Cart = () => {
  const { data } = useCartFetch();
  console.log(data);

  return <div>This is cart</div>;
};

export default Cart;
