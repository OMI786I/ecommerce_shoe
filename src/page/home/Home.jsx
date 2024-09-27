import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Data from "../../components/Data";
import Advertisements from "../../components/Advertisements";
import Blogs from "../../components/Blogs";
import StickyNavbar from "../../components/StickyNavbar";
const Home = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200);
    });
  });

  return (
    <div>
      <div className="hidden lg:flex">
        {scroll ? (
          <nav className="fixed top-0 w-full z-20 ">
            <StickyNavbar />
          </nav>
        ) : (
          ""
        )}
      </div>

      <Banner />
      <Category />
      <Data />
      <Advertisements />
      <Blogs />
    </div>
  );
};

export default Home;
