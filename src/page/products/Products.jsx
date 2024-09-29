import React, { useEffect, useState } from "react";
import LeftPart from "../../components/products/LeftPart";
import RightPart from "../../components/products/RightPart";
import { useParams } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const Products = () => {
  const link = useParams();
  const [category, setCategory] = useState("");
  console.log(link.category);

  useEffect(() => {
    if (link.category === "shoes_bags") {
      setCategory("shoes and bags");
    } else if (link.category === "others_accessories") {
      setCategory("Others and accessories");
    } else {
      setCategory("");
    }
  }, [link.category]);

  return (
    <div>
      <div className="flex items-center">
        <HiHome /> / {category}
      </div>
      <div></div>

      <div className="grid-cols-2">
        <div>
          <LeftPart link={link} category={category} />
        </div>
        <div>
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default Products;
