import { Avatar } from '@material-ui/core'
import './TradeSidebar.css'
import RatingFiller from '../ratingFiller/ratingFiller'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import getImage from '../../util/getImage'
import getFullName from '../../util/getFullName'
import { UserTradeData } from '../../types/User'

type Props = {
  userDetails: UserTradeData
}

const ApplicantOverview = ({ userDetails }: Props) => {
  return (
    <div className='TradeSidebarSection'>
      <div className='TradeSidebarHeading'>
        <span>Applicant Overview</span>
      </div>
      <div className='TradeSidebarUserContainer'>
        <div className='TradeSidebarUserAvatar'>
          <Avatar
            sizes=''
            src={
              userDetails.avatar ? getImage(userDetails.avatar) : MissingProfile
            }
          />
        </div>
        <div>
          <span className='TradeSidebarUserName'>
            {getFullName(userDetails.firstName, userDetails.lastName)}
          </span>
          <div className='TradeSidebarUserRatingContainer'>
            <span>Lender:</span>
            <span> {userDetails.lenderRating}/5</span>
            <RatingFiller rating={userDetails.lenderRating} />
          </div>
          <div className='TradeSidebarUserRatingContainer'>
            <span>Borrower: </span>
            <span>{userDetails.borrowerRating}/5</span>
            <RatingFiller rating={userDetails.borrowerRating} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantOverview
