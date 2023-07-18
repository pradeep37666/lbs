import React, { useState } from 'react'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import EnterCode from './EnterCode'
import NewPassword from './NewPassword'
import EnterEmail from './EnterEmail'

export type ResetPasswordPage = 'EnterEmail' | 'EnterCode' | 'NewPassword'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [currentPage, setCurrentPage] =
    useState<ResetPasswordPage>('EnterEmail')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const switchPage = (newPage: ResetPasswordPage) => {
    setCurrentPage(newPage)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'EnterEmail':
        return (
          <EnterEmail
            handleEmailChange={handleEmailChange}
            email={email}
            switchPage={switchPage}
          />
        )
      case 'EnterCode':
        return <EnterCode email={email} switchPage={switchPage} />
      case 'NewPassword':
        return <NewPassword />
    }
  }

  return (
    <PageWrapper>
      <div className='ApplicationHeaderContainer'>
        <div className='ItemDetails'>
          <span className='ApplicationHeaderHeading'>Retrieve Password </span>
          <span className='ApplicationHeaderSubheading'> - Basic Details</span>
        </div>
      </div>
      {renderPage()}
    </PageWrapper>
  )
}
