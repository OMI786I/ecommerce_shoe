import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaArrowDown } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// DrawerContent Component

const DrawerContent = () => {
  const [clicked, setClicked] = useState(null);

  // Content for Bags and Shoes
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
    {
      title: "Other Bags and Accessories",
      children: [
        {
          title: "Cosmetic Bags & Cases",
          link: "/products/others_accessories/cosmeticBags_cases",
        },
        {
          title: "Wallet & Card Holders",
          link: "/products/others_accessories/wallet_cardHolders",
        },
        {
          title: "Luggage Covers",
          link: "/products/others_accessories/luggage_covers",
        },
      ],
    },
  ];

  const handleAccordionClick = (index) => {
    setClicked(clicked === index ? null : index);
  };

  return (
    <div className="text-lg">
      <Link to="/">
        <li className="p-1 border-b hover:text-red-600 transition ease-in-out delay-150 duration-300">
          Home
        </li>
      </Link>

      {/* Bags and Shoes Accordion */}
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
  );
};

export default DrawerContent;
