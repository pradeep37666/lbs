import React, { useState } from 'react'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Instance from '../../util/axios'
import EnterCode from './EnterCode'
import EnterPhone from './EnterPhone'
import NewPassword from './NewPassword'

export default function ForgotPassword() {
    const [ phoneNumber, setPhoneNumber ] = useState()
    const [ currentPage, setCurrentPage ] = useState('EnterPhone')
   
    const renderPage = () => {
        switch(currentPage) {
            case 'EnterPhone' :
                return <EnterPhone setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber} setCurrentPage={setCurrentPage} />
            case 'EnterCode' :
                return <EnterCode phoneNumber={phoneNumber} setCurrentPage={setCurrentPage} />
            case 'NewPassword' :
                return <NewPassword />
        }  
    }

    return (
        <PageWrapper>
            <div className="ApplicationHeaderContainer">
                <div className="ItemDetails">

                    <span className="ApplicationHeaderHeading">Retrieve Password </span>
                    <span className="ApplicationHeaderSubheading"> - Basic Details</span>
                </div>
            </div>
            { renderPage() }
        </PageWrapper>
    )
}
