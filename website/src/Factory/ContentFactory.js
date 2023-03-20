import React from "react";
import { Tabs } from "react-web-tabs";
import { createStyles } from "@material-ui/styles";
import { getTabMenu, getTabPanels } from "./TabFactory";

import AboutMeText from "../Config/aboutme.txt";
// const fs = require("fs");
/*
Factory responsible for computing and returning actual
raw content that will appear on panels.
*/

const delims = {
  title: "t",
  plain: "p",
  list: "h",
  link: "l",
  compound: "c",
  textfile: "textfile",
};

const styles = createStyles({
  plainTxt: {
    overflowWrap: "normal",
  },
  linkTxt: {
    overflowWrap: "normal",
    display: "inline",
  },
  titleTxt: {
    fontFamily: "Courier New, Courier, monospace",
  },
  titleBox: {
    marginTop: "15px",
    marginLeft: "15px",
  },
  contentBox: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  headerTxt: {
    fontWeight: "bold",
  },
  listStyling: {
    listStyleType: "none",
  },
  listBox: {
    marginTop: "2%",
    marginLeft: "2%",
  },
  plainPanel: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
});

export const getInfoCardContent = (tabs, currentTab, tabStr) => {
  /*
	Used to return a TabMenu, along with a stack of TabbedPanels and PlainPanels.
	*/
  if (tabs && tabs[currentTab] && tabs[currentTab].sections) {
    return (
      <div>
        <Tabs vertical defaultTab={tabStr.concat("-", "0")}>
          {getTabMenu(tabs, currentTab, tabStr)}
          {getTabPanels(tabs, currentTab, tabStr)}
        </Tabs>
      </div>
    );
  } else if (tabs && tabs[currentTab]) {
    /*
	Typically used to return a single PlainPanel.
	*/
    return getTabPanels(tabs, currentTab, tabStr);
  } else {
    return null;
  }
};

/**
 * Retrieves text styling info from the config file.
 */
const getTextStyling = (content, chunk) => {
  const style = {
    display: content[chunk].inline ? "inline" : "block",
    fontWeight: content[chunk].b ? "bold" : "normal",
    fontStyle: content[chunk].i ? "italic" : "normal",
    textDecoration: content[chunk].u ? "underline" : "none",
  };
  if (content[chunk].size) style["fontSize"] = content[chunk].size;

  return style;
};

/**
 * generates text box styling for plain text containment.
 */
const getTextBoxStyling = (content, chunk) => {
  const style = {
    overflowWrap: "normal",
    marginTop: content[chunk].subheader ? "-10px" : "0px",
    paddingBottom: content[chunk].endOfHeader ? "20px" : "0px",
  };

  return style;
};

/**
 * @param content - the snippet we're working with.
 *
 * This method switches on the content delimiter,
 * returning the content in an appropriate fashion.
 */
export function getContent(content) {
  return Object.keys(content).map((chunk) => {
    switch (chunk.split("-")[0]) {
      case delims.plain:
        return getPlainText(content, chunk);

      case delims.link:
        return getLinkText(content, chunk);

      case delims.list:
        return getListText(content, chunk);

      case delims.title:
        return getTitleText(content, chunk);

      case delims.compound:
        return getCompoundElement(content, chunk);
      case delims.textfile:
        //let result = await getTextfileContents(content, chunk);
        return fetch(AboutMeText)
          .then((r) => r.text())
          .then((text) => {
            return text;
          });
      default:
        return null;
    }
  });
}

/**
 * generates plain text.
 */
const getPlainText = (content, chunk) => {
  return (
    <div style={{ ...getTextBoxStyling(content, chunk) }}>
      <p
        style={{
          ...styles.plainTxt,
          ...getTextStyling(content, chunk),
        }}>
        {content[chunk].text}
      </p>
    </div>
  );
};

/**
 * generates link text.
 */
const getLinkText = (content, chunk) => {
  return (
    <a style={styles.linkTxt} href={content[chunk].link}>
      {content[chunk].text}
    </a>
  );
};

/**
 * generates list text.
 */
const getListText = (content, chunk) => {
  return (
    <div style={styles.listBox}>
      <header style={styles.headerTxt}>{content[chunk].head}</header>
      <ul style={styles.listStyling}>
        {Object.keys(content[chunk].items).map((key) => {
          return (
            <li style={styles.listItemTxt}>{content[chunk].items[key]}</li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * generates title text.
 */
const getTitleText = (content, chunk) => {
  return (
    <div style={{ ...styles.titleBox }}>
      <p
        style={{
          ...styles.titleTxt,
          ...getTextStyling(content, chunk),
        }}>
        {content[chunk].text}
      </p>
    </div>
  );
};

/**
 * generates a <p> tag with an anchor within.
 */
const getCompoundElement = (content, chunk) => {
  return (
    <p style={{ display: "inline" }}>
      {Object.keys(content[chunk].items).map((el) => {
        //link text (return anchor)
        if (el.split("-")[0] === delims.link) {
          return getLinkText(content[chunk].items, el);
        }
        //plain text (return text)
        else {
          return content[chunk].items[el].text;
        }
      })}
    </p>
  );
};

async function getTextfileContents(content, chunk) {
  let filepath = content[chunk].path;
  let file = new File([""], filepath);
  let result = await readFileURL(file);
  return result;
}

async function readFileURL(file) {
  let result = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
  return result;
}
