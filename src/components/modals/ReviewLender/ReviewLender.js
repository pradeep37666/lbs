import React, { useState } from "react"
import { CircularProgress, DialogContent, IconButton } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import { ReactComponent as StarOutline } from "./../../../assets/Icons/StarOutline.svg"
import { ReactComponent as StarFilled } from "./../../../assets/Icons/StarFilled.svg"
import Instance from "../../../util/axios"
import { Dialog } from "@material-ui/core"
import { BOOKING_STATUSES } from "../../../assets/Data/LBSEnum"
import Button from "../../Button/Button"

function ReviewLender({ 
  setReviewModalVisible, 
  booking, 
  open,
  getBookings 
}) {
  const [ comment, setComment ] = useState('')
  const [ lenderRating, setLenderRating ] = useState(5)
  const [ productRating, setProductRating ] = useState(5)
  const [ isLoading, setIsLoading ] = useState(false)

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
  })

  const getNextItemStatus = () => {
    if (booking?.status === BOOKING_STATUSES.ITEM_RETURNED)
      return BOOKING_STATUSES.BORROWER_REVIEWED
    if (booking?.status === BOOKING_STATUSES.BORROWER_REVIEWED)
      return BOOKING_STATUSES.BOTH_REVIEWED
  }

  const submitReview = async () => {
    try{
      setIsLoading(true)
      const { status: lenderRateStatus } = await Instance.post('/lender-ratings',{
        comment: '',
        borrowerId: booking?.borrowerId,
        lenderId: booking?.lenderId,
        rating: lenderRating,
        bookingId: booking?.id,
      })
      const { status:itemStatus } = await Instance.post('/item-ratings',{
        itemId: booking?.item?.id,
        comment: comment,
        rating: productRating,
        userId: booking?.borrowerId,
        bookingId: booking?.id
      })
      if(lenderRateStatus === 201 && itemStatus === 201)
      await updateBookingStatus()
      setReviewModalVisible(false)
    } catch(err){
      console.log(err)
    } finally{
      setIsLoading(false)
      setReviewModalVisible(false)
    }

  }
  
  const updateBookingStatus = async () => {
    const newStatus = getNextItemStatus()
    try {
      const { status } = await Instance.patch(`/bookings/${booking.id}/status`, { status: newStatus })
      if(status !== 200) return
      getBookings()
    } catch(error) {
      console.log(error)
    }
    
}

  const renderLenderStars = () => {
    const starArray = new Array(5).fill(null)
    return starArray.map((_,index) => {
      if(index + 1 <= lenderRating){
        return <StarFilled
        className="BorrowerStarIcon StarClick"
        fill="#E9D8B4"
        onClick={() => setLenderRating(index + 1)}
        key={index}
        /> 
      } else {
        return <StarOutline
        className="BorrowerStarIcon StarClick"
        fill="#E9D8B4"
        onClick={() => setLenderRating(index + 1)}
        key={index}
        /> 
      }
    })
  }

  const renderProductStars = () => {
    const starArray = new Array(5).fill(null)
    return starArray.map((_,index) => {
      if(index + 1 <= productRating){
        return <StarFilled
        className="BorrowerStarIcon StarClick"
        fill="#E9D8B4"
        onClick={() => setProductRating(index + 1)}
        key={index}
        /> 
      } else {
        return <StarOutline
        className="BorrowerStarIcon StarClick"
        fill="#E9D8B4"
        onClick={() => setProductRating(index + 1)}
        key={index}
        /> 
      }
    })
  }

  const classes = useStyles()

  return (
    <Dialog 
      open={open}
      onClose={() => setReviewModalVisible(false)}
    >
      <DialogContent className="BorrowerMain">
        <div className="BorrowerHeaderContent">
          <div className="BorrowerHeader" style={{ justifyContent: "center" }}>
              Trade Complete
          </div>
          <IconButton 
            aria-label="delete" 
            className={classes.button} 
            onClick={() => setReviewModalVisible(false)}
          >
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
          <div className="ItemButtons" style={{ justifyContent: "center", minHeight: 70 }}>
            { isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Button 
              text="Submit Review"
              onClick={submitReview}
              isDisabled={!comment}
              />
            )}
          </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewLender
