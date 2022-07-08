import React from 'react'
import './StatusButton.css'
import { CircularProgress } from '@material-ui/core'

const StatusButton = ({ type, text, onClick, isLoading, nonBtn, width }) => {
    const btnTypes = () => {
        switch (type) {
            case 'red': 
                return'redBtn'
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
        {nonBtn
        ?
        <div className='nonBtnStyle'>
            {text}
        </div>
        :
            isLoading
            ?
                <div className={btnTypes()}>
                    <CircularProgress color='inherit' size={20}/>
                </div>
            :
                <div 
                    className={btnTypes()}
                    style={{width: width}}
                    onClick={onClick}
                >
                    {text}
                </div>
        }
        </>
    )
}

export default StatusButton