import React, { useState } from 'react'
import './account.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import AccountSettings from './AccountSettingsContent/AccountSettings'

export default function Account() {

    const [accountContent, setAccountContent] = useState('Account')

    const getAccountSettingsContent = () => {
        switch (accountContent) {
            case 'Account':
                return <AccountSettings />
            case 'Become a Lender': 
                return 'yes this is become lender'
            case 'Availability':
                return 'yes this is availability'
            case 'Terms & Conditions':
                return 'yes this is t&cs'
            case 'Support':
                return 'uhhhh support'
            default: 
                return 'account page'
        }
    }

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>

                {getAccountSettingsContent()}

            </div>

            

            

            </div>
        </PageWrapper>
    )
}
