import { CircularProgress } from '@material-ui/core'
import React from 'react'
import './Button.css'
import ValidationPopup from '../ValidationPopup/ValidationPopup'

export default function Button({ onClick, isDisabled, errorMessage, isLoading, text  }) {

    const getButtonClassName = () => {
        let buttonClass = "ButtonContainer"
        if(isDisabled || isLoading){
            buttonClass += " ButtonDisabled"
        }
        return buttonClass
    }

    const handleButtonClick = (e) => {
        if(isDisabled || isLoading) return
        onClick(e)
    }

    return (
        <div className="ButtonErrorContainer">
            <button 
            className={getButtonClassName()} 
            onClick={handleButtonClick}
            >
                { isLoading ? (
                    <CircularProgress color="#fff" size={20} />
                ) : (
                    <div>
                        { text }
                    </div>
                )}
            </button>
            { errorMessage ? (
                <ValidationPopup errorText={errorMessage} errorHeader='Error' hide={false} />
            ) : (
                null
            )}
        </div>
    )
}
