import { PropTypes } from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    topLevelBox: {
      display: "inline",
    },
    featuredPicture: {
      width: "100%",
    },
    innerBox: {
      display: "flex",
    },
    blurb: {},
  });

const HomePageHeader = ({ classes }) => {
  return (
    <div className={classes.topLevelBox}>
      <img
        src="images/amor-fati.jpeg"
        alt="Amor Fati"
        className={classes.featuredPicture}
        align="left"
      />
      <div className={classes.innerBox}>
        <p className={classes.blurb}>
          Greetings! My name is AJ, and welcome to my digital abode.
          <br /> <br />
          Exercise, programming, creative writing, non-fiction literature,
          hanging with friends when time-affordable, film, and nature make up
          the bulk of my interests. The first four take up most of my time these
          days. <br />
          I have recently started a blog that I have been kicking myself to
          start for the past couple of years. Feel free to check it out
          (here)[].
          <br /> Growing up, I played every sport under the sun. Football stuck
          with me the longest. I finished my 15-year career at Hobart College as
          a defensive lineman.
          <br /> When I'm not at work, you can usually find me at the gym or at
          Starbucks, either programming or writing.
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
