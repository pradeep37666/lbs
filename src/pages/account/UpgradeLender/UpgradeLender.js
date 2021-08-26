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

    const [mondayM, setMondayM] = useState(null)
    const [mondayA, setMondayA] = useState(null)
    const [tuesdayM, setTuesdayM] = useState(null)
    const [tuesdayA, setTuesdayA] = useState(null)
    const [wednesdayM, setWednesdayM] = useState(null)
    const [wednesdayA, setWednesdayA] = useState(null)
    const [thursdayM, setThursdayM] = useState(null)
    const [thursdayA, setThursdayA] = useState(null)
    const [fridayM, setFridayM] = useState(null)
    const [fridayA, setFridayA] = useState(null)
    const [saturdayM, setSaturdayM] = useState(null)
    const [saturdayA, setSaturdayA] = useState(null)
    const [sundayM, setSundayM] = useState(null)
    const [sundayA, setSundayA] = useState(null)

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
            monday_am: mondayM ? mondayM : user.monday_am,
            monday_pm: mondayA ? mondayA : user.monday_pm,
            tuesday_am: tuesdayM ? tuesdayM : user.tuesday_am,
            tuesday_pm: tuesdayA ? tuesdayA : user.tuesday_pm,
            wednesday_am: wednesdayM ? wednesdayM : user.wednesday_am,
            wednesday_pm: wednesdayA ? wednesdayA : user.wednesday_pm,
            thursday_am: thursdayM ? thursdayM : user.thursday_am,
            thursday_pm: thursdayA ? thursdayA : user.thursday_pm,
            friday_am: fridayM ? fridayM : user.friday_am,
            friday_pm: fridayA ? fridayA : user.friday_pm,
            saturday_am: saturdayM ? saturdayM : user.saturday_am,
            saturday_pm: saturdayA ? saturdayA : user.saturday_pm,
            sunday_am: sundayM ? sundayM : user.sunday_am,
            sunday_pm: sundayA ? sundayA : user.sunday_pm,
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
                newData.monday_am = data.monday_am
                newData.monday_pm = data.monday_pm
                newData.tuesday_am = data.tuesday_am
                newData.tuesday_pm = data.tuesday_pm
                newData.wednesday_am = data.wednesday_am
                newData.wednesday_pm = data.wednesday_pm
                newData.thursday_am = data.thursday_am
                newData.thursday_pm = data.thursday_pm
                newData.friday_am = data.friday_am
                newData.friday_pm = data.friday_pm
                newData.saturday_am = data.saturday_am
                newData.saturday_pm = data.saturday_pm
                newData.sunday_am = data.sunday_am
                newData.sunday_pm = data.sunday_pm
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
                    setMondayM={setMondayM}
                    setMondayA={setMondayA}
                    mondayM={mondayM}
                    mondayA={mondayA}
                    setTuesdayM={setTuesdayM}
                    setTuesdayA={setTuesdayA}
                    tuesdayM={tuesdayM}
                    tuesdayA={tuesdayA}
                    setWednesdayM={setWednesdayM}
                    setWednesdayA={setWednesdayA}
                    wednesdayM={wednesdayM}
                    wednesdayA={wednesdayA}
                    setThursdayM={setThursdayM}
                    setThursdayA={setThursdayA}
                    thursdayM={thursdayM}
                    thursdayA={thursdayA}
                    setFridayM={setFridayM}
                    setFridayA={setFridayA}
                    fridayM={fridayM}
                    fridayA={fridayA}
                    setSaturdayM={setSaturdayM}
                    setSaturdayA={setSaturdayA}
                    saturdayM={saturdayM}
                    saturdayA={saturdayA}
                    setSundayM={setSundayM}
                    setSundayA={setSundayA}
                    sundayM={sundayM}
                    sundayA={sundayA}
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
                if (mondayM || mondayA || tuesdayM || tuesdayA || wednesdayM || wednesdayA || thursdayM || thursdayA ||
                    fridayM || fridayA || saturdayM || saturdayA || sundayM || sundayA) {
                    setValidated(true)
                } else setValidated(false)
                break
            default:
                return '';
        }
    }, [page, accNumber, bsb, address, city, country, state, mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM, sundayA])

    return (
        <PageWrapper>
            <Banner textBold='Lender Upgrade' textNormal={page} />

            {renderSwitch()}

        </PageWrapper>
    )
}
