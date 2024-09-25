import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.

const DrawerContent = () => {
  const [clicked, setClicked] = useState(false);

  const bagAndShoesContent = [
    {
      title: "Shoes",
      children: [
        { title: "Women Shoes" },
        { title: "Men Shoes" },
        { title: "Boots" },
        { title: "Casual Shoes" },
        { title: "Flip Flops" },
      ],
    },
    {
      title: "Luggage and bags",
      children: [
        {
          title: "Stylish Backpacks",
        },
        {
          title: "Shoulder Bags",
        },
        {
          title: "Crossbody Bags",
        },
        {
          title: "Briefcases",
        },
        {
          title: "Luggage & Travel",
        },
      ],
    },
    {
      title: "Others and Accessories",
      children: [
        {
          title: "Cosmetic Bags & Cases",
        },
        {
          title: "Wallets & Card Holders",
        },
        {
          title: "Luggage Covers",
        },
        {
          title: "Passport Covers",
        },
        {
          title: "Bag Parts & Accessories",
        },
      ],
    },
  ];

  const handleAccordionClick = (index) => {
    setClicked(clicked === index ? null : index);
  };

  return (
    <div className="text-lg">
      <Link to={"/"}>
        <li className="p-1 border-b hover:text-red-600 transition ease-in-out delay-150 duration-300">
          Home
        </li>
      </Link>

      <Accordion allowZeroExpanded className="p-1  hover:bg-transparent">
        {bagAndShoesContent.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading onClick={() => handleAccordionClick(index)}>
              <AccordionItemButton className="flex items-center gap-2 hover:text-red-600 transition ease-in-out delay-150 duration-300 border-b p-2 -ml-2">
                {item.title}
                {clicked === index ? <FaMinus /> : <FaPlus />}
              </AccordionItemButton>
            </AccordionItemHeading>

            {/* Render children if they exist */}
            {item.children && (
              <AccordionItemPanel>
                {item.children.map((child, childIndex) => (
                  <div
                    key={childIndex}
                    className="ml-4 hover:text-red-600 transition ease-in-out delay-150 duration-300 p-2"
                  >
                    <Link
                      to={`/products/${child.title
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {child.title}
                    </Link>
                  </div>
                ))}
              </AccordionItemPanel>
            )}
          </AccordionItem>
        ))}
      </Accordion>

      <Link to={"/"}>
        <li className="p-1 border-b hover:text-red-600 transition ease-in-out delay-150 duration-300">
          Contact Us
        </li>
      </Link>
      <Link to={"/"}>
        <li className="p-1 border-b hover:text-red-600 transition ease-in-out delay-150 duration-300">
          About Us
        </li>
      </Link>
    </div>
  );
};

export default DrawerContent;
