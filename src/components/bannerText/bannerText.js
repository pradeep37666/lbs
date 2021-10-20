import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./bannerText.css";

export default function bannerText({ textBold, textNormal, button, buttonClick, buttonLoading }) {
  return (
    <div className="Banner">
      <div className="BannerText">
        {textBold}
        <span className="BannerTextNormal">
          &nbsp;-&nbsp;{textNormal}
        </span>
      </div>
      {button &&
        buttonLoading ? (
          <div style={{ width: '15%', marginLeft: '30%'}}>
            <CircularProgress color="inherit" />
          </div>
          
        ): (
          <button
          className="editButton"
          style={{ width: "15%", marginLeft: "30%" }}
          onClick={() => {
            buttonClick();
          }}
        >
          {button}
        </button>
        )
      }
    </div>
  );
}
