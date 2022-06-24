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
import lenderUpgradeReducer from '../../../util/reducers/lenderUpgradeReducer'
import parseAddressComponent from '../../../util/parseAddressComponent'

const FormContext = createContext()

export default function UpgradeLender() {
    const [ isUpgradeLoading, setIsUpgradeLoading ] = useState(false)
    const [ state, dispatch ] = useReducer(lenderUpgradeReducer, { 
        isLenderUpgrade: true, 
        currentPage: 'Bank Details',
        dateOfBirth: new Date(1990, 1, 1), 
        availability: new Array(14).fill(0)
    })
    const globalDispatch = useGlobalState().dispatch
    const globalState = useGlobalState().state
    const { user } = globalState
    const history = useHistory()
    const { 
        currentPage, address, accountNumber, BSB,
        website, idFrontImageLink, idBackImageLink,
        dateOfBirth, availability
    } = state

    useEffect(() => {
        window.scrollTo(0,0)
    }, [currentPage]) 
   
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
        try{
            setIsUpgradeLoading(true)
            const stripeAccountId = await createStripeAccount()
            if (!stripeAccountId) return
            const userData = {
                address: {
                    ...parseAddressComponent(address?.address_components),
                    lat: address.lat,
                    lng: address.lng,
                },
                stripe: {
                    accountId: stripeAccountId,
                },
                available: availability.join(''),
                isLender: true,
            }
            const { data, status } = await Instance.patch('user/update', userData)
            if (status !== 200) return
            globalDispatch({ type: 'setUser', data })
        } catch(err){
            console.log('error', err)
        } finally {
            setIsUpgradeLoading(false)
        }
    }

    const createStripeAccount = async () => {
        const { streetNumber, streetName, city, state, postCode } = parseAddressComponent(address?.address_components)
        const stripeData = {
            email: user.email,
            bsb: BSB,
            accountNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            day: dateOfBirth.getDate(),
            month: dateOfBirth.getMonth() + 1,
            year: dateOfBirth.getFullYear(),
            mobile: user.mobile,
            mcc: '5734',
            website: website ?? 'https://www.stripe.com/au',
            streetNumber,
            streetName,
            postCode,
            city,
            state,
            documentFrontImage: idFrontImageLink,
            documentBackImage: idBackImageLink,
        }
        try{
            const { data, status } = await Instance.post('/stripe/createAccount', stripeData)
            if (status !== 201) {
                // error message
                return null
            } 
            return data.id
        } catch(error) {
            console.log(error.response)
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
                    isUpgradeLoading={isUpgradeLoading}
                    type={'upgrateLender'}
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
