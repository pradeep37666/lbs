import React, { useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import { isMobile } from 'react-device-detect'

export default function Trades() {
    const [accountContent, setAccountContent] = useState('Trades')

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>

                

            </div>

            </div>
        </PageWrapper>
    )
}
