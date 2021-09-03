import React from 'react'
import {ReactComponent as Logo} from '../../../assets/Logos/LogoRed.svg';
import CategorySelect from '../../../components/categorySelect/categorySelect';

export default function BasicDetails(props) {
    return (
        <div className="RegistrationWrapper">
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                <div className="LoginHeader">Basic Item Details</div>
                <div className="LoginText">Provide us with some basic details so we can categorise your item correctly.</div>

                <div className="LoginHeader">Title</div>
                <input type='text' className="LoginInput" onBlur={(e) => props.setTitle(e.target.value)}/>

                <div className="LoginHeader">Category</div>
                <CategorySelect width="100%" fontSize="18px" margin="0 0 2em 0" thinBorder setCategory={props.setCategory}/>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Item Pictures')}>Next</button>

            </div>

        </div>

    )
}
