import React from 'react'
import './Button.css'
import { CircularProgress } from '@material-ui/core'
import ValidationPopup from '../ValidationPopup/ValidationPopup'

export default function Button({ 
    onClick, 
    isDisabled, 
    errorMessage, 
    errorHeader, 
    isLoading, 
    text, 
    inLineError, 
    invertedColors, 
    style  
}) {

    const getButtonClassName = () => {
        let buttonClass = invertedColors ? "ButtonInverted" : "Button"
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
        <div className={ inLineError ? "ButtonErrorContainer" : "ButtonContainer" } style={style}>
            <div className="ButtonValidationContainer">
                <button 
                className={getButtonClassName()} 
                onClick={handleButtonClick}
                >
                    { isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                    ) : (
                        <div>
                            { text }
                        </div>
                    )}
                </button>
                { errorMessage && !inLineError ? (
                    <ValidationPopup errorText={errorMessage} errorHeader='Error' hide={false} />
                ) : (
                    null
                )}
            </div>
            { errorMessage && inLineError ? (
                <div className="InLineErrorContainer">
                    <div className="ValidationPopup__Header">{errorHeader || 'Error' }</div>
                    { errorMessage }
                </div>
            ) : null }
        </div>
        
    )
}
