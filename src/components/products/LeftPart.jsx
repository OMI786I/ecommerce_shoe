import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const LeftPart = ({ link, category, product }) => {
  console.log(product);
  const [clicked, setClicked] = useState(null);
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);

  const [minPrice, setMinPrice] = useState(100); // Default minimum price
  const [maxPrice, setMaxPrice] = useState(1000); // Default maximum price
  const [range, setRange] = useState([100, 1000]); // Initial slider range

  // Update slider and input field when values change
  const handleSliderChange = (event) => {
    const { value, name } = event.target;
    if (name === "min") {
      setMinPrice(Number(value));
      setRange([Number(value), range[1]]);
    } else if (name === "max") {
      setMaxPrice(Number(value));
      setRange([range[0], Number(value)]);
    }
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    if (name === "min") {
      setMinPrice(Number(value));
      setRange([Number(value), range[1]]);
    } else if (name === "max") {
      setMaxPrice(Number(value));
      setRange([range[0], Number(value)]);
    }
  };

  const handleAccordionClick = (index) => {
    setClicked(clicked === index ? null : index);
  };

  const bagAndShoesContent = [
    {
      title: "Shoes",
      children: [
        {
          lead: "women",
          title: "Women Shoes",
          link: "/products/shoes_bags/shoes/women_shoes",
        },
        {
          lead: "men",
          title: "Men Shoes",
          link: "/products/shoes_bags/shoes/men_shoes",
        },
        {
          lead: "boots",
          title: "Boots",
          link: "/products/shoes_bags/shoes/boots",
        },
        {
          lead: "casual",
          title: "Casual Shoes",
          link: "/products/shoes_bags/shoes/casual_shoes",
        },
        {
          lead: "flip",
          title: "Flip Shoes",
          link: "/products/shoes_bags/shoes/flip_shoes",
        },
      ],
    },
    {
      title: "Luggage and Bags",
      children: [
        {
          lead: "stylish",
          title: "Stylish Backpacks",
          link: "/products/shoes_bags/luggage_bags/stylishBags",
        },
        {
          lead: "shoulder",
          title: "Shoulder Bags",
          link: "/products/shoes_bags/luggage_bags/shoulder_bags",
        },
        {
          lead: "shoulder",
          title: "Crossbody Bags",
          link: "/products/shoes_bags/luggage_bags/crossBodyBags",
        },
        {
          lead: "briefcases",
          title: "Briefcases",
          link: "/products/shoes_bags/luggage_bags/briefCases",
        },
        {
          lead: "luggage",
          title: "Luggage & Travel",
          link: "/products/shoes_bags/luggage_bags/luggage_travel",
        },
      ],
    },
  ];

  //http://localhost:5173/products/others_accessories/cosmeticBags_cases

  const [data, setData] = useState(bagAndShoesContent);
  const othersAndAccessories = [
    {
      title: "Other Bags and Accessories",
      children: [
        {
          lead: "cosmetic",
          title: "Cosmetic Bags & Cases",
          link: "/products/others_accessories/cosmeticBags_cases",
        },
        {
          lead: "wallet",
          title: "Wallet & Card Holders",
          link: "/products/others_accessories/walletCards_holders",
        },
        {
          lead: "luggage_cover",
          title: "Luggage Covers",
          link: "/products/others_accessories/luggage_covers",
        },
      ],
    },
  ];

  useEffect(() => {
    if (category === "shoes and bags") {
      setData(bagAndShoesContent);
    } else if (category === "Others and accessories") {
      setData(othersAndAccessories);
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
  console.log(data);

  return (
    <div className="px-2">
      {/* Accordion Section */}
      <div className=" ">
        <h1 className="text-xl p-3 ">{category}</h1>

        <div className="border-b  border-grey-600"></div>
        <div className="border-b-2 w-20 border-red-600"></div>

        <Accordion allowZeroExpanded className="p-1 hover:bg-transparent">
          {data.map((item, index) => (
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
                      className={`ml-4 hover:text-red-600 transition ease-in-out delay-150 duration-300 p-2 ${
                        child.lead === product ? `text-red-600` : ``
                      }`}
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
      <div>
        {" "}
        {/* Slider */}
        <h1 className="py-3">Price</h1>
        <div className="flex flex-col items-start">
          <div>
            {" "}
            <input
              type="range"
              name="min"
              min="0"
              max="5000"
              value={minPrice}
              onChange={handleSliderChange}
              className="appearance-none bg-gray-300 h-2 rounded-lg cursor-pointer accent-red-500"
            />
          </div>
          <div>
            <label className="flex flex-col items-center">
              <span className="font-medium">Min Price: ${minPrice}</span>
              <input
                type="number"
                name="min"
                value={minPrice}
                onChange={handleInputChange}
                min="0"
                max={maxPrice - 1}
                className="mt-1 p-2 border rounded-md w-24 text-center"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div>
            {" "}
            <input
              type="range"
              name="max"
              min="0"
              max="5000"
              value={maxPrice}
              onChange={handleSliderChange}
              className=" appearance-none bg-gray-300 h-2 rounded-lg cursor-pointer accent-red-500"
            />
          </div>
          <label className="flex flex-col items-center">
            <span className="font-medium">Max Price: ${maxPrice}</span>
            <input
              type="number"
              name="max"
              value={maxPrice}
              onChange={handleInputChange}
              min={minPrice + 1}
              max="5000"
              className="mt-1 p-2 border rounded-md w-24 text-center"
            />
          </label>
        </div>
        {/* Display selected range */}
        <div className="text-lg font-semibold">
          Selected Price Range: ${minPrice} - ${maxPrice}
        </div>
        <button className="btn btn-xs md:btn my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500 transition ease-in-out delay-150   duration-300">
          Filter
        </button>
      </div>
    </div>
  );
};

export default LeftPart;
