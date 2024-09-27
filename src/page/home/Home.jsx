import React from "react";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Data from "../../components/Data";
import Advertisements from "../../components/Advertisements";
import Blogs from "../../components/Blogs";
const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Data />
      <Advertisements />
      <Blogs />
    </div>
  );
};

export default Home;
