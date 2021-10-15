import React from "react";
import "./bannerText.css";

export default function bannerText(props) {
  return (
    <div className="Banner">
      <div className="BannerText">
        {props.textBold}
        <span className="BannerTextNormal">
          &nbsp;-&nbsp;{props.textNormal}
        </span>
      </div>
      {props.button ? (
        <button
          className="editButton"
          style={{ width: "15%", marginLeft: "30%" }}
          onClick={() => {
            props.buttonClick();
          }}
        >
          {props.button}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
