import React from 'react'
import ValidationTextInput from '../FormComponents/ValidationTextInput'
import CategorySelect from '../categorySelect/categorySelect'

export default function EditBasicDetails({ state, dispatch }) {
    const { title, category, description, } = state
    return (
        <div
        className="LoginMain"
        style={{ width: "100%", marginTop: "0.5%" }}
        >
            <div className="LoginHeader">Basic Item Details</div>
            <ValidationTextInput
            label="Title"
            placeholder={title} 
            value={title}
            onChange={(e) => dispatch({ type: 'setTitle', data: e.target.value})}
            />
            <div className="LoginHeader">Category</div>
            <CategorySelect
                width="100%"
                label="Category"
                thinBorder
                setCategory={newCategory => dispatch({ type: 'setCategory', data: newCategory})}
                value={category}
            />
            <div className="LoginHeader">Description</div>
            <textarea
                rows="10"
                maxLength="254"
                defaultValue={description}
                className="LoginInput PostItem__TextArea"
                onChange={(e) => dispatch({ type: 'setDescription', data: e.target.value })}
            />
        </div>
    )
}
