import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './MemberCard.css'

const MemberCard = ({ member, key }) => {
    const [ bioStatus, setBioStatus ] = useState({
        isReadMoreOpen: false,
        selectedBio: 0
    })

    const readMore = () => {
        setBioStatus({
            isReadMoreOpen: true,
            selectedBio: key
        })
    }

    return (
        <div className='member_card_container'>
            <Avatar 
                src={member.avatar} 
                alt='member avatar'
                className='member_avatar'
            />
            <p className='member_name'>
                {member.name}
            </p>
            <div className='member_description'>
                {member.shortBio} 
                <a 
                    style={{fontWeight: '600', textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={readMore}
                >
                    Read more
                </a>
            </div>
            {bioStatus.isReadMoreOpen && bioStatus.selectedBio === key && (
            <p className='member_description'>
                {member.longBio}
            </p>
            )}
        </div>
    )
}

export default MemberCard