import React, { useState, useEffect, useReducer, createContext } from 'react'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import BankDetails from '../../../components/FormComponents/BankDetails'
import LocationDetails from '../../../components/FormComponents/LocationDetails'
import Availability from '../../../components/FormComponents/Availability'
import Instance from '../../../util/axios'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'
import lenderUpgradeReducer from '../../../util/reducers/lenderUpgradeReducer'

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
        const userData = {
            borrowerDetails: {
                address,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                isLender: true,
                available: availability.join('')
            },
            stripeDetails: {
                day: dateOfBirth.getDate(),
                month: dateOfBirth.getMonth() + 1,
                year: dateOfBirth.getFullYear(),
                bsb: BSB,
                accountNumber,
                mcc: '5734',
                website: website ?? 'https://www.stripe.com/au',
                documentFrontImage: idFrontImageLink,
                documentBackImage: idBackImageLink,
            }
        }
        try{
            setIsUpgradeLoading(true)
            const { data, status } = await Instance.post('/users/borrower-upgrade', userData)
            if (status !== 201) return
            globalDispatch({ type: 'setUser', data })
            dispatch({ type: 'setCurrentPage', data: 'Complete!'})
        } catch(error){
            console.log(error.response)
        } finally {
            setIsUpgradeLoading(false)
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
