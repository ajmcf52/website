import React from "react";
import PropTypes from "prop-types";
import HomePageHeader from "./HomePageHeader";
import "./css/HomePage.css";

const HomePage = ({ classes }) => {
  return (
    <div className="homePage">
      <HomePageHeader />
      <hr className="hrule" />
      <div className="box">
        <p className="aboutHeader">About Me</p>
        <p className="aboutText">
          <span className="textChunk">
            Self-proclaimed nerd jock. Loosely speaking, AJ's central mission in
            life is to help as many people as possible and to have a good time
            doing it. A student of stoicism, AJ is in pursuit of excellence in
            technology and sport, namely software engineering and bodybuilding.
            Had he been born around the time of Jesus, AJ would have gotten
            along very well with the paleo-Christians.
          </span>
          <br />
          <br />
          <span className="textChunk">
            Music-wise, the Snow Yeti's palate is vast — from classical and
            heavy metal, to drum & bass and rap. It mustn't be forgotten,
            however, that Andrew's true loyalty lies with classic rock: the
            sweet, golden nectar of the sixties and seventies. The gift that
            just keeps giving. Supertramp, Doobie Brothers, Fleetwood Mac, Dire
            Straits; how can you go wrong?
          </span>
          <br />
          <br />
          <span className="textChunk">
            Historically and still predominantly an introvert, AJ can be
            extroverted too
          </span>
          <br />
          <br />
          Dreamchaser. I make an effort of keeping most of these things to
          myself (until there is merit to share them). Such things are best
          revealed in small chunks over time, I've found.
        </p>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.any,
};

export default HomePage;
