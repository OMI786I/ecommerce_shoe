import React from "react";
import LeftPart from "../../components/products/LeftPart";
import RightPart from "../../components/products/RightPart";
import { useParams } from "react-router-dom";

const Products = () => {
  const link = useParams();
  console.log(link);

  return (
    <div>
      <div className="grid-cols-2">
        <div>
          <LeftPart link={link} />
        </div>
        <div>
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default Products;
