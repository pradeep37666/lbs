import './ValidationPopup.css'

export default function ValidationPopup({ errorHeader, errorText, label }) {
  return (
    <div className='InLineErrorContainer'>
      <div className='ValidationPopup__Header'>
        {label ? `Invalid ${label}` : errorHeader}
      </div>
      {errorText}
    </div>
  )
}
