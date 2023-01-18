import ValidationTextInput from '../FormComponents/ValidationTextInput'
import LBSSwitch from '../LBSSwitch/LBSSwitch'
import { Fade } from '@material-ui/core'

export default function EditPriceDetails({ state, dispatch }) {
  const { isEditItemDiscount, editItemPrice, editItemDiscount } = state

  return (
    <div className='LoginMain LoginMainNoMarg' style={{ width: '100%' }}>
      <div className='LoginHeader'>Item Price</div>
      <div className='LoginText'>
        Select a paid per option and price based on what you want from this
        item.
      </div>

      <ValidationTextInput
        label='Price ($)'
        value={editItemPrice}
        onChange={e =>
          dispatch({
            type: 'setEditItemPrice',
            data: e.target.valueAsNumber,
          })
        }
        inputType='number'
      />

      <div className='BecomeLenderFlex'>
        <div className='LoginHeader' style={{ width: 'auto' }}>
          Off Peak Discount
        </div>
        <div className='LenderSwitchInfoFlex'>
          <LBSSwitch
            onClick={() =>
              dispatch({
                type: 'setIsEditItemDiscount',
                data: !isEditItemDiscount,
              })
            }
            isChecked={isEditItemDiscount}
            text='Yes'
          />
        </div>
      </div>
      <Fade in={isEditItemDiscount} timeout={300} mountOnEnter unmountOnExit>
        <div>
          <div className='LoginText'>
            Allow borrowers to receive an off peak time discount to incentivise
            mid week trading
          </div>
          <ValidationTextInput
            onChange={e =>
              dispatch({ type: 'setEditItemDiscount', data: e.target.value })
            }
            inputType='number'
            value={editItemDiscount}
          />
          <div className='LoginText' style={{ marginTop: '3%', flex: 3 }}>
            Off Peak Discount Rate
          </div>
        </div>
      </Fade>
    </div>
  )
}
