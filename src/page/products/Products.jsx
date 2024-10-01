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
  const [subCategory2, setSubCategory] = useState("");
  const { isPending, error, data, refetch } = usePublicFetch({
    endPoint: subCategory2,
    query: product,
  });

  useEffect(() => {
    if (link.category === "shoes_bags") {
      setCategory("shoes and bags");
      setSubCategory("shoes");
    } else if (link.category === "others_accessories") {
      setCategory("Others and accessories");
      setSubCategory("shoes");
    } else {
      setCategory("");
    }

    if (link.subCategory === "luggage_bags") {
      setSubCategory("bags");
    }

    if (link.product === "stylishBags") {
      setProduct("stylish");
      setSubCategory("bags");
    } else if (link.product === "crossBodyBags") {
      setProduct("shoulder");
      setSubCategory("bags");
    } else if (link.product === "luggage_travel") {
      setProduct("luggage");
      setSubCategory("bags");
    } else if (link.product === "shoulder_bags") {
      setProduct("shoulder");
      setSubCategory("bags");
    } else if (link.product === "women_shoes") {
      setProduct("women");
      setSubCategory("shoes");
    } else if (link.product === "men_shoes") {
      setProduct("men");
      setSubCategory("shoes");
    } else if (link.product === "boots") {
      setProduct("boots");
      setSubCategory("shoes");
    } else if (link.product === "casual_shoes") {
      setProduct("casual");
      setSubCategory("shoes");
    } else if (link.product === "flip_shoes") {
      setProduct("flip");
      setSubCategory("shoes");
    } else if (link.product === "briefCases") {
      setProduct("briefcases");
      setSubCategory("bags");
    }
  }, [link.category, link.subCategory, link.product]);

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
          <LeftPart link={link} category={category} product={product} />
        </div>
        <div className="col-span-3">
          <RightPart
            isPending={isPending}
            error={error}
            data={data}
            refetch={refetch}
            subCategory2={subCategory2}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
