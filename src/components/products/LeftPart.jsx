import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeftPart = ({ link, category }) => {
  const [data, setData] = useState();
  const [clicked, setClicked] = useState(null);
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);

  const handleAccordionClick = (index) => {
    setClicked(clicked === index ? null : index);
  };

  const bagAndShoesContent = [
    {
      title: "Shoes",
      children: [
        {
          title: "Women Shoes",
          link: "/products/shoes_bags/shoes/women_shoes",
        },
        { title: "Men Shoes", link: "/products/shoes_bags/shoes/men_shoes" },
        { title: "Boots", link: "/products/shoes_bags/shoes/boots" },
        {
          title: "Casual Shoes",
          link: "/products/shoes_bags/shoes/casual_shoes",
        },
        { title: "Flip Shoes", link: "/products/shoes_bags/shoes/flip_shoes" },
      ],
    },
    {
      title: "Luggage and Bags",
      children: [
        {
          title: "Stylish Backpacks",
          link: "/products/shoes_bags/luggage_bags/stylishBags",
        },
        {
          title: "Shoulder Bags",
          link: "/products/shoes_bags/luggage_bags/shoulder_bags",
        },
        {
          title: "Crossbody Bags",
          link: "/products/shoes_bags/luggage_bags/crossBodyBags",
        },
        {
          title: "Briefcases",
          link: "/products/shoes_bags/luggage_bags/briefCases",
        },
        {
          title: "Luggage & Travel",
          link: "/products/shoes_bags/luggage_bags/luggage_travel",
        },
      ],
    },
  ];

  useEffect(() => {
    if (category === "shoes and bags") {
      setData(bagAndShoesContent);
    }
  }, [category]);

  const handleChange = (data) => {
    if (data === "shoes") {
      {
        if (first == true) {
          console.log(data);
        }
        setFirst(!first);
      }
    }

    if (data === "luggage&bags") {
      {
        if (second == true) {
          console.log(data);
        }
        setSecond(!second);
      }
    }
  };

  return (
    <div>
      {/* Accordion Section */}
      <div className=" ">
        <h1 className="text-xl p-3 ">{category}</h1>

        <div className="border-b  border-grey-600"></div>
        <div className="border-b-2 w-20 border-red-600"></div>

        <Accordion allowZeroExpanded className="p-1 hover:bg-transparent">
          {bagAndShoesContent.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading onClick={() => handleAccordionClick(index)}>
                <AccordionItemButton className="flex items-center gap-2 hover:text-red-600 transition ease-in-out delay-150 duration-300 border-b p-2 -ml-2">
                  <span>{item.title}</span>
                  {clicked === index ? <FaMinus /> : <FaPlus />}
                </AccordionItemButton>
              </AccordionItemHeading>

              {item.children && (
                <AccordionItemPanel>
                  {item.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className="ml-4 hover:text-red-600 transition ease-in-out delay-150 duration-300 p-2"
                    >
                      <Link to={child.link}>{child.title}</Link>
                    </div>
                  ))}
                </AccordionItemPanel>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Filter Section */}
      <div>
        <h1 className="text-xl p-3 ">Filter By</h1>

        <div className="border-b  border-grey-600"></div>
        <div className="border-b-2 w-20 border-red-600"></div>

        <h1 className="py-4 ">Categories</h1>

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="checkbox-shoes"
            value={first}
            onChange={() => handleChange("shoes")}
          />
          <label htmlFor="checkbox-shoes">Shoes</label>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="checkbox-luggage-bags"
            value={second}
            onChange={() => handleChange("luggage&bags")}
          />
          <label htmlFor="checkbox-luggage-bags">Luggage and Bags</label>
        </div>
      </div>
    </div>
  );
};

export default LeftPart;
