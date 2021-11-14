import React from 'react'

export default function TrashCan({ style, onClick }) {
    return (
        <div style={style ? style : null} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" id="trash_can_Red_" width="36" height="36" viewBox="0 0 36 36">
                <path id="Rectangle_252" fill="none" d="M0 0H36V36H0z"/>
                <g id="Group_385" transform="translate(4139.866 -4641.45)">
                    <path id="Path_790" fill="#b43b4c" d="M209.709 1448h-8.537a2.137 2.137 0 0 0-2.134 2.134v3.557h-7.114a1.423 1.423 0 0 0 0 2.846h.711v18.853c0 3.727 2.753 6.759 6.138 6.759h14.047c2.992 0 5.427-2.713 5.427-6.047v-19.564h.711a1.423 1.423 0 0 0 0-2.846h-7.114v-3.557a2.137 2.137 0 0 0-2.135-2.135zm5.691 8.537v19.563c0 1.546-1.037 3.2-2.581 3.2h-14.046c-1.97 0-3.293-2.023-3.293-3.913v-18.853zm-13.517-5.692H209v2.134h-7.114z"  transform="translate(-4327.366 3194.45)"/>
                    <path id="Path_791" fill="#b43b4c" d="M202.923 1480.651a1.423 1.423 0 0 0 1.423-1.423v-12.806a1.423 1.423 0 0 0-2.846 0v12.806a1.423 1.423 0 0 0 1.423 1.423z" transform="translate(-4330.54 3189.544)"/>
                    <path id="Path_792" fill="#b43b4c" d="M210.923 1480.651a1.423 1.423 0 0 0 1.423-1.423v-12.806a1.423 1.423 0 0 0-2.846 0v12.806a1.423 1.423 0 0 0 1.423 1.423z" transform="translate(-4332.849 3189.544)"/>
                    <path id="Path_793" fill="#b43b4c" d="M218.923 1480.651a1.423 1.423 0 0 0 1.423-1.423v-12.806a1.423 1.423 0 0 0-2.846 0v12.806a1.423 1.423 0 0 0 1.423 1.423z"  transform="translate(-4335.157 3189.544)"/>
                </g>
            </svg>
        </div>
    )
}
