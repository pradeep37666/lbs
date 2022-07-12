import React, { useEffect } from 'react'
import './LBSSnackBar.css'
import useErrorState from '../../util/reducers/errorContext'

const LBSSnackBar = ({ timeout }) => {
    const { errorState, errorDispatch } = useErrorState()
    const { 
        toggleSnackbar, snackbarMessage, snackbarBtnText, snackbarBtnFunc
     } = errorState

    let TIMER
    const handleTimeout = () => {
        TIMER = setTimeout(() => {
            errorDispatch({type: 'closeSnackbar'})
        }, timeout)
    }

    useEffect(() => {
        if(toggleSnackbar) handleTimeout()
        return () => clearTimeout(TIMER)
    },[toggleSnackbar, TIMER])

    return (
        <>
        {toggleSnackbar &&
        <div className='snackbar_container'>
            <p className='snackbar_message'>
                {snackbarMessage}
            </p>
            <button 
                className='snackbar_button'
                onClick={snackbarBtnFunc}
            >
                {snackbarBtnText}
            </button>
        </div>
        }
        </>
    )
}

export default LBSSnackBar