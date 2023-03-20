import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { ProfileBackgroundColor } from "../Constants";
import { generateButtons } from "../Factory/ButtonFactory";

/**
 * The main centerpiece of the app.
 */

const styles = () =>
  createStyles({
    headshot: {
      height: "220px",
      width: "220px",
      borderRadius: "50%",
      border: "3px solid black",
    },
    profileInfo: {
      display: "flex",
      flexDirection: window.innerWidth >= 700 ? "column" : "row",
      minWidth: "0px",
      minHeight: "0px",
      height: "auto",
      justifyContent: "space-between",
      alignItems: "center",
    },
    nameAndBlurb: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      display: "inline",
      overflowWrap: "normal",
      minHeight: "0px",
      height: "auto",
    },
    blurb: {
      position: "relative",
      bottom: window.innerWidth >= 700 ? "0px" : "70px",
      right: "15px",
      display: "inline",
      overflowWrap: "normal",
    },
    nameTxt: {
      fontFamily: "Georgia, serif",
      fontSize: "40px",
      display: "inline",
      position: "relative",
    },
    quickLinks: {
      display: "flex",
      marginTop: window.innerWidth >= 700 ? "25%" : "0px",
      minWidth: "0px",
    },
    smallIcon: {
      width: "45px",
      height: "45px",
      display: "inline-block",
      position: "relative",
      backgroundColor: "transparent",
      marginLeft: "10px",
      marginRight: "10px",
    },
  });

const rootStyle = {
  display: "flex",
  zIndex: "1",
  flexDirection: window.innerWidth >= 700 ? "row" : "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundColor: ProfileBackgroundColor,
  borderRadius: "20px",
  border: "3px solid black",
  transition: "margin-top .5s ease-out",
  padding: "10px",
  minWidth: window.innerWidth < 700 ? "95vw" : "60%",
  maxWidth: window.innerWidth < 700 ? "95vw" : "80%",
  margin: "0 auto",
};

const Profile = (props) => {
  const { classes, profile, tab } = props;
  if (profile) {
    //larger view (desktop, ipad)
    return window.innerWidth >= 700 ? (
      <div style={{ ...rootStyle, marginTop: tab !== "none" ? "-5%" : "20%" }}>
        <div>
          <img
            alt={profile.pic && profile.pic.alt}
            src={profile.pic && profile.pic.path}
            className={classes.headshot}
          />
        </div>
        <div className={classes.profileInfo}>
          <div className={classes.nameAndBlurb}>
            <div className={classes.name}>
              <h2 className={classes.nameTxt}>
                {profile.name && profile.name.value}
              </h2>
            </div>
            <div className={classes.blurb}>
              <i>{profile.blurb && profile.blurb.value}</i>
            </div>
          </div>
          <div className={classes.quickLinks}>
            {generateButtons(classes, profile.icons)}
          </div>
        </div>
      </div>
    ) : (
      //column view (mobile)
      <div style={{ ...rootStyle, marginTop: tab !== "none" ? "-5%" : "20%" }}>
        <div className={classes.name}>
          <h2 className={classes.nameTxt}>
            {profile.name && profile.name.value}
          </h2>
        </div>
        <div className={classes.profileInfo}>
          <div>
            <img
              alt={profile.pic && profile.pic.alt}
              src={profile.pic && profile.pic.path}
              className={classes.headshot}
            />
          </div>
          <div className={classes.blurb}>
            <i>{profile.blurb && profile.blurb.value}</i>
          </div>
        </div>
        <div className={classes.quickLinks}>
          {generateButtons(classes, profile.icons)}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Profile.propTypes = {
  classes: PropTypes.any,
  profile: PropTypes.any,
  tab: PropTypes.any,
};

const mapStateToProps = (state, props) => ({
  profile: state && state.config && state.config.profile,
  tab: state && state.tab && state.tab.openTab,
});

const connectedProfile = connect(mapStateToProps, null)(Profile);

export default withStyles(styles)(connectedProfile);
