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
  const [page3, setPage] = useState(1);
  const [limit2, setLimit] = useState(10);
  const [sort2, setSort] = useState("");
  let [price, setPrice] = useState({
    min: 0,
    max: 1000,
  });
  console.log(price);
  const { isPending, error, data, refetch, sort, limit, page, min, max } =
    usePublicFetch({
      endPoint: subCategory2,
      query: product,
      min: price.min,
      max: price.max,
      sort: sort2,
      page: page3,
      limit: limit2,
    });
  console.log(link, product, subCategory2);

  useEffect(() => {
    if (link.category === "others_accessories") {
      setCategory("Others and accessories");
      setSubCategory("accessories");

      if (link.subCategory === "cosmeticBags_cases") {
        setProduct("cosmetic");
      } else if (link.subCategory === "wallet_cardHolders") {
        setProduct("wallet");
      } else if (link.subCategory === "luggage_covers") {
        setProduct("luggage_cover");
      } else {
        setProduct("wallet");
      }
    } else if (link.category === "shoes_bags") {
      setCategory("shoes and bags");
      setSubCategory("shoes");

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
    }
  }, [link.category, link.subCategory, link.product, category]);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg text-center"></span>
      </div>
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
          <LeftPart
            link={link}
            category={category}
            product={product}
            setPrice={setPrice}
            price={price}
            refetch={refetch}
          />
        </div>
        <div className="col-span-3">
          <RightPart
            isPending={isPending}
            error={error}
            data={data}
            refetch={refetch}
            subCategory2={subCategory2}
            sort={sort}
            limit={limit}
            page={page}
            min={min}
            max={max}
            setPage={setPage}
            setLimit={setLimit}
            setSort={setSort}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
