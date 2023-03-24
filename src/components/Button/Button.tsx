import React from 'react'
import './Button.css'
import { CircularProgress } from '@material-ui/core'
import ValidationPopup from '../ValidationPopup/ValidationPopup'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isDisabled?: boolean
  errorMessage?: string | undefined
  errorHeader?: string
  isLoading?: boolean
  text: string
  inLineError?: string | undefined
  invertedColors?: boolean
  style?: React.CSSProperties
}

export default function Button({
  onClick,
  isDisabled,
  errorMessage,
  errorHeader,
  isLoading,
  text,
  inLineError,
  invertedColors,
  style,
}: Props) {
  const getButtonClassName = () => {
    let buttonClass = invertedColors ? 'ButtonInverted' : 'Button'
    if (isDisabled || isLoading) {
      buttonClass += ' ButtonDisabled'
    }
    return buttonClass
  }

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isDisabled || isLoading) return
    onClick(e)
  }

  return (
    <div
      className={inLineError ? 'ButtonErrorContainer' : 'ButtonContainer'}
      style={style}
    >
      <div className='ButtonValidationContainer'>
        <button
          className={getButtonClassName()}
          onClick={e => handleButtonClick(e)}
          disabled={isDisabled}
        >
          {isLoading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <div>{text}</div>
          )}
        </button>
        {errorMessage && !inLineError ? (
          <ValidationPopup
            errorText={errorMessage}
            errorHeader='Error'
            label={''}
          />
        ) : null}
      </div>
      {errorMessage && inLineError ? (
        <div className='InLineErrorContainer'>
          <div className='ValidationPopup__Header'>
            {errorHeader || 'Error'}
          </div>
          {errorMessage}
        </div>
      ) : null}
    </div>
  )
}
