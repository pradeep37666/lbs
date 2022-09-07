import React from 'react'
import { useHistory } from 'react-router-dom'
import NoContent from '../components/NoContent/NoContent'

const InvalidRoutePage = () => {
    const history = useHistory()
  return (
    <div style={{width: '100vw', height: '100vh'}}>
        <NoContent 
            header='404 Error'
            text="This page doesn't exist."
            buttonText="Go to Home page"
            onButtonClick={() => history.push('/')}
        />
    </div>
  )
}

export default InvalidRoutePage