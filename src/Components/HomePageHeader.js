import React from "react";
import "./css/HomePageHeader.css";

const HomePageHeader = () => {
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
            hiking, running, etc), non-fiction books, writing, international
            relations, and mythology. With writing, I enjoy creating mostly
            prose and poetry. When time and responsibility afford it, I enjoy
            hanging with friends, watching films, and getting outside.
          </span>{" "}
          <br /> <br />
          <span className="textChunk">
            If you are interested in checking out some of my software projects,{" "}
            <b>
              feel free to give them a look <a href="#top">here</a>.
            </b>
          </span>
          <br />
          <br />
          <span className="textChunk">
            For the past two years, I have been kicking myself to start a blog.
            I finally did it. You might find it interesting. Take a look{" "}
            <a href="#top">here</a>.
          </span>
          <br />
          <br />
          <span className="textChunk">
            I've kept note of the books I've read over the past couple years, as
            well as books I'm currently reading and plan on reading. If you
            care, you can see a list of these <a href="#top">here</a>.
          </span>
        </p>
        <div className="quotes">
          <p className="singleQuote">
            "The man who says he can, and the man who says he can not.. Are both
            correct"
          </p>
          <p className="singleQuote quoteAuthor">- Confucius</p>
          <p className="singleQuote">
            "It is better to be a warrior in a garden, than a gardener in war."
          </p>
          <p className="singleQuote quoteAuthor">- Unknown</p>
          <p className="singleQuote">
            "Eighty percent of success is showing up."
          </p>
          <p className="singleQuote quoteAuthor">- Woody Allen</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
