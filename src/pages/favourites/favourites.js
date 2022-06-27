import React, { useEffect, useState } from 'react'
import './favourites.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import ItemCard from '../../components/itemCard/itemCard';
import { isMobile } from 'react-device-detect';
import { CircularProgress } from '@material-ui/core';
import NoContent from '../../components/NoContent/NoContent';
import { useHistory } from 'react-router';
import Instance from '../../util/axios';

export default function Favourites() {
    const history = useHistory()
    const [accountContent, setAccountContent] = useState('Favourites')
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        try {
            getUserFavouriteItems()
        } catch (error) {
            console.log(error.response)
        }
    },[])

    const getUserFavouriteItems = async () => {
        const { data } = await Instance.get('/liked/findByUserId')
        if (data) {
            setItems(data)
            setIsLoading(false)
        }
    }

    const renderItems = () => {
        return items.map((item, i) => {
            return <ItemCard item={item} key={i} favourited={true}/>
        })
    }
    return (
        <PageWrapper>
            <div className="UserShedWrapper">
                {!isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}
                <div className="UserShed__MainContent" style={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center'} : null}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        items.length === 0 ? (
                            <NoContent 
                            header="No favourites" 
                            text="Items that you favourite will appear here"
                            buttonText="Search for an item" 
                            onButtonClick={() => history.push('/search')}/>
                        ) : (
                            <>
                                <div className="UserShed__Title">
                                    {accountContent}
                                </div>
                                <div className="ItemCardSection">
                                    { renderItems() }
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </PageWrapper>
    )
}
