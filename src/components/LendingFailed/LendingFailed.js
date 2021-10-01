import React, { useEffect, useState } from "react";
import "./lendingfailed.css";
import clsx from "clsx";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";

function LendingFailed(props) {
  const [comment, setComment] = useState();
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
        backgroundColor: "transparent",
      },
    },
    checkboxicon: {
      borderRadius: 5,
      borderColor: "#ac172c",
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
        width: 25,
        height: 25,
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
      setLenderFailedToArrive("Borrower Has Failed To Arrive");
    else setLenderFailedToArrive("");
  };
  //when lender refuses to give the item
  const handleLenderRefusal = () => {
    if (lenderRefuse === "") setLenderRefuse("Borrower refuses to return item");
    else setLenderRefuse("");
  };
  //when lender has emergency to attend
  const handleLenderEmergency = () => {
    if (lenderEmergency === "")
      setLenderEmergency("Borrower had an emergency to attend");
    else setLenderEmergency("");
  };
  //for unknown reason
  const handleUnknownReason = () => {
    if (unknownReason === "") setUnknownReason("Unknown Reason");
    else setUnknownReason("");
  };
  //for other reason
  const handleOther = () => {
    if (other === "") setOther("Other");
    else setOther("");
  };

  const classes = useStyles();

  return (
    <div className="BorrowerMain">
      <div className="BorrowerHeaderContent">
        <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
          Lending Failed
        </div>
        <div>
          <IconButton aria-label="delete" className={classes.button}>
            <Close className={classes.icon} />
          </IconButton>
        </div>
      </div>
      <div className="BorrowerHeader">Fail Reason :&nbsp;</div>
      <div className="BorrowerText" style={{ marginTop: "-.5%" }}>
        Why has your borrow failed?
      </div>
      {/* LENDER HAS FAILED TO ARRIVE */}
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
        <div>Borrower Has Failed To Arrive</div>
      </div>
      {/* LENDER REFUSES TO GIVE THE ITEM */}
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
        <div>Borrower refuses to return item </div>
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
        <div>Borrower had an emergency to attend </div>
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
        <div>Unknown Reason </div>
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
        <div>Other</div>
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
            console.log("Checked ->", lenderFailedToArrive);
            console.log("Checked ->", lenderRefuse);
            console.log("Checked ->", lenderEmergency);
            console.log("Checked ->", unknownReason);
            console.log("Checked ->", other);
          }}
          style={{ width: "auto" }}
        >
          <div className="ItemButtonFlex">Submit Report</div>
        </button>
      </div>
    </div>
  );
}

export default LendingFailed;
