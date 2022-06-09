import { Avatar } from '@material-ui/core'
import React from 'react'
import './MemberCard.css'

const MemberCard = ({ member }) => {
  return (
    <div className='member_card_container'>
        <Avatar 
            src={member.avatar} 
            alt='member avatar'
            className='member_avatar'
        />
        <p className='member_name'>
            {member.firstName}&#160;
            {member.lastName}
        </p>
        <p className='member_status'>
            {member.position} / 
            {member.title}
        </p>
        <p className='member_description'>
            {member.description}
        </p>
    </div>
  )
}

export default MemberCard