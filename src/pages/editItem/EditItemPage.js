import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Banner from '../../components/bannerText/bannerText';
import PageWrapper from '../../components/pageWrapper/pageWrapper';
import Instance from '../../util/axios';
import BasicDetails from '../postitem/PostItemContent/BasicDetails';
import CategorySelect from '../../components/categorySelect/categorySelect';
import { Button } from '@material-ui/core';
import './editItem.css';
import ItemPicture from '../postitem/PostItemContent/ItemPictures';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/styles';
import getImage from '../../util/getImage.js';
function EditItemPage(props) {
   
    const [item,setItem] = useState();
    const [loading,setLoading] = useState();
    const [titleText,setTitleText] = useState();
    //declaration for all the infromation we get from the server
    const [title,setTitle] = useState();
    const [category,setCategory] = useState();
    const [pictures,setPictures] = useState([]);
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

    const [validated, setValidated] = useState(false)
    const [page, setPage] = useState('Basic Details') 
    const queryString = require('query-string')
    const params = useParams();
 
   
    
     //seperating the userid and the item id from the parameters using the query string function
     const parsed = queryString.parse(params.itemId);
     let itemId = parsed.i_id;
     let userId = parsed.u_id;


    useEffect(()=>{
        //returning data from the server
        Instance.get(`/items/findByIid/?i_id=${itemId}&u_id=${userId}`).then((response) => {
            console.log('data => ',response.data.item);
            setTitleText(response.data.item.title)
            
            setTitle(response.data.item.title)
            setCategory(response.data.item.category)
            setDescription(response.data.item.description)
            setPictures(response.data.item.pictures.split(','))
            console.log('Pictures :  => ', JSON.stringify(pictures, null, '\t'))
            
            setItem(response.data.item);
            setLoading(false);
           
          })
            .catch((error) => {
              console.log(error);
            })
    },[params])
   
   
  //----------------------Picture Container Functionality------------------//
      const useStyles = makeStyles({
        button: {
          width: 80,
          height: 80,
          backgroundColor: '#B43B4C',
          '&:hover': {
           backgroundColor: '#cf3247' }
               },
        icon: {
            fontSize: 40,
            color: '#FFF'
              },
        buttonDelete: {
            position: 'absolute',
            top: -20,
            right: -20,
            width: 40,
            height: 40,
            backgroundColor: '#B43B4C',
            '&:hover': {
            backgroundColor: '#cf3247'
            }
        }
      });

   
    const classes = useStyles()

    //finds the next unused id in the pictures array
    const findNextID = () => {
        var indices = [];
        pictures.forEach((picture) => {
            indices[picture['id']] = true;
        });
        for (var i = 1, l = indices.length; i < l; i++) {
            if (indices[i] === undefined) {
                break;
            }
        }
        return i;
    }

    const handleChange = (e) => {
        if (e.target.files.length) {
        let newPictures = pictures.map((picture) => picture)
        newPictures.push({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            id: findNextID()
        })
        setPictures(newPictures)
        }
    }

    const handleDelete = (id) => {
        var newPictures = []
        for (var i = 0; i < pictures.length; i++) {
            var pic = pictures[i]

            if (pic.id !== id) {
                newPictures.push(pic)
            }
        }
        setPictures(newPictures)
    }


  //-------------------------------------------------------------------------//

    return (
        <PageWrapper>
          <Banner textBold='Editing Item' textNormal={titleText} />
          <div className="ItemMainWrapper">
            <div className="ItemInfoWrapper">
              {/* Div for Item Details */}
              <div className="RegistrationWrapper">
                  <div className="LoginMain" style={{width: "100%", marginTop:'0.5%'}} >
                    <div className="LoginHeader">Basic Item Details</div>
                    <div className="LoginHeader">Title</div>
                    <input type='text' className="LoginInput" placeholder={titleText} onBlur={(e) => setTitle(e.target.value)}/>
                    <div className="LoginHeader">Category</div>
                    <CategorySelect width="100%" label="Category" setCategory={setCategory} value={category}/>
                    <Button title="Click Me!" onClick={console.log('Button Click Event:',title, category)}>Testing Button</Button>
                  </div>
               </div>

                {/* div for the Item Description */}
              <div className="LoginMain LoginMainNoMarg" style={{width: "100%"}} >
                <div className="LoginHeader">Item Description</div>
                <div className="LoginHeader">Description</div>
                <textarea rows='10' maxLength='254' placeholder={description}className="LoginInput PostItem__TextArea" onChange={(e) => setDescription(e.target.value)} />
              </div>



            </div>
            <div className="ItemPicturesWrapper">
              {/* Div for Pictures from the database */}
              <div className="LoginMain" style={{width: "100%", marginTop:'0.5%'}}>
                <div className="LoginHeader">Item Pictures</div>
                <div className="PostItem__ItemPictures__Container">
                  {pictures.map((picture)=>{
                    return(
                      <div className="PostItem__ItemPictures__Preview" >
                       <IconButton aria-label="delete" className={classes.buttonDelete} onClick={() => handleDelete(picture.id)}>
                              <RemoveIcon className={classes.icon} />
                              </IconButton>

                              <img src={getImage(picture)} alt="" className="ProfilePicturePreview"/>
                        </div>
                    )
                  })}
                 
                </div>

                <input type="file" id="selectFile" style={{ display: "none" }} onClick={(e) => {e.target.value = null}} onChange={(e) => handleChange(e)} />
                <div className="PostItem__ItemPictures__Add__Container">
                  <IconButton aria-label="delete" className={classes.button} onClick={() => document.getElementById('selectFile').click()}>
                  <AddIcon className={classes.icon}/>
                  </IconButton>
                </div>
              </div>
             {/* Div For Item Delivery and pickup */}

            </div>
        </div>
      </PageWrapper>
        
    );
}

export default EditItemPage;