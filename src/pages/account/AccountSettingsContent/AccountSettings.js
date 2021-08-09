import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { GetUser, GetToken, LoginUser } from '../../../util/UserStore'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import RatingFiller from '../../../components/ratingFiller/ratingFiller'
import {ReactComponent as CameraIcon} from '../../../assets/Icons/CameraIcon.svg';
import Instance from '../../../util/axios'
import ValidationPopup from '../../../components/ValidationPopup/ValidationPopup'
import { handleFullName, handleEmail, handlePhoneNumber } from '../../../util/UserValidation'
import { useHistory } from 'react-router'

export default function AccountSettings() {

    const user = GetUser()
    const history = useHistory()
    const [userProducts, setUserProducts] = useState(0)

    const [nameValidation, setNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [phoneValidation, setPhoneValidation] = useState("")

    const [image, setImage] = useState( {preview: '', raw: ''} )

    const [name, setName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.mobile)

    const showValidation = (field) => {
        switch (field) {
            case 'name':
                return (nameValidation.length > 0) ?  false : true 
            case 'email':
                return (emailValidation.length > 0 && nameValidation.length === 0) ? false : true
            case 'phone':
                return (phoneValidation.length > 0 && nameValidation.length === 0 && emailValidation.length === 0) ? false : true
            default:
                return
        }
    }

    const updateBasicDetails = () => {
        const data = {
            fullName: name ? name : user.fullName,
            email: email ? email : user.email,
            mobile: phone ? phone : user.mobile
        }

        Instance.put('user/update', data , {headers: { Authorization: `Bearer ${GetToken()}`}})
        .then((response) => {
            console.log(response)
            let newData = user
            newData.fullName = data.fullName
            newData.email = data.email
            newData.mobile = data.mobile
            localStorage.setItem('user', JSON.stringify(newData))
            history.go(0)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            })
          }
    }

    useEffect(() => {
        Instance.get('items/findByUid', {headers: { Authorization: `Bearer ${GetToken()}`}})
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
                        <img src={`${!user.avatar ? MissingProfile : user.avatar}`} className="AccountSettings__Avatar" alt="ProfilePicture"/>
                        <div className="AccountSettings__UserDetails">
                            <div className="AccountSettings__UserName">{user.fullName}</div>
                            <div className="AccountSettings__Ratings"><span className="AccountSettings-Medium">Lender:</span> {user.lender_rating}/5 <RatingFiller rating={user.lender_rating}/></div>
                            <div className="AccountSettings__Ratings"><span className="AccountSettings-Medium">Borrower:</span> {user.borrower_rating}/5 <RatingFiller rating={user.borrower_rating}/></div>
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

                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Edit Account Details</div>

                    <div className="AccountSettings__UpdateHeader">Full Name</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='Jane Doe' defaultValue={name} className="LoginInput" onBlur={(e) => handleFullName(e, setName, setNameValidation)}/>
                        <div className={`triangleLeft ${showValidation("name") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={nameValidation} errorHeader='Invalid Full Name' hide={showValidation("name")}/>
                    </div>
                    

                    <div className="AccountSettings__UpdateHeader">Email</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='JaneDoe@DoeJane.com' defaultValue={email} className="LoginInput" onBlur={(e) => handleEmail(e, setEmail, setEmailValidation)}/>
                        <div className={`triangleLeft ${showValidation("email") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={emailValidation} errorHeader='Invalid Email' hide={showValidation("email")}/>
                    </div>

                    <div className="AccountSettings__UpdateHeader">Phone Number</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='+61456789012' defaultValue={phone} className="LoginInput" onBlur={(e) => handlePhoneNumber(e, setPhone, setPhoneValidation)}/>
                        <div className={`triangleLeft ${showValidation("phone") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={phoneValidation} errorHeader='Invalid Phone Number' hide={showValidation("phone")}/>
                    </div>

                    <div className="AccountSettings__UpdateHeader">Profile Picture</div>
                    <div className="ProfilePictureFlex">
                        <div className="ProfilePictureCircle" >
                        {image.preview ? 
                    
                        <img src={image.preview} alt="dummy" className="ProfilePicturePreview"/>
                    
                        : <CameraIcon className="CameraIcon"/>}
                        </div>
                    <input type="file" id="selectFile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    <button className="LoginFormButton UploadButton" onClick={() => document.getElementById('selectFile').click()}>{!user.avatar ? 'Upload' : 'Change Picture'}</button>
                    

                    </div>

                    <button className="LoginFormButton" onClick={() => updateBasicDetails()}>Save Changes</button>

                </div>

            </div>

            <div className="AccountSettings__Main">
                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Payment Details</div>
                </div>

                <div className="AccountSettings__Container">
                    <div className="AccountSettings__Title">Location</div>
                </div>

            </div>
        </div>
    )
}
