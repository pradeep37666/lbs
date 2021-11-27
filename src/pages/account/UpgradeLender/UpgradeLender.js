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
import lenderUpgradeReducer from '../../../util/reducers/lenderUpgradeReducer'

const FormContext = createContext()

export default function UpgradeLender() {

    const [state, dispatch] = useReducer(lenderUpgradeReducer, { 
        isLenderUpgrade: true, 
        currentPage: 'Bank Details',
        dateOfBirth: new Date(1990, 1, 1), 
        availability: new Array(14).fill(0)
    })

    const { currentPage, address, accountNumber, BSB, dateOfBirth, availability } = state

    const globalDispatch = useGlobalState().dispatch
    const globalState = useGlobalState().state
    const { user } = globalState

    const history = useHistory()
   
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

    const submitUpgrade = async () => {
        await createStripeAccount()
        const suburb =  getSuburb(address.address_components) 
        const userData = {
            address: address.formatted_address,
            suburb: suburb,
            lat: address.lat,
            lng: address.lng,
            available: availability.join(''),
            isLender: true
        }

        try{
            const { data, status } = await Instance.patch('user/update', userData)
            globalDispatch({ type: 'setUser', data })

        } catch(err){
            console.log('error', err)
        }
    }

    const createStripeAccount = async () => {

        const stripeData = {
            u_id: user.id,
            email: user.email,
            bsb: BSB,
            accountNumber,
            day: dateOfBirth.getDate(),
            month: dateOfBirth.getMonth(),
            year: dateOfBirth.getFullYear(),
            firstName: user.firstName,
            lastName: user.lastName,
            line1: address.address_components[0].long_name + ' ' + address.address_components[1].long_name,
            country: address.address_components[5].short_name,
            state: address.address_components[4].short_name,
            city:   address.address_components[3].long_name,
            postal_code: address.address_components[6].long_name,
        }
        console.log(stripeData)
        try{
            const { data, status } = await Instance.post('/stripe/createAccount', stripeData)
            console.log('stripe', data, status)
        } catch(err) {
            console.log(err.response)
        }
        
    }

    const renderSwitch = () => {
        switch (currentPage) {
            case 'Bank Details':
                return <BankDetails context={FormContext} />
            case 'Location Details':
                return <LocationDetails context={FormContext} />
            case 'Availability':
                return <Availability
                    context={FormContext}
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
