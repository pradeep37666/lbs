import React, { useState, useEffect, useReducer, createContext } from 'react'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import BankDetails from '../../../components/FormComponents/BankDetails'
import LocationDetails from '../../../components/FormComponents/LocationDetails'
import Availability from '../../../components/FormComponents/Availability'
import Instance from '../../../util/axios'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg';
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'
import getSuburb from '../../../util/getSuburb'
import lenderUpgradeReducer from '../../../util/lenderUpgradeReducer'

export const FormContext = createContext()

export default function UpgradeLender() {
    const [state, dispatch] = useReducer(lenderUpgradeReducer, { 
        isLenderUpgrade: true, 
        currentPage: 'Bank Details',
        dateOfBirth: new Date(1990, 1, 1), 
    })

    const { currentPage, address, accountNumber, BSB, dateOfBirth } = state

    const globalDispatch = useGlobalState().dispatch
    const globalState = useGlobalState().state
    const { user } = globalState

    const history = useHistory()

    const [availability, setAvailability] = useState(Array(14).fill(0))
   

    const getComplete = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{ marginBottom: '1em' }} />

                    <div className="LoginHeader">Lender Upgrade Complete!</div>
                    <div className="LoginText">You have successfully updated your Little Big Shed account and are now ready to start lending!</div>


                    <button className="LoginFormButton" onClick={() => history.push({ pathname: '/user/account' })}>Continue</button>

                </div>
            </div>
        )
    }

    const submitUpgrade = () => {
        createStripeAccount()

        // let suburb
        // address.address_components ? suburb = getSuburb(address.address_components) : suburb = user.suburb
        
        // const data = {
        //     account_number: accNumber ? accNumber : user.account_number,
        //     bsb: bsb ? bsb : user.bsb,
        //     address: address.formatted_address ? address.formatted_address : user.address,
        //     suburb: suburb,
        //     lat: address ? address.lat : user.lat,
        //     lng: address ? address.lng : user.lng,
        //     available: availability ? availability : user.available
        // }

        // Instance.patch('user/update', data)
        //     .then((response) => {
        //         console.log(response)
        //         let newData = user
        //         newData.account_number = data.account_number
        //         newData.bsb = data.bsb
        //         newData.address = data.address
        //         newData.suburb = data.suburb
        //         newData.lat = data.lat
        //         newData.lng = data.lng
        //         newData.available = data.available
        //         globalDispatch({ type: 'setUser', data: newData })
        //     })
        //     .catch((error) => {
        //         console.log(error)
            // })

    }

    const createStripeAccount = async () => {
        console.log('dob', dateOfBirth)
        console.log('acc', accountNumber)
        console.log('bsb', BSB)
        // const stripeData = {
        //     u_id: user.id,
        //     email: user.email,
        //     bsb: BSB,
        //     accountNumber,
        //     day: parseInt(dayOfBirth),
        //     month: parseInt(monthOfBirth),
        //     year: parseInt(yearOfBirth),
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     line1: address.address_components[0].long_name + ' ' + address.address_components[1].long_name,
        //     country: address.address_components[5].short_name,
        //     state: address.address_components[4].short_name,
        //     city:   address.address_components[3].long_name,
        //     postal_code: address.address_components[6].long_name,
        // }

        // try{
        //     const { data, status } = await Instance.post('/stripe/createAccount', stripeData)
        //     console.log('stripe', data, status)
        // } catch(err) {
        //     console.log(err.response)
        // }
        
    }

    const renderSwitch = () => {
        switch (currentPage) {
            case 'Bank Details':
                return <BankDetails lender />
            case 'Location Details':
                return <LocationDetails />
            case 'Availability':
                return <Availability
                    availability={availability}
                    setAvailability={setAvailability}
                    isUpgrade={true}
                    submitUpgrade={submitUpgrade}
                />
            case 'Complete!':
                return getComplete()
            default:
                return ''
        }
    }

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            <PageWrapper>
                <Banner textBold='Lender Upgrade' textNormal={currentPage} />

                { renderSwitch() }

            </PageWrapper>
        </FormContext.Provider>
    )
}
