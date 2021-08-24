import React, { useState, useEffect } from 'react'
import './account.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import AccountSettings from './AccountSettingsContent/AccountSettings'
import TermsConditions from './TermsConditions/TermsConditions'
import Availability from './Availability/Availability'
import Instance from '../../util/axios'
import { GetUser, GetToken } from '../../util/UserStore'
import useGlobalState from '../../util/useGlobalState'

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
                return 'uhhhh support'
            default:
                return 'account page'
        }
    }

    const returnToAccountSettings = () => {
        setAccountContent('Account')
    }

    // Removes bsb from account essentially making the user only a borrower again , for testing purposes

    // const user = GetUser()

    useEffect(() => {
        if (accountContent === 'Support') {
            const data = {
                account_number: '',
                bsb: '',
            }

            Instance.put('user/update', data)
                .then((response) => {
                    console.log(response)
                    let newData = user
                    newData.account_number = data.account_number
                    newData.bsb = data.bsb
                    dispatch({ type: 'setUser', data: newData })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [accountContent])

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
                <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent} />

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
