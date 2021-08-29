import React from 'react'

export default function ItemOptions({ handleNextPage }) {
    return (
        <div>
            Item Options
            <button onClick={() => handleNextPage('ItemOverview')}>next</button>
        </div>
    )
}
