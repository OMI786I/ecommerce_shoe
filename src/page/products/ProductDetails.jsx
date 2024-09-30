import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  let { id } = useParams();

  return <div>This is details {id}</div>;
};

export default ProductDetails;
