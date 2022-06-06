import React, { useEffect, useState } from "react";
import "./TradeFailed.css";
import clsx from "clsx";
import { CircularProgress, Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Instance from '../../../util/axios'
import userEvent from "@testing-library/user-event";
import useGlobalState from "../../../util/useGlobalState";

function TradeFailed({ onClick, isLender, open, booking, getBookings, setReportModalVisible }) {
  const { state } = useGlobalState()
  const { user } = state
  const REASONS = {
    ARRIVALFAILURE: `${isLender ? 'Borrower' : 'Lender'} Has Failed To Arrive`,
    REFUSAL: `${isLender ? 'Borrower' : 'Lender'} refuses to give item`,
    EMERGENCY: `${ isLender ? 'Borrower' : 'Lender'} had an emergency to attend`,
    UNKNOWN: `Unknown Reason`,
    OTHER: "Other",
  };
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("Arrival");

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

  const submitReport = async () => {
    setIsLoading(true)
    try{
      const { data, status } = await Instance.post('/report', {
        b_id: booking.b_id,
        reason,
        detail: comment,
        ro_id: user.id
      })
      await updateBookingStatus(0)
      setReportModalVisible(false)
    } catch(err){
      console.log(err)
    } finally {
      setIsLoading(false)
      
    }
  }
  const classes = useStyles();

  const updateBookingStatus = async (newStatus) => {
    try{
        const newBooking = {b_id: booking.b_id, status: newStatus}
        const { data, status} = await Instance.put('/booking/update', newBooking)
        console.log(data,status)
        if(status === 200){
            // setStatus(newStatus)
            getBookings()
        }
    } catch(err) {
        console.log(err)
    }
    
}

  return (
    <Dialog
    open={open}
    onClose={onClick}
    >
      <DialogContent className="BorrowerMain" >
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
              checked={reason === 'Arrival'}
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={() => setReason('Arrival')}
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
              checked={ reason === "Refusal"}
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={() => setReason("Refusal")}
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
              checked={ reason === "Emergency" }
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={() => setReason("Emergency")}
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
              checked={ reason === 'Unknown'}
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={() => setReason("Unknown")}
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
              checked={ reason === "Other" }
              color="default"
              checkedIcon={
                <span className={clsx(classes.checkboxicon, classes.checkedIcon)} />
              }
              onChange={() => setReason("Other")}
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

            { isLoading ? (
              <CircularProgress color="inherit"/>
            ) : (
              <button
              className="SearchButtonLarge"
              onClick={submitReport}
              style={{ width: "auto" }}
              >
                <div className="ItemButtonFlex">Submit Report</div>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
  );
}

export default TradeFailed;
