import React from 'react'

type Props = {
  rotation?: number
  width?: number
  height?: number
  onClick?: () => void
}

export default function Arrow({ rotation, width, height, onClick }: Props) {
  return (
    <div
      style={{
        transform: `rotate(${rotation}deg` ?? null,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width ? width : '100%'}
        height={height ? height : '100%'}
        viewBox='0 0 144 92'
      >
        <g id='Arrow' clipPath='url(#clip-Arrow)'>
          <path
            id='Path_1050'
            data-name='Path 1050'
            d='M1014.205,600.466,976.2,566.422a2.765,2.765,0,0,0-3.606,0,2.12,2.12,0,0,0,0,3.23l33.527,30.027H901.7a2.3,2.3,0,1,0,0,4.568h104.683L972.86,634.275a2.121,2.121,0,0,0,0,3.231,2.771,2.771,0,0,0,3.605,0l37.74-33.809a2.124,2.124,0,0,0,0-3.23Z'
            transform='translate(-885.048 -554.477)'
            fill='#b03b4b'
          />
        </g>
      </svg>
    </div>
  )
}
