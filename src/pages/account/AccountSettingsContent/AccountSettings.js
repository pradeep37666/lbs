import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import RatingFiller from '../../../components/ratingFiller/ratingFiller'
import Instance from '../../../util/axios'
import EditAccountDetails from './Content/EditAccountDetails'
import EditPaymentDetails from './Content/EditPaymentDetails'
import EditLocation from './Content/EditLocation'
import useGlobalState from '../../../util/useGlobalState'
import { Avatar } from '@material-ui/core'
import getImage from '../../../util/getImage'

export default function AccountSettings() {
    const { state } = useGlobalState()
    const { user } = state
    const [ userProducts, setUserProducts ] = useState(0)

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            const { data } = await Instance.get(`/users/${user.id}/items`)
            if (!data) return
            setUserProducts(data.length)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className="AccountSettings__FlexMain">
            <div className="AccountSettings__Main">
                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Your Account</div>
                    <div className="AccountSettings__UserFlex">
                        <Avatar src={`${user && user.avatar ? getImage(user.avatar) : MissingProfile }`} className="AccountSettings__Avatar" alt="ProfilePicture" />
                        <div className="AccountSettings__UserDetails">
                            <div className="AccountSettings__UserName">{user.firstName} {user.lastName}</div>
                            <div className="AccountSettings__Ratings">
                                <span className="AccountSettings-Medium">
                                    Lender:
                                </span> 
                                <div className='AccountSettingsRatingContainer'>
                                    {user.lender_rating}/5 
                                    <RatingFiller rating={user.lender_rating} />
                                </div>
                            </div>
                            <div className="AccountSettings__Ratings">
                                <span className="AccountSettings-Medium">
                                    Borrower:
                                </span> 
                                <div className='AccountSettingsRatingContainer'>
                                    {user.borrower_rating}/5 
                                    <RatingFiller rating={user.borrower_rating} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="AccountSettings__AccountProductsFlex">
                        <div>
                            <span className="AccountSettings-Medium">
                                Account:&nbsp;
                            </span> 
                            Borrower {user.isLender && '& Lender'}
                        </div>
                        <div>
                            <span className="AccountSettings-Medium">
                                {userProducts <= 1
                                ? 'Product:'
                                : 'Products:'
                                }
                            </span> 
                            &nbsp;{userProducts}
                        </div>
                    </div>
                </div>
                <EditAccountDetails />
            </div>
            <div className="AccountSettings__Main">
                <EditPaymentDetails />
                {user.isLender && 
                 user.address && 
                 <EditLocation /> 
                }
            </div>
        </div>
    )
}
