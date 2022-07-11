import React, { useReducer, useEffect } from 'react'
import './LBSSnackBar.css'
import snackbarReducer from '../../util/reducers/snackbarReducer'

const LBSSnackBar = ({ timeout }) => {
    const [ state, dispatch ] = useReducer(snackbarReducer, {
        toggleSnackbar: false,
        snackbarMessage: '',
        snackbarBtnText: '',
        snackbarBtnFunc: () => {}
    })
    const { 
        toggleSnackbar, snackbarMessage, snackbarBtnText, snackbarBtnFunc
     } = state

    let TIMER
    const handleTimeout = () => {
        TIMER = setTimeout(() => {
            dispatch({type: 'closeSnackbar'})
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
                onClick={() => snackbarBtnFunc()}
            >
                {snackbarBtnText}
            </button>
        </div>
        }
        </>
    )
}

export default LBSSnackBar