import React from 'react'
import { User } from '../../types/User'
import getImage from '../../util/getImage'
import RatingFiller from '../ratingFiller/ratingFiller'

type Props = {
    user: User
}

function UserProfileCard({ user }: Props) {

    return (
        <section className='mb-4'>
            
            <div className='flex gap-4 items-center'>
                <img src={getImage(user.avatar)} className='w-[80px] h-[80px] rounded-[50%] '/>
                <div>
                    <p className='text-blue-base text-[20px] mb-1 font-bold w-fit'>{user.firstName} {user.lastName}</p>
                    <div className='text-[17px] flex gap-1 items-center flex-wrap' >
                        <span className='font-medium'>Lender:</span> {user.lenderRating}/5 <RatingFiller rating={user.lenderRating}/>
                    </div>
                    <div className='text-[17px] flex gap-1 items-center flex-wrap' >
                    <span className='font-medium'>Borrower:</span> {user.borrowerRating}/5 <RatingFiller rating={user.borrowerRating}/>
                    </div>
                </div>


            </div>
            
        </section>
    )
}

export default UserProfileCard
