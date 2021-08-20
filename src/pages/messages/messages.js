import React, { useState } from 'react'
import './messages.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import {CometChatUI} from '../../../src/cometchat-pro-react-ui-kit/CometChatWorkspace/src'

export default function Messages() {
    const [accountContent, setAccountContent] = useState('Messages')

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>
            <CometChatUI />
                

            </div>

            </div>
        </PageWrapper>
    )
}
