import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import LBSSwitch from '../../../components/LBSSwitch/LBSSwitch'
import { Fade } from '@material-ui/core'
import Button from '../../../components/Button/Button'
import ValidationTextInput from '../../../components/FormComponents/ValidationTextInput'
import { DELIVERY_OPTIONS } from '../../../assets/Data/LBSSelectOptions'
import LBSSelectBox from '../../../components/LBSSelectBox/LBSSelectBox'
import { POST_ITEM_PAGE } from '../../../assets/Data/LBSEnum'
import { validate } from 'validate.js'
import { discountConstraints } from '../../../util/validationConstraints'

export default function AdvancedDetails({ context }) {
  const [isDiscount, setIsDiscount] = useState(false)
  const [errorMessages, setErrorMessages] = useState({})
  const { state, dispatch } = useContext(context)
  const {
    postItemDescription,
    postItemPrice,
    postItemDiscount,
    postItemDeliveryPrice,
    postItemPickupPrice,
    postItemDeliveryOption,
  } = state

  useEffect(() => {
    if (Object.keys(errorMessages).length > 0) {
      const valid = validateInputs()
      if (valid) {
        setErrorMessages({})
        return
      }
    }
  }, [
    postItemDescription,
    postItemPrice,
    postItemDiscount,
    postItemDeliveryPrice,
    postItemPickupPrice,
    postItemDeliveryOption,
  ])

  const getErrorMessage = inputName => {
    if (Object.keys(errorMessages).length === 0) return null
    for (const key in errorMessages) {
      if (Object.keys(errorMessages)[0] === inputName)
        return errorMessages[key][0]
    }
  }

  const validateInputs = () => {
    const validationErrors = validate({ postItemDiscount }, discountConstraints)
    if (validationErrors) {
      setErrorMessages(validationErrors)
      return false
    }
    setErrorMessages({})
    return true
  }

  const disabledDeliveryOption = () => {
    if (!postItemDeliveryOption) return true
    if (postItemDeliveryOption === 'BOTH') {
      if (!postItemDeliveryPrice || !postItemPickupPrice) return true
    }
    if (postItemDeliveryOption === 'DELIVERY') {
      if (!postItemDeliveryPrice) return true
    }
    if (postItemDeliveryOption === 'PICKUP') {
      if (!postItemPickupPrice) return true
    }
    return false
  }

  return (
    <div className='RegistrationWrapper'>
      <div className='LoginMain'>
        <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

        <div className='LoginHeader'>Advanced Details</div>
        <div className='LoginText' style={{ padding: 0 }}>
          <p>
            These details are needed to tell Little Big Shed borrowers finer
            details on items.
          </p>
          <p>
            Please include as much detail as you can when filling this out as
            borrowers will be more likely to borrow from you if there is a great
            amount of detail.
          </p>
        </div>
      </div>
      <div className='LoginMain LoginMainNoMarg'>
        <div className='LoginHeader'>Item Description</div>
        <div className='LoginText'>
          Be as in-depth and detail orientated as you can be, users like reading
          great description on products.
        </div>

        <div className='LoginHeader'>Description</div>
        <textarea
          rows='10'
          maxLength='254'
          value={postItemDescription}
          placeholder='Describe your item!'
          className='LoginInput PostItem__TextArea'
          onChange={e =>
            dispatch({ type: 'setPostItemDescription', data: e.target.value })
          }
        />
      </div>

      <div className='LoginMain LoginMainNoMarg'>
        <div className='LoginHeader'>Charge out cost</div>
        <div className='LoginText'>
          Define a price you would like your item to be charged out at on a per
          slot basis. Slots are 4 hours long.
        </div>

        <ValidationTextInput
          label='Price ($)'
          onChange={e =>
            dispatch({
              type: 'setPostItemPrice',
              data: parseInt(e.target.value) || '',
            })
          }
          inputType='number'
          placeholder='$20'
          value={postItemPrice}
        />

        <div className='BecomeLenderFlex'>
          <div className='LoginHeader' style={{ width: 'auto' }}>
            Off Peak Discount
          </div>
          <div className='LenderSwitchInfoFlex'>
            <LBSSwitch
              onClick={() => setIsDiscount(!isDiscount)}
              isChecked={isDiscount}
              text='Yes'
            />
          </div>
        </div>
        <Fade in={isDiscount} timeout={300} mountOnEnter unmountOnExit>
          <div>
            <div className='LoginText'>
              Define a price you would like your item to be charged out at, on a
              per slot basis. Slots are 4 hours long{` (% of Price)`}.
            </div>
            <ValidationTextInput
              inputType='number'
              value={postItemDiscount.toString()}
              onChange={e =>
                dispatch({
                  type: 'setPostItemDiscount',
                  data: parseInt(e.target.value) || '',
                })
              }
              placeholder='5%'
              errorMessage={getErrorMessage('postItemDiscount')}
            />
          </div>
        </Fade>
      </div>

      <div className='LoginMain LoginMainNoMarg'>
        <div className='LoginHeader'>Delivery &amp; Pick up price</div>
        <div className='LoginText'>
          Enter the price you would like to charge out for picking up and
          delivery. If you don't want to offer this service, leave this empty.
        </div>
        <LBSSelectBox
          selectOption={DELIVERY_OPTIONS}
          width='100%'
          fontSize='18px'
          margin='0 0 2em 0'
          thinBorder
          value={postItemDeliveryOption ?? ''}
          onChange={option =>
            dispatch({ type: 'setPostItemDeliveryOption', data: option })
          }
        />

        {(postItemDeliveryOption === 'DELIVERY' ||
          postItemDeliveryOption === 'BOTH') && (
          <>
            <div className='LoginHeader'>Delivery Fee ($)</div>
            <ValidationTextInput
              inputType='number'
              value={postItemDeliveryPrice}
              onChange={e =>
                dispatch({
                  type: 'setPostItemDeliveryPrice',
                  data: e.target.value,
                })
              }
              placeholder='$10'
            />
          </>
        )}

        {(postItemDeliveryOption === 'PICKUP' ||
          postItemDeliveryOption === 'BOTH') && (
          <>
            <div className='LoginHeader'>Pickup Fee ($)</div>
            <ValidationTextInput
              inputType='number'
              value={postItemPickupPrice}
              onChange={e =>
                dispatch({
                  type: 'setPostItemPickupPrice',
                  data: e.target.value,
                })
              }
              placeholder='$10'
            />
          </>
        )}
        <Button
          text='Next'
          onClick={() => {
            const valid = validateInputs()
            if (!valid) return
            dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.LOCATION })
          }}
          isDisabled={
            !postItemDescription || !postItemPrice || disabledDeliveryOption()
          }
        />
      </div>
    </div>
  )
}
