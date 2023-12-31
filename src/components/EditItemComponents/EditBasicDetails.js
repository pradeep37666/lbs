import React, { useEffect } from 'react'
import ValidationTextInput from '../FormComponents/ValidationTextInput'
import CategorySelect from '../categorySelect/categorySelect'

export default function EditBasicDetails({ state, dispatch }) {
  const { editItemTitle, editItemCategory, editItemDescription } = state

  return (
    <div className='LoginMain' style={{ width: '100%', marginTop: '0.5%' }}>
      <div className='LoginHeader'>Basic Item Details</div>
      <ValidationTextInput
        label='Title'
        placeholder={editItemTitle}
        value={editItemTitle}
        onChange={e =>
          dispatch({ type: 'setEditItemTitle', data: e.target.value })
        }
      />
      <div className='LoginHeader'>Category</div>
      <div className='LoginHeader'>
        <CategorySelect
          width='100%'
          label='Category'
          thinBorder
          setCategory={newCategory =>
            dispatch({ type: 'setEditItemCategory', data: newCategory })
          }
          value={editItemCategory}
        />
      </div>
      <div className='LoginHeader'>Description</div>
      <textarea
        rows='10'
        maxLength='254'
        defaultValue={editItemDescription}
        className='LoginInput PostItem__TextArea'
        onChange={e =>
          dispatch({ type: 'setEditItemDescription', data: e.target.value })
        }
      />
    </div>
  )
}
