import React, { useState } from 'react'
import './favourites.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'

export default function Favourites() {

    const [accountContent, setAccountContent] = useState('Favourites')

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>

                

            </div>

            </div>
        </PageWrapper>
    )
}
