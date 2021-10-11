import React from "react";

import { ReactComponent as Logo } from "./../../assets/Logos/LogoRed.svg";

function BorrowCancelled(props) {
  return (
    <div className="LoginMain centeredContent ">
      <Logo />
      <div className="LoginHeader ">Borrow Cancelled</div>
      <div className="LoginText">
        Your borrow has now been cancelled. You will receive 80% of your initial
        deposit to the bank details provided to Little Big Shed.
      </div>
      <button
        className="LoginFormButton"
        style={{ marginBottom: "2%" }}
        onClick={() => {
          console.log("Continue Button Clicked!");
        }}
      >
        <div className="ItemButtonFlex">Continue</div>
      </button>
    </div>
  );
}

export default BorrowCancelled;
