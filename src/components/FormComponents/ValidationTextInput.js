import { useState } from 'react'
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import ShowPasswordIcon from '../../assets/Icons/ShowPasswordIcon'
import './ValidationTextInput.css'
import ShowPasswordDefaultIcon from '../../assets/Icons/ShowPasswordDefaultIcon'

export default function ValidationTextInput({
  onChange,
  errorMessage,
  label,
  placeholder,
  passwordInput,
  errorHeader,
  value,
  inLineError,
  inputType,
}) {
  const [isInputHidden, setIsInputHidden] = useState(true)
  const [showPasswordIcon, setShowPasswordIcon] = useState(true)

  const togglePasswordVisibility = () => {
    setIsInputHidden(!isInputHidden)
    setShowPasswordIcon(!showPasswordIcon)
  }

  return (
    <div className={'ValidationInputContainer'}>
      <div className='LoginHeader'>{label}</div>
      <div className={inLineError && 'ValidationInputErrorContainer'}>
        <div className='LoginInputValidationContainer'>
          {passwordInput ? (
            <div className='PasswordInputContainer'>
              <input
                type={isInputHidden ? 'password' : 'text'}
                placeholder={placeholder}
                className='PasswordInput'
                value={value}
                onChange={onChange}
              />
              {showPasswordIcon ? (
                <ShowPasswordIcon onClick={togglePasswordVisibility} />
              ) : (
                <ShowPasswordDefaultIcon onClick={togglePasswordVisibility} />
              )}
            </div>
          ) : (
            <input
              placeholder={placeholder}
              className='ValidationInput'
              onChange={onChange}
              value={value}
              type={inputType}
              step='1'
              onWheel={e => e.target.blur()}
            />
          )}
        </div>
        {errorMessage && !inLineError ? (
          <ValidationPopup
            errorText={errorMessage}
            errorHeader={errorHeader}
            label={label}
          />
        ) : null}
      </div>
    </div>
  )
}
