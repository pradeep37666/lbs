import React, { useEffect, useState } from "react";
import "./TradeFailed.css";
import clsx from "clsx";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";

function TradeFailed({ onClick, isLender }) {
  const REASONS = {
    ARRIVALFAILURE: `${isLender ? 'Borrower' : 'Lender'} Has Failed To Arrive`,
    REFUSAL: `${isLender ? 'Borrower' : 'Lender'} refuses to give item`,
    EMERGENCY: `${ isLender ? 'Borrower' : 'Lender'} had an emergency to attend`,
    UNKNOWN: `Unknown Reason`,
    OTHER: "Other",
  };

  const [comment, setComment] = useState("");
  //states for the reason to borrow failure
  const [lenderFailedToArrive, setLenderFailedToArrive] = useState("");
  const [lenderRefuse, setLenderRefuse] = useState("");
  const [lenderEmergency, setLenderEmergency] = useState("");
  const [unknownReason, setUnknownReason] = useState("");
  const [other, setOther] = useState("");

  const useStyles = makeStyles({
    button: {
      backgroundColor: "#B43B4C",
      "&:hover": {
        backgroundColor: "#cf3247",
      },
    },
    icon: {
      color: "#FFF",
    },
    buttonDelete: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 40,
      height: 40,
      backgroundColor: "#B43B4C",
      "&:hover": {
        backgroundColor: "#cf3247",
      },
    },
    root: {
      "&:hover": {
        backgroundColor: "#ac171787",
      },
    },
    checkboxicon: {
      borderRadius: 5,
      border: "1px solid #ac172c",
      width: 25,
      height: 25,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "$root.Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    },
    checkedIcon: {
      backgroundColor: "#ac172c",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 23,
        height: 23,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#ac172c",
      },
    },
  });

  //event for checkbox
  //when lender fails to arrive
  const handleLenderFailedToArrive = () => {
    if (lenderFailedToArrive === "")
      setLenderFailedToArrive(REASONS.ARRIVALFAILURE);
    else setLenderFailedToArrive("");
  };
  //when lender refuses to give the item
  const handleLenderRefusal = () => {
    if (lenderRefuse === "") setLenderRefuse(REASONS.REFUSAL);
    else setLenderRefuse("");
  };
  //when lender has emergency to attend
  const handleLenderEmergency = () => {
    if (lenderEmergency === "") setLenderEmergency(REASONS.EMERGENCY);
    else setLenderEmergency("");
  };
  //for unknown reason
  const handleUnknownReason = () => {
    if (unknownReason === "") setUnknownReason(REASONS.UNKNOWN);
    else setUnknownReason("");
  };
  //for other reason
  const handleOther = () => {
    if (other === "") setOther(REASONS.OTHER);
    else setOther("");
  };

  const classes = useStyles();

  return (
    <div className="ApplicationModalWrapper" onClick={onClick}>
        <div className="BorrowerMain" onClick={(e) => e.stopPropagation() }>
          <div className="BorrowerHeaderContent">
            <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
              {isLender ? "Lend Failed" : "Borrow Failed" }
            </div>
            <div onClick={onClick}>
              <IconButton aria-label="delete" className={classes.button}>
                <Close className={classes.icon} />
              </IconButton>
            </div>
          </div>
          <div className="BorrowerHeader">Fail Reason :&nbsp;</div>
          <div className="BorrowerText" style={{ marginTop: "-.5%" }}>
            Why has your {isLender ? "Lend" : "Borrow"} failed?
          </div>
          <div className="CheckboxFlex">
            <Checkbox
              className={classes.root}
              disableRipple
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={handleLenderFailedToArrive}
              icon={<span className={classes.checkboxicon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
            />
            <div>{REASONS.ARRIVALFAILURE}</div>
          </div>
          <div className="CheckboxFlex">
            <Checkbox
              className={classes.root}
              disableRipple
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={handleLenderRefusal}
              icon={<span className={classes.checkboxicon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
            />
            <div>{REASONS.REFUSAL}</div>
          </div>
          {/* LENDER HAS EMERGENCY TO ATTEND */}
          <div className="CheckboxFlex">
            <Checkbox
              className={classes.root}
              disableRipple
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={handleLenderEmergency}
              icon={<span className={classes.checkboxicon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
            />
            <div>{REASONS.EMERGENCY}</div>
          </div>
          {/* UNKNOWN REASON */}
          <div className="CheckboxFlex">
            <Checkbox
              className={classes.root}
              disableRipple
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={handleUnknownReason}
              icon={<span className={classes.checkboxicon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
            />
            <div>{REASONS.UNKNOWN}</div>
          </div>
          {/* OTHER */}
          <div className="CheckboxFlex">
            <Checkbox
              className={classes.root}
              disableRipple
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={handleOther}
              icon={<span className={classes.checkboxicon} />}
              inputProps={{ "aria-label": "decorative checkbox" }}
            />
            <div>{REASONS.OTHER}</div>
          </div>
          {/* Extra Details*/}
          <div className="BorrowerHeader">Extra Details</div>
          <textarea
            rows="10"
            maxLength="254"
            placeholder="Extra Details to why the Borrow Failed."
            className="LoginInput PostItem__TextArea"
            onChange={(e) => setComment(e.target.value)}
          />
          {/* Submit Borrower Review Button */}
          <div className="ItemButtons" style={{ justifyContent: "center" }}>
            <button
              className="SearchButtonLarge"
              onClick={() => {
                //  props.handleClick();
                console.log("Extra Details ->", comment);
                console.log(
                  "Reasons for Borrow Failure ->",
                  lenderFailedToArrive,
                  lenderRefuse,
                  lenderEmergency,
                  unknownReason,
                  other
                );
              }}
              style={{ width: "auto" }}
            >
              <div className="ItemButtonFlex">Submit Report</div>
            </button>
          </div>
        </div>
    </div>
  );
}

export default TradeFailed;
