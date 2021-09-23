import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import PageWrapper from '../../components/pageWrapper/pageWrapper';
import Instance from '../../util/axios';

function EditItemPage(props) {
   
    const [item,setItem] = useState();
    const [loading,setLoading] = useState();
    
    //declaration for all the infromation we get from the server
    const [title,setTitle] = useState();
    const [category,setCategory] = useState();
    const [pictures,setPictures] = useState();
    const [description,setDescription] = useState();
    const [price,setPrice] = useState();
    const [rating,setRating] = useState();
    const [discount,setDiscount] = useState();
    const [available,setAvailable] = useState();
    const [lat,setLat] = useState();
    const [lng,setLng] = useState();
    const [address,setAddress] = useState();
    const [city,setCity] = useState();
    const [country,setCountry] = useState();
    const [state,setState] = useState();
    const [isDeleted,setIsDeleted] = useState();
    const [created,setCreated] = useState();
    const [updated,setUpdated] = useState();

    const queryString = require('query-string')
    const params = useParams();
    console.log(params)
   
     //seperating the userid and the item id from the parameters using the query string function
     const parsed = queryString.parse(params.itemId);
     console.log(parsed);
     let itemId = parsed.i_id;
     console.log('itemId:', itemId);
     let userId = parsed.u_id;
     console.log('userId:',userId)

    useEffect(()=>{
        //returning data from the server
        Instance.get(`/items/findByIid/?i_id=${itemId}&u_id=${userId}`).then((response) => {
            console.log('data => ',response.data.item);
            setTitle(response.data.item.title)
            setItem(response.data.item);
            setLoading(false);
            //console.log('data :'+ JSON.stringify(item,null,'\t'))
          })
            .catch((error) => {
              console.log(error);
            })
    },[params])
   

    return (
        <PageWrapper>
            <div>
            <h1>Editing Item : {title}</h1>
        </div>
        </PageWrapper>
        
    );
}

export default EditItemPage;