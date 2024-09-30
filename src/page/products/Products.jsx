import React, { useEffect, useState } from "react";
import LeftPart from "../../components/products/LeftPart";
import RightPart from "../../components/products/RightPart";
import { useParams } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import usePublicFetch from "../../customHook/usePublicFetch";

const Products = () => {
  const link = useParams();
  const [category, setCategory] = useState("shoes and bags");
  const [product, setProduct] = useState("men");
  const { isPending, error, data, refetch } = usePublicFetch({
    endPoint: "shoes",
    query: product,
  });
  console.log(data);

  useEffect(() => {
    if (link.product === "women_shoes") {
      setProduct("women");
    } else if (link.product === "men_shoes") {
      setProduct("men");
    } else if (link.product === "boots") {
      setProduct("boots");
    } else if (link.product === "casual_shoes") {
      setProduct("casual");
    } else if (link.product === "flip_shoes") {
      setProduct("flip");
    }
  }, [link.product]);
  console.log(product);
  useEffect(() => {
    if (link.category === "shoes_bags") {
      setCategory("shoes and bags");
    } else if (link.category === "others_accessories") {
      setCategory("Others and accessories");
    } else {
      setCategory("");
    }
  }, [link.category]);

  if (isPending) {
    return (
      <span className="loading loading-spinner loading-lg text-center"></span>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <HiHome /> / {category}
      </div>
      <div></div>

      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <LeftPart link={link} category={category} />
        </div>
        <div className="col-span-3">
          <RightPart
            isPending={isPending}
            error={error}
            data={data}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
