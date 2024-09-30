import React, { useEffect, useState } from "react";
import LeftPart from "../../components/products/LeftPart";
import RightPart from "../../components/products/RightPart";
import { useParams } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import usePublicFetch from "../../customHook/usePublicFetch";

const Products = () => {
  const link = useParams();
  const [category, setCategory] = useState("");
  console.log(link.category);

  const { isPending, error, data, refetch } = usePublicFetch({
    endPoint: "shoes",
    query: "",
  });

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
