import React, { useContext, useEffect } from 'react'
import {ReactComponent as Logo} from '../../../assets/Logos/LogoRed.svg';
import CategorySelect from '../../../components/categorySelect/categorySelect';
import Button from '../../../components/Button/Button';
import ValidationTextInput from '../../../components/FormComponents/ValidationTextInput';

export default function BasicDetails({ context }) {
    const { state, dispatch } = useContext(context)
    const { title, category } = state

    useEffect(() => {
        console.log({category})
    },[category])
    
    return (
        <div className="RegistrationWrapper">
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                <div className="LoginHeader">Basic Item Details</div>
                <div className="LoginText">Provide us with some basic details so we can categorise your item correctly.</div>
                <ValidationTextInput 
                onChange={e => dispatch({ type: 'setTitle', data: e.target.value })}
                label="Title"
                />
                <div className="LoginHeader">Category</div>
                <CategorySelect 
                width="100%" 
                fontSize="18px" 
                margin="0 0 2em 0" 
                thinBorder 
                value={category}
                setCategory={category => dispatch({type: 'setCategory', data: category})}
                />
                <Button 
                text="Next"
                onClick={() => dispatch({ type: 'setCurrentPage', data: 'Item Pictures'})}
                isDisabled={!title || !category}
                />
            </div>

        </div>

    )
}
