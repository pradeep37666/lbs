import React, { useState } from "react";
import "./ReviewBorrower.css";
import { CircularProgress, Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";
import Instance from "../../util/axios";
import useGlobalState from "../../util/useGlobalState";

function ReviewBorrower({ onClick, isLender, booking, open }) {
  const { state } = useGlobalState()
  const { user } = state
  const [comment, setComment] = useState("");
  const [borrowerRating, setBorrowerRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false)

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
  });

  const classes = useStyles();

  const reviewBorrower = async () => {
    setIsLoading(true)
    try{
      const { data, status } = await Instance.post('/borrowerRating/save', {
          b_id: booking.u_id,
          l_id: user.id,
          rating: borrowerRating
      })
      console.log(data, status)
    } catch(err) {
      console.log(err)
    } finally{
      setIsLoading(false)
      onClick()
    }
  }
  return (
    <Dialog 
    onClose={onClick}
    open={open}>
      <DialogContent className="BorrowerMain">
        <div className="BorrowerHeaderContent">
          <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
            Rate Borrower
          </div>

          <div onClick={onClick}>
            <IconButton aria-label="delete" className={classes.button}>
              <Close className={classes.icon} />
            </IconButton>
          </div>
        </div>
        <div className="BorrowerText">
          Here, You can give ratings to the Borrower also, you can comment the
          details about the Borrower and the { isLender ? 'Borrowing' : 'Lending'} experience.
        </div>
        <div className="BorrowerHeader">
        Borrower Rating :&nbsp;
          <div className="RatingFilterHeader">
            {borrowerRating} Star{borrowerRating === 1 ? "" : "s"}
          </div>
        </div>
        <div className="BorrowerStarsFlex">
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setBorrowerRating(1)}
          />
          {borrowerRating >= 2 ? (
            <StarFilled
              className="BorrowerStarIcon StarClick"
              fill="#E9D8B4"
              onClick={() => setBorrowerRating(2)}
            />
          ) : (
            <StarOutline
              className="BorrowerStarIcon StarClick"
              onClick={() => setBorrowerRating(2)}
            />
          )}
          {borrowerRating >= 3 ? (
            <StarFilled
              className="BorrowerStarIcon StarClick"
              fill="#E9D8B4"
              onClick={() => setBorrowerRating(3)}
            />
          ) : (
            <StarOutline
              className="BorrowerStarIcon StarClick"
              onClick={() => setBorrowerRating(3)}
            />
          )}
          {borrowerRating >= 4 ? (
            <StarFilled
              className="BorrowerStarIcon StarClick"
              fill="#E9D8B4"
              onClick={() => setBorrowerRating(4)}
            />
          ) : (
            <StarOutline
              className="BorrowerStarIcon StarClick"
              onClick={() => setBorrowerRating(4)}
            />
          )}
          {borrowerRating >= 5 ? (
            <StarFilled
              className="BorrowerStarIcon StarClick"
              fill="#E9D8B4"
              onClick={() => setBorrowerRating(5)}
            />
          ) : (
            <StarOutline
              className="BorrowerStarIcon StarClick"
              onClick={() => setBorrowerRating(5)}
            />
          )}
        </div>
        <div style={{ width: "100%" }}>
          <span class="BorrowerRatingText ">&nbsp;Click Your Desired Rating</span>
        </div>
        <div className="ItemButtons" style={{ justifyContent: "center", minHeight: "4rem" }}>
          { isLoading ? (
            <CircularProgress color="inherit"/>
          ) : (
            <button
            className="SearchButtonLarge"
            onClick={reviewBorrower}
            style={{ width: "auto", marginTop: '1.5rem' }}
            >
              <div className="ItemButtonFlex">Submit Rating</div>
            </button>
          )}
        </div>
        </DialogContent>
      </Dialog>
    
  );
}


export default ReviewBorrower;
