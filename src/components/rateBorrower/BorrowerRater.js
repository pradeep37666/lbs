import React, { useState } from "react";
import "./Borrower.css";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";

function BorrowerRater(props) {
  const [comment, setComment] = useState();
  const [Rating, setRating] = useState();

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

  return (
    <div className="BorrowerMain">
      <div className="BorrowerHeaderContent">
        <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
          Rate Experience
        </div>

        <div>
          <IconButton aria-label="delete" className={classes.button}>
            <Close className={classes.icon} />
          </IconButton>
        </div>
      </div>
      <div className="BorrowerText">
        Here, You can use this component to give ratings and to comment out the
        experience you had during the borrowing session!
      </div>
      <div className="BorrowerHeader">
        Borrower Rating :&nbsp;
        <div className="RatingFilterHeader">
          {Rating} Star{Rating === 1 ? "" : "s"}
        </div>
      </div>
      <div className="BorrowerStarsFlex">
        <StarFilled
          className="BorrowerStarIcon StarClick"
          fill="#E9D8B4"
          onClick={() => setRating(1)}
        />
        {Rating >= 2 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setRating(2)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setRating(2)}
          />
        )}
        {Rating >= 3 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setRating(3)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setRating(3)}
          />
        )}
        {Rating >= 4 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setRating(4)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setRating(4)}
          />
        )}
        {Rating >= 5 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setRating(5)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setRating(5)}
          />
        )}
      </div>
      <div style={{ width: "100%" }}>
        <span class="BorrowerRatingText ">&nbsp;Click Your Desired Rating</span>
      </div>

      {/* Item Description */}
      <div className="BorrowerHeader">Borrower Comments</div>
      <textarea
        rows="10"
        maxLength="254"
        defaultValue={props.BorrowerRating}
        className="LoginInput PostItem__TextArea"
        onChange={(e) => setComment(e.target.value)}
      />
      {/* Submit Borrower Review Button */}
      <div className="ItemButtons" style={{ justifyContent: "center" }}>
        <button
          className="SearchButtonLarge"
          onClick={() => props.handleClick()}
          style={{ width: "auto" }}
        >
          <div className="ItemButtonFlex">Submit Review</div>
        </button>
      </div>
    </div>
  );
}

export default BorrowerRater;
