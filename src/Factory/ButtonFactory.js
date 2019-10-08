import React from "react";

import { createStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";

import { SmallIconColor } from "../Constants";

const visitPage = url => {
  window.location = url;
};

const mailReq = address => {
  window.open("mailto:".concat(address));
};

const download = url => {
  const link = document.createElement("a");
  link.href = url;
  link.download = url.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateButtons = (styles: any, buttonData: any) => {
  return Object.keys(buttonData).map(button => {
    const clickEvt = btnObj => {
      switch (btnObj.type) {
        case "email":
          return mailReq(btnObj.email);
        case "link":
          return visitPage(btnObj.link);
        case "download":
          return download(btnObj.download);
        default:
          return null;
      }
    };
    return (
      <IconButton
        onClick={() => {
          clickEvt(buttonData[button]);
        }}
      >
        <img
          src={buttonData[button].path}
          alt={buttonData[button].alt}
          className={styles.smallIcon}
        />
      </IconButton>
    );
  });
};
