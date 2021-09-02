import React, { useState, useEffect } from 'react'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import BankDetails from '../../../components/FormComponents/BankDetails'
import LocationDetails from '../../../components/FormComponents/LocationDetails'
import Availability from '../../../components/FormComponents/Availability'
import Instance from '../../../util/axios'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg';
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'

export default function UpgradeLender() {
    const dispatch = useGlobalState().dispatch
    const globalState = useGlobalState().state
    const { user } = globalState

    const history = useHistory()

    const [page, setPage] = useState('Bank Details')

    const [accNumber, setAccNumber] = useState("")
    const [bsb, setBsb] = useState("")

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")

    const [availability, setAvailability] = useState('00000000000000')

    const [validated, setValidated] = useState(false)

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

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

        const data = {
            account_number: accNumber ? accNumber : user.account_number,
            bsb: bsb ? bsb : user.bsb,
            address: address ? address : user.address,
            city: city ? city : user.city,
            country: country ? country : user.country,
            state: state ? state : user.state,
            available: availability ? availability : user.available
        }

        Instance.put('user/update', data)
            .then((response) => {
                console.log(response)
                let newData = user
                newData.account_number = data.account_number
                newData.bsb = data.bsb
                newData.address = data.address
                newData.city = data.city
                newData.country = data.country
                newData.state = data.state
                newData.available = data.available
                dispatch({ type: 'setUser', data: newData })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const renderSwitch = () => {
        switch (page) {
            case 'Bank Details':
                return <BankDetails
                    validated={validated}
                    handleNextPage={handleNextPage}
                    setAccNumber={setAccNumber}
                    setBsb={setBsb}
                    setValidated={setValidated}
                    isUpgrade={true}
                    lender={true}
                />
            case 'Location Details':
                return <LocationDetails
                    validated={validated}
                    handleNextPage={handleNextPage}
                    setAddress={setAddress}
                    setCity={setCity}
                    setCountry={setCountry}
                    setState={setState}
                />
            case 'Availability':
                return <Availability
                    validated={validated}
                    handleNextPage={handleNextPage}
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

    useEffect(() => {
        switch (page) {
            case 'Bank Details':
                if (accNumber && bsb) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Location Details':
                if (address && city && country && state) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (availability !== '00000000000000') {
                    setValidated(true)
                } else setValidated(false)
                break
            default:
                return '';
        }
    }, [page, accNumber, bsb, address, city, country, state, availability])

    return (
        <PageWrapper>
            <Banner textBold='Lender Upgrade' textNormal={page} />

            {renderSwitch()}

        </PageWrapper>
    )
}
