import React, { useState } from "react";
import { CircularProgress, DialogContent, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";
import Instance from "../../util/axios";
import useGlobalState from "../../util/useGlobalState";
import { Dialog } from "@material-ui/core";

function ReviewLender({ onClick, isLender, booking, open }) {
  const { state } = useGlobalState()
  const { user } = state
  const [comment, setComment] = useState("");
  const [lenderRating, setLenderRating] = useState(5);
  const [productRating, setProductRating] = useState(5)
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

  const submitReview = async () => {
    setIsLoading(true)
    try{
        const res = await Instance.post('/lenderRating/save',{
            b_id: user.id,
            l_id: booking.io_id,
            rating: lenderRating
        })
        console.log('rating', res)
        const { data, status } = await Instance.post('/comments/save',{
            i_id: booking.i_id,
            content: comment,
            rating: productRating
        })
        console.log(data, status)
        await updateBookingStatus(8)
    } catch(err){
        console.log(err)
    } finally{
        setIsLoading(false)
        onClick()
    }

  }
  
  const updateBookingStatus = async (newStatus) => {
    try{
        const newBooking = {b_id: booking.b_id, status: newStatus}
        const { data, status} = await Instance.put('/booking/update', newBooking)
        console.log(data,status)
        if(status === 200){
            // setStatus(newStatus)
            // getBookings()
        }
    } catch(err) {
        console.log(err)
    }
    
}

  const renderLenderStars = () => {
      const starArray = new Array(5).fill(null)
      return starArray.map(( item, index) => {
          if(index + 1 <= lenderRating){
            return <StarFilled
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(index + 1)}
            /> 
          } else {
            return <StarOutline
            className="BorrowerStarIcon StarClick"
            fill="#E9D8B4"
            onClick={() => setLenderRating(index + 1)}
            /> 
          }
          
      })
  }

  const renderProductStars = () => {
    const starArray = new Array(5).fill(null)
    return starArray.map(( item, index) => {
        if(index + 1 <= productRating){
          return <StarFilled
          className="BorrowerStarIcon StarClick"
          fill="#E9D8B4"
          onClick={() => setProductRating(index + 1)}
          /> 
        } else {
          return <StarOutline
          className="BorrowerStarIcon StarClick"
          fill="#E9D8B4"
          onClick={() => setProductRating(index + 1)}
          /> 
        }
    })
  }
  const classes = useStyles()

  return (
      <Dialog 
      onClose={onClick}
      open={open}>
        <DialogContent className="BorrowerMain">
            <div className="BorrowerHeaderContent">
                <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
                    Trade Complete
                </div>
                <IconButton aria-label="delete" className={classes.button} onClick={onClick}>
                    <Close className={classes.icon} />
                </IconButton>
                
            </div>
            <div className="BorrowerHeader">
                Lender Rating
            </div>
            <div className="BorrowerStarsFlex" style={{ paddingTop: 15}}>
                
                { renderLenderStars() }
            </div>
            <div className="BorrowerHeader">
                Product Rating
            </div>
            <div className="BorrowerStarsFlex" style={{ paddingTop: 15}}>
                { renderProductStars() }
            </div>
            <div className="BorrowerHeader">Product Comments</div>
            <textarea
            rows="10"
            maxLength="254"
            placeholder={`Your comments on the item.`}
            value={comment}
            className="LoginInput PostItem__TextArea"
            onChange={(e) => setComment(e.target.value)}
            />
            <div className="ItemButtons" style={{ justifyContent: "center" }}>
                { isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <button
                    className="SearchButtonLarge"
                    onClick={submitReview}
                    style={{ width: "auto" }}
                    >
                        <div className="ItemButtonFlex">Submit Review</div>
                    </button>
                )}
            </div>
        </DialogContent>
      </Dialog>
    
  );
}

export default ReviewLender;
