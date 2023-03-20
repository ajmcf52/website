import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LoadConfigActionCreator } from "../Actions/LoadConfigEvent";
import { LoadAboutMeActionCreator } from "../Actions/LoadAboutMeEvent";

/**
 * empty div component that is used to push config data to the app state.
 */

const jsonData = require("../Config/config.json");
const aboutme = require("../Config/aboutme.txt");

class DataRef extends React.Component {
  render() {
    return <div />;
  }
  componentDidMount() {
    this.props.dataRef(jsonData);
    fetch(aboutme)
      .then((response) => response.text())
      .then((text) => {
        this.props.aboutMe({ text: text });
      });
  }
}

const mapDispatchToProps = {
  dataRef: LoadConfigActionCreator.dataRef,
  aboutMe: LoadAboutMeActionCreator.aboutMe,
};

DataRef.propTypes = {
  dataRef: PropTypes.func,
  aboutMe: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(DataRef);
