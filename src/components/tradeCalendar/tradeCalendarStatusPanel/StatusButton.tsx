import React, { JSXElementConstructor, ReactNode } from 'react'
import './StatusButton.css'
import { CircularProgress } from '@material-ui/core'

type ButtonType = 'red' | 'white' | 'blue'

type Props = {
  type?: ButtonType
  text: ReactNode
  onClick?: () => void
  isLoading?: boolean
  nonBtn?: boolean
  width?: string
}

const StatusButton = ({
  type,
  text,
  onClick,
  isLoading,
  nonBtn,
  width,
}: Props) => {
  const btnTypes = () => {
    switch (type) {
      case 'red':
        return 'redBtn'
      case 'white':
        return 'whiteBtn'
      case 'blue':
        return 'blueBtn'
      default:
        return 'whiteBtn'
    }
  }

  return (
    <>
      {nonBtn ? (
        <div className='nonBtnStyle'>{text}</div>
      ) : isLoading ? (
        <div className={btnTypes()}>
          <CircularProgress color='inherit' size={20} />
        </div>
      ) : (
        <div className={btnTypes()} style={{ width: width }} onClick={onClick}>
          {text}
        </div>
      )}
    </>
  )
}

export default StatusButton
