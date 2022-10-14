import React from "react";
import PropTypes from "prop-types";
import "./css/HomePageHeader.css";

const HomePageHeader = ({ classes }) => {
  return (
    <div className="topLevelBox">
      <img
        src="images/amor-fati.jpeg"
        alt="Amor Fati"
        className="featuredPicture"
        align="left"
        height={200}
        width={200}
      />
      <div className="innerBox">
        <p className="greeting">
          <b>
            <i style={{ fontSize: 35 }}>Greetings!</i>
          </b>{" "}
          My name is AJ. Welcome to my digital abode.
        </p>
        <p className="blurb">
          <span className="topBlurbChunk">
            My big interests are programming, exercise (i.e., weightlifting,
            hiking, running, etc), and reading non-fiction with respect to
            self-improvement, international relations, psychology, and mythology
            among others. programming, creative writing, non-fiction literature,
            hanging with friends when time-affordable, film, and nature make up
            the bulk of my interests. The first four take up most of my time
            these days.
          </span>{" "}
          <br /> <br />
          <span className="textChunk">
            I have recently started a blog that I have been kicking myself to
            start for the past couple of years. Feel free to check it out
            (here)[]. Growing up, I played (nearly) every sport under the sun.
            Football stuck with me the longest. I finished my 15-year career at
            Hobart College as a defensive lineman.
          </span>
          <br />
          <br />
          <span className="bottomHeaderChunk">
            When I'm not working, you can typically find me at the gym or
            Starbucks.
          </span>
        </p>
        <p>
          "The man who says he can, and the man who says he can not.. Are both
          correct"
          <br />- Confucius
        </p>
        <p>
          "It is better to be a warrior in a garden, than a gardener in war."
          <br />- Unknown
        </p>
        <p>
          "Eighty percent of success is showing up."
          <br />- Woody Allen
        </p>
      </div>
    </div>
  );
};

export default HomePageHeader;
