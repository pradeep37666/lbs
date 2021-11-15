import React, { useState } from 'react'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Instance from '../../util/axios'
import EnterCode from './EnterCode'
import EnterPhone from './EnterPhone'
import NewPassword from './NewPassword'

export default function ForgotPassword() {
    const [phoneNumber, setPhoneNumber] = useState()
    const [currentPage, setCurrentPage] = useState('NewPassword')
   
    const renderPage = () => {
        switch(currentPage) {
            case 'EnterPhone' :
                return <EnterPhone setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber} setCurrentPage={setCurrentPage} />
            case 'EnterCode' :
                return <EnterCode phoneNumber={phoneNumber} />
            case 'NewPassword' :
                return <NewPassword />
        }  

    }

    return (
        <PageWrapper>
            <div className="ApplicationHeaderContainer">
                <div>
                    Retrieve Password
                     - Basic Details
                </div>
                
                
            </div>
            { renderPage() }
        </PageWrapper>
    )
}
