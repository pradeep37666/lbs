import React, { useState } from "react";
import "./rateLender.css";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";

function LenderRater(props) {
  const [comment, setComment] = useState("");
  const [lenderRating, setLenderRating] = useState();
  const [productRating, setProductRating] = useState();

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
          Trade Complete
        </div>

        <div>
          <IconButton aria-label="delete" className={classes.button}>
            <Close className={classes.icon} />
          </IconButton>
        </div>
      </div>
      {/* Lender Rating Div */}
      <div className="BorrowerHeader">
        Lender Rating:&nbsp;
        <div className="RatingFilterHeader">
          {lenderRating} Star{lenderRating === 1 ? "" : "s"}
        </div>
      </div>
      <div className="BorrowerStarsFlex">
        <StarFilled
          className="BorrowerStarIcon StarClick"
          fill="#E9D8B4"
          onClick={() => setLenderRating(1)}
        />
        {lenderRating >= 2 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(2)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setLenderRating(2)}
          />
        )}
        {lenderRating >= 3 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(3)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setLenderRating(3)}
          />
        )}
        {lenderRating >= 4 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(4)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setLenderRating(4)}
          />
        )}
        {lenderRating >= 5 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(5)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setLenderRating(5)}
          />
        )}
      </div>
      <div style={{ width: "100%" }}>
        <span class="BorrowerRatingText ">
          &nbsp;Drag your finger across the stars for the desired rating.
        </span>
      </div>

      {/* Product Rating Div  */}
      <div className="BorrowerHeader">
        Product Rating:&nbsp;
        <div className="RatingFilterHeader">
          {productRating} Star{productRating === 1 ? "" : "s"}
        </div>
      </div>
      <div className="BorrowerStarsFlex">
        <StarFilled
          className="BorrowerStarIcon StarClick"
          fill="#E9D8B4"
          onClick={() => setProductRating(1)}
        />
        {productRating >= 2 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setProductRating(2)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setProductRating(2)}
          />
        )}
        {productRating >= 3 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setProductRating(3)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setProductRating(3)}
          />
        )}
        {productRating >= 4 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setProductRating(4)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setProductRating(4)}
          />
        )}
        {productRating >= 5 ? (
          <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setProductRating(5)}
          />
        ) : (
          <StarOutline
            className="BorrowerStarIcon StarClick"
            onClick={() => setProductRating(5)}
          />
        )}
      </div>
      <div style={{ width: "100%" }}>
        <span class="BorrowerRatingText ">
          &nbsp;Drag your finger across the stars for the desired rating.
        </span>
      </div>

      {/* Item Description */}
      <div className="BorrowerHeader">Borrower Comments</div>
      <textarea
        rows="10"
        maxLength="254"
        placeholder={"Your comments about the Borrowing Experience."}
        defaultValue={props.BorrowerRating}
        className="LoginInput PostItem__TextArea"
        onChange={(e) => setComment(e.target.value)}
      />
      {/* Submit Borrower Review Button */}
      <div className="ItemButtons" style={{ justifyContent: "center" }}>
        <button
          className="SearchButtonLarge"
          onClick={() => {
            // props.handleClick();
            console.log("Lender Rating => ", lenderRating);
            console.log("Product Rating ->", productRating);
            console.log("Details -", comment);
          }}
          style={{ width: "auto" }}
        >
          <div className="ItemButtonFlex">Submit Review</div>
        </button>
      </div>
    </div>
  );
}

export default LenderRater;
