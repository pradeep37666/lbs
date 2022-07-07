import React from 'react'

const StatusButton = ({ type }) => {
    const btnTypes = () => {
        switch (type) {
            case 'red': 'redBtn'
                break
            case 'white': 'whiteBtn'
                break
            case 'blue': 'blueBtn'
                break
            default: 'whiteBtn'
                break
        }
    }

    return (
        <div>StatusButton</div>
    )
}

export default StatusButton