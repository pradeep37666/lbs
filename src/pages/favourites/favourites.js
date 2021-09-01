import React, { useEffect, useState } from 'react'
import instance from '../../util/axios';
import './favourites.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import ItemCard from '../../components/itemCard/itemCard';

export default function Favourites() {

    const [accountContent, setAccountContent] = useState('Favourites')
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        instance.get('/liked/findByUid')
          .then(({data} ) => {
            console.log("response",data)
            setItems(data);
            setLoading(false);
          })
          .catch(()=>{
              
          })
    },[])
    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>
                <div className="ItemCardSection">
                    { loading 
                    ? <div>Loading items...</div>
                    :               
                     items.map((item, i) => {
                    return <ItemCard item={item} key={i} favourited={true}/>
                    })
                    }
                </div>
                

            </div>

            </div>
        </PageWrapper>
    )
}
