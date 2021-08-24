import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { GetUser, GetToken } from '../../../util/UserStore'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import RatingFiller from '../../../components/ratingFiller/ratingFiller'
import Instance from '../../../util/axios'
import EditAccountDetails from './Content/EditAccountDetails'
import EditPaymentDetails from './Content/EditPaymentDetails'
import EditLocation from './Content/EditLocation'
import useGlobalState from '../../../util/useGlobalState'

export default function AccountSettings() {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [userProducts, setUserProducts] = useState(0)

    useEffect(() => {
        Instance.get('items/findByUid', { headers: { Authorization: `Bearer ${GetToken()}` } })
            .then((response) => {
                if (response.status === 200) {
                    setUserProducts(response.data.length)
                } else {
                    console.log('there was an issue getting the users data')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="AccountSettings__FlexMain">
            <div className="AccountSettings__Main">
                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Your Account</div>
                    <div className="AccountSettings__UserFlex">
                        <img src={`${user && user.avatar ? user.avatar : MissingProfile }`} className="AccountSettings__Avatar" alt="ProfilePicture" />
                        <div className="AccountSettings__UserDetails">
                            <div className="AccountSettings__UserName">{user.fullName}</div>
                            <div className="AccountSettings__Ratings"><span className="AccountSettings-Medium">Lender:</span> {user.lender_rating}/5 <RatingFiller rating={user.lender_rating} /></div>
                            <div className="AccountSettings__Ratings"><span className="AccountSettings-Medium">Borrower:</span> {user.borrower_rating}/5 <RatingFiller rating={user.borrower_rating} /></div>
                        </div>
                    </div>
                    <div className="AccountSettings__AccountProductsFlex">
                        <div><span className="AccountSettings-Medium">Account:</span> Borrower {!user.bsb ? '' : '& Lender'}</div>
                        <div><span className="AccountSettings-Medium">Products:</span> {userProducts}</div>

                    </div>

                </div>

                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Badge Collection</div>
                </div>

                <EditAccountDetails />


            </div>

            <div className="AccountSettings__Main">

                <EditPaymentDetails />

                {user.bsb &&

                    <EditLocation />

                    }



            </div>
        </div>
    )
}
