import React, { useEffect, useState } from 'react'
import './yourshed.css'
import '../../components/itemCard/itemCard.css';
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import instance from '../../util/axios';
import ItemCard from '../../components/itemCard/itemCard';

export default function Yourshed() {

    const [accountContent, setAccountContent] = useState('Your Shed')
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
useEffect(()=>{
    instance.get('/items/findByUid')
      .then(({data} ) => {
        console.log("response",data)
        setItems(data);
        setLoading(false);
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
            <>
            { items.map((item, i) => {
              return <ItemCard item={item} key={i}/>
            })}
            <div className="ItemCard" >
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
