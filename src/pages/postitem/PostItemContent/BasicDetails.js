import { useContext } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import CategorySelect from '../../../components/categorySelect/categorySelect'
import Button from '../../../components/Button/Button'
import ValidationTextInput from '../../../components/FormComponents/ValidationTextInput'
import { POST_ITEM_PAGE } from '../../../assets/Data/LBSEnum'

export default function BasicDetails({ context }) {
  const { state, dispatch } = useContext(context)
  const { postItemTitle, postItemCategory } = state

  return (
    <div className="RegistrationWrapper">
      <div className="LoginMain">
        <Logo height="50px" width="50px" style={{ marginBottom: '.5em' }} />
        <div className="LoginHeader">Basic Item Details</div>
        <div className="LoginText">
          Provide us with some basic details so we can categorise your item
          correctly.
        </div>
        <ValidationTextInput
          onChange={e =>
            dispatch({ type: 'setPostItemTitle', data: e.target.value })
          }
          label="Title"
          value={postItemTitle}
        />
        <div className="LoginHeader">Category</div>
        <CategorySelect
          width="100%"
          fontSize="18px"
          margin="0 0 2em 0"
          thinBorder
          value={postItemCategory}
          setCategory={category =>
            dispatch({ type: 'setPostItemCategory', data: category })
          }
        />
        <Button
          text="Next"
          onClick={() =>
            dispatch({
              type: 'setCurrentPage',
              data: POST_ITEM_PAGE.PICTURES,
            })
          }
          isDisabled={!postItemTitle || !postItemCategory}
        />
      </div>
    </div>
  )
}
