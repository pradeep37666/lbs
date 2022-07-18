import React, { useState } from 'react'
import './account.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import AccountSettings from './AccountSettingsContent/AccountSettings'
import TermsConditions from './TermsConditions/TermsConditions'
import AccountAvailability from './AccountAailability/AccountAvailability'
import { isMobile } from 'react-device-detect'

export default function Account() {
    const [accountContent, setAccountContent] = useState('Account')

    const renderAccountSettingsContent = () => {
        switch (accountContent) {
            case 'Account':
                return <AccountSettings />
            case 'Availability':
                return <AccountAvailability setAccountContent={setAccountContent} />
            case 'Terms & Conditions':
                return <TermsConditions />
            case 'Support':
                return 'Support'
            default:
                return 'account page'
        }
    }

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
                { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent} />}
                <div className="UserShed__MainContent">
                    <div className="UserShed__Title">
                        {accountContent}
                    </div>
                    {renderAccountSettingsContent()}
                </div>

            </div>
        </PageWrapper>
    )
}
