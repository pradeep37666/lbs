import React from "react"
import "./bannerText.css"
import { CircularProgress } from "@material-ui/core"
import { HiChevronLeft } from 'react-icons/hi'
import { REGISTER_PAGES } from "../../assets/Data/LBSEnum";

export default function bannerText({ 
  textBold, 
  textNormal, 
  button, 
  buttonClick, 
  buttonLoading,
  prevPage,
}) {
  return (
    <div className="Banner">
      {(prevPage && prevPage !== REGISTER_PAGES.COMPLETE) &&
      <HiChevronLeft 
        onClick={() => prevPage()}
        className='BannerBackBtn'
      />
      }
      <div className="BannerText">
        {textBold}
        <span className="BannerTextNormal">
          &nbsp;-&nbsp;{textNormal}
        </span>
      </div>
      {button ? (
        buttonLoading ? (
          <div style={{ width: '15%', marginLeft: '30%'}}>
            <CircularProgress color="inherit" />
          </div>
        ): (
          <button
          className="editButton"
          style={{ width: "15%", marginLeft: "30%" }}
          onClick={() => buttonClick()}
          >
            {button}
          </button>
        )
      ) : null
      }
    </div>
  );
}
