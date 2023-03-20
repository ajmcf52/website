import React from "react";
import { getContent } from "./ContentFactory";
import { tabStrBuilder } from "./TabFactory";
import { SUBTAB_STR, ProfileBackgroundColor } from "../Constants";
import { createStyles, Tabs, Tab, AppBar } from "@material-ui/core";

/**
 * Factory responsible for generating PlainPanels and TabbedPanels.
 */

const styling = createStyles({
  plainPanel: {
    flexDirection: "column",
    marginLeft: "15px",
    paddingRight: "-10vw",
    overflowWrap: "normal",
    maxWidth: "90%",
    textAlign: "left",
    overflow: "scroll"
  },
  tabbedPanelStack: {
    marginLeft: "15px"
  },
  tabbedPanels: {
    backgroundColor: ProfileBackgroundColor
  }
});

export const getPanelComponent = (tabContent, section) => {
  if (tabContent && tabContent[section] && tabContent[section].sections) {
    //return a TabbedPanel
    return <TabbedPanel sections={tabContent} currentSection={section} />;
  } else {
    //return a PlainPanel
    return <PlainPanel sections={tabContent} currentSection={section} />;
  }
};

/**
 * PlainPanel functional component.
 * Returns a basic panel component or a Material UI style component.
 * I use Material UI to implement sub tabbing, as react-web-tabs doesn't offer horizontal tabs.
 */
function PlainPanel(props) {
  const { sections, currentSection, value, index, tabStr } = props;
  //used to return a basic panel

  if (
    sections &&
    sections[currentSection] &&
    sections[currentSection].content &&
    !tabStr
  ) {
    return (
      <div style={styling.plainPanel}>
        {getContent(sections[currentSection].content)}
      </div>
    );
  } //used to return material-ui style panel
  else if (
    sections &&
    sections[currentSection] &&
    sections[currentSection].content
  ) {
    return (
      <div
        style={{
          display: index === value ? "flex" : "none",
          ...styling.plainPanel
        }}
        {...panelPropHelper(index, tabStr)}
      >
        {getContent(sections[currentSection].content)}
      </div>
    );
  } else {
    return null;
  }
}

/**
 * A functional TabbedPanel component.
 * Used when subtabs are needed on a panel component.
 */
function TabbedPanel(props) {
  const { sections, currentSection } = props;

  const [tab, setTab] = React.useState(0);
  const handleChange = (evt, newTab) => {
    setTab(newTab);
  };

  if (sections && sections[currentSection]) {
    return (
      <div style={styling.tabbedPanels}>
        <AppBar
          position="static"
          style={{
            backgroundColor: ProfileBackgroundColor,
            borderBottomRightRadius: "20px"
          }}
        >
          <Tabs value={tab} onChange={handleChange} aria-label="subtabs">
            {getPanelTabs(sections, currentSection, SUBTAB_STR)}
          </Tabs>
        </AppBar>
        {getPanelStack(sections, currentSection, SUBTAB_STR, tab)}
      </div>
    );
  } else {
    return null;
  }
}

/*
Used to generate tabs for a tabbed panel.
The following properties must be set:
• id
• aria-controls
• label
*/
export const getPanelTabs = (sections, currentSection, tabStr) => {
  return Object.keys(sections[currentSection].content).map(
    (subsection, index) => {
      return (
        <Tab
          style={{ color: "black" }}
          label={subsection}
          {...tabPropHelper(index, tabStr)}
        />
      );
    }
  );
};

/**
 * Generates tab props for Material UI style control.
 */
const tabPropHelper = (index, tabStr) => {
  const str = tabStrBuilder(tabStr, index);
  return {
    id: str,
    "aria-controls": `${str}-panel`
  };
};

/**
 * Generates panel props for Material UI style control.
 */
const panelPropHelper = (index, tabStr) => {
  const str = tabStrBuilder(tabStr, index);
  return {
    id: str.concat("-panel"),
    "aria-labelledby": str
  };
};

/**
 * Generates a stack of Material UI PlainPanels.
 */
const getPanelStack = (sections, currentSection, tabStr, value) => {
  return Object.keys(sections[currentSection].content).map((section, index) => {
    return (
      <PlainPanel
        sections={sections[currentSection].content}
        currentSection={section}
        value={value}
        index={index}
        tabStr={tabStr}
      />
    );
  });
};
