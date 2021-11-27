import React, { useState, useEffect } from 'react'
import './account.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import AccountSettings from './AccountSettingsContent/AccountSettings'
import TermsConditions from './TermsConditions/TermsConditions'
import Availability from './Availability/Availability'
import Instance from '../../util/axios'
import useGlobalState from '../../util/useGlobalState'
import { isMobile } from 'react-device-detect'

export default function Account() {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [accountContent, setAccountContent] = useState('Account')

    const getAccountSettingsContent = () => {
        switch (accountContent) {
            case 'Account':
                return <AccountSettings />
            case 'Availability':
                return <Availability return={returnToAccountSettings} />
            case 'Terms & Conditions':
                return <TermsConditions />
            case 'Support':
                return 'Support'
            default:
                return 'account page'
        }
    }

    const returnToAccountSettings = () => {
        setAccountContent('Account')
    }

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
                { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent} />}

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
