import './NoContent.css'
import NoContentImage from '../../assets/Images/NoContent.png'
export default function NoContent({ header, text, onButtonClick, buttonText }) {
  return (
    <div className='NoContentContainer'>
      <div className='NoContentTextContainer'>
        <span className='NoContentHeaderText'>{header}</span>
        <span className='NoContentText'>{text}</span>
      </div>

      <img src={NoContentImage} className='NoContentImage'></img>

      <div className='NoContentButton' onClick={onButtonClick}>
        {buttonText}
      </div>
    </div>
  )
}
