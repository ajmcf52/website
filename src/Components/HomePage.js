import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    homePage: {
      display: "inline",
    },
  });

const HomePage = ({ classes }) => {
  return <div className={classes.homePage}></div>;
};

HomePage.propTypes = {
  classes: PropTypes.any,
};

export default HomePage;
