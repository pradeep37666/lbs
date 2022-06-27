import React, { useEffect, useState } from 'react'
import './yourshed.css'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import ItemCard from '../../components/itemCard/itemCard';
import { isMobile } from 'react-device-detect';
import useGlobalState from '../../util/useGlobalState';
import Instance from '../../util/axios'

export default function Yourshed() {
    const { state } = useGlobalState()
    const { user } = state
    const [ accountContent, setAccountContent ] = useState('Your Shed')
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        getUserItems(user.id)
    },[])

    const getUserItems = async (userId) => {
        const { data } = await Instance.get(`items/findByUserId?userId=${userId}`)
        if (data) {
            setItems(data)
            setLoading(false)
        }
    }

    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}
                <div className="UserShed__MainContent">
                    <div className="UserShed__Title">
                        {accountContent}
                    </div>
                    <div className="ItemCardSection">
                        { loading 
                        ? <div>Loading items...</div>
                        : items.length === 0
                            ?
                            <div>
                                There's no item
                            </div>
                            :
                            <>
                                {items?.map((item, i) => (
                                    <ItemCard 
                                        item={item} 
                                        userId={user.id}
                                        key={i}
                                    />
                                ))}
                                <div className="ItemCard" style={{ justifyContent: 'flex-start'}}>
                                    <Link className="addItemBox" to="/postitem">
                                        +
                                    </Link>
                                    <Link className="addItemButton" to="/postitem">Add New Item</Link>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
