import React from "react";
import PropTypes from "prop-types";
import HomePageHeader from "./HomePageHeader";
import "./css/HomePage.css";

const HomePage = ({ classes }) => {
  return (
    <div className="homePage">
      <HomePageHeader />
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.any,
};

export default HomePage;
