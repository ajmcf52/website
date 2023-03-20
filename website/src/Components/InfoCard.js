import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { TabEventCreator } from "../Actions/TabEvent";
import { getInfoCardContent } from "../Factory/ContentFactory";
import { TAB_STR, ProfileBackgroundColor } from "../Constants";

/**
 * The card that pops up when a tab from the top bar is selected.
 */

const windowStyle = (openTab) =>
  createStyles({
    root: {
      display: openTab === "none" ? "none" : "flex",
      backgroundColor: ProfileBackgroundColor,
      zIndex: "1",
      flexDirection: "row",
      border: "1px solid black",
      minHeight: "500px",
      marginTop: "4%",
      marginBottom: "-2%",
      borderRadius: "40px",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      minWidth: "0px",
      width: "auto",
      maxWidth: "95vw",
      position: "relative",
      bottom: "3%",
    },
  });

const styles = () =>
  createStyles({
    exitIcon: {
      zIndex: "-1",
      position: "relative",
    },
    aboutMeSpan: {
      margin: "15px 0 0 0",
    },
  });

function InfoCard(props) {
  const { classes, tabs, currentTab, aboutMe } = props;

  return currentTab === "ABOUT" ? (
    <div style={windowStyle(currentTab).root}>
      <span style={styles.aboutMeSpan}>{aboutMe}</span>
      <IconButton onClick={() => props.hideTab()} className={classes.exitIcon}>
        <CloseIcon />
      </IconButton>
    </div>
  ) : (
    <div style={windowStyle(currentTab).root}>
      {getInfoCardContent(tabs, currentTab, TAB_STR)}
      <IconButton onClick={() => props.hideTab()} className={classes.exitIcon}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

InfoCard.propTypes = {
  tabs: PropTypes.object,
  currentTab: PropTypes.string,
  classes: PropTypes.any,
};

const mapStateToProps = (state, props) => ({
  currentTab: state && state.tab && state.tab.openTab,
  tabs:
    state && state.config && state.config.profile && state.config.profile.tabs,
  aboutMe: state.aboutMe.text,
});

const mapDispatchToProps = {
  hideTab: TabEventCreator.hideTab,
};

const connectedCard = connect(mapStateToProps, mapDispatchToProps)(InfoCard);

export default withStyles(styles)(connectedCard);
