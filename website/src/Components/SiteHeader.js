import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { ButtonHoverColor, HeaderBackgroundColor } from "../Constants";
import { TabEventCreator } from "../Actions/TabEvent";

/**
 * The top header bar that contains the main tabs
 */

const styles = () =>
  createStyles({
    siteHeader: {
      display: "flex",
      zIndex: "3",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: HeaderBackgroundColor,
      minWidth: "100%",
      borderBottom: "3px solid black",
      position: "fixed"
    },
    headerBtn: {
      justifyContent: "space-between",
      margin: "7px 20px",
      color: "white",
      fontSize: "15px",
      fontWeight: "bold",
      "&:hover": {
        background: ButtonHoverColor,
        opacity: ".8"
      }
    }
  });

const createHeaderButtons = (action, classes, tabData) => {
  return Object.keys(tabData).map(tab => (
    <Button className={classes.headerBtn} onClick={() => action(tab)}>
      {tab}
    </Button>
  ));
};

const SiteHeader = props => {
  const { classes, loadHeader, tabData } = props;

  if (tabData) {
    return (
      <div className={classes.siteHeader}>
        {createHeaderButtons(loadHeader, classes, tabData)}
      </div>
    );
  } else {
    return null;
  }
};

SiteHeader.propTypes = {
  classes: PropTypes.any,
  loadHeader: PropTypes.func,
  tabData: PropTypes.any
};

const mapStateToProps = (state, props) => ({
  tabData:
    state && state.config && state.config.profile && state.config.profile.tabs
});

const mapDispatchToProps = {
  loadHeader: TabEventCreator.showTab
};

const connectedComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHeader);

export default withStyles(styles)(connectedComp);
