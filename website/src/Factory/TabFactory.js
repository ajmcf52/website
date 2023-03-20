import React from "react";
import { Tab, TabList, TabPanel } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import { createStyles } from "@material-ui/styles";
import { getPanelComponent } from "./PanelFactory";

/**
 * Factory responsible for generating top-level tab menus.
 * Subtabs are handled in PanelFactory to avoid { Tab } import conflicts between rwt and material-ui.
 */

const styles = createStyles({
  vertTabTxt: {
    fontWeight: "bold",
    display: "inline",
    padding: "-20px",
    overflowWrap: "normal"
  },
  panelStack: {
    marginLeft: "-15px"
  },
  listTab: {
    display: "inline-block",
    textAlign: "left",
    width: "auto",
    overflowWrap: "normal"
  },
  tabList: {
    position: "relative"
  },
  tabContainer: {
    maxWidth: "42%"
  }
});

export const getTabMenu = (tabs, currentTab, tabStr) => {
  if (tabs && tabs[currentTab] && tabs[currentTab].sections) {
    //only return a TabList if necessary

    return (
      <div style={styles.tabContainer}>
        <TabList style={styles.tabList}>
          {Object.keys(tabs[currentTab].content).map((section, index) => {
            return (
              <Tab style={styles.listTab} tabFor={tabStrBuilder(tabStr, index)}>
                <p style={styles.vertTabTxt}>{section}</p>
              </Tab>
            );
          })}
        </TabList>
      </div>
    );
  } else {
    return null;
  }
};

export const getTabPanels = (tabs, currentTab, tabStr) => {
  if (tabs && tabs[currentTab] && tabs[currentTab].sections) {
    return (
      <div style={styles.panelStack}>
        {Object.keys(tabs[currentTab].content).map((section, index) => {
          return (
            <TabPanel
              tabId={tabStrBuilder(tabStr, index)}
              render={({ selected }) =>
                selected
                  ? getPanelComponent(tabs[currentTab].content, section)
                  : null
              }
            />
          );
        })}
      </div>
    );
  } else {
    return getPanelComponent(tabs, currentTab);
  }
};

export const tabStrBuilder = (str, index) => {
  return str.concat("-", index.toString(10));
};
