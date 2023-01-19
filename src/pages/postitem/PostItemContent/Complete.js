import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import Location from '../../../assets/Icons/LocationIcon.svg'
import Delivery from '../../../assets/Icons/DeliveryIcon.svg'
import Category from '../../../assets/Icons/CategoriesIcon.svg'
import { useHistory } from 'react-router'

export default function Complete(props) {
  const history = useHistory()
  return (
    <>
      <div className='LoginMain'>
        <Logo height='50px' width='50px' style={{ marginBottom: '2em' }} />

        <div className='LoginHeader PostItem__Complete__TextCenter'>
          Item Posted!
        </div>
        <div className='LoginText LoginTextSmall PostItem__Complete__TextCenter'>
          You have successfully posted your{' '}
          <span className='PostItem__Complete__Bold'>‘{props.title}’</span> to
          Little Big Shed
        </div>
        <button
          className='LoginFormButton'
          onClick={() => history.push({ pathname: '/user/account' })}
          style={{ marginBottom: '1em' }}
        >
          Continue
        </button>
        <button
          className='LoginFormButton LoginFormButtonInverted'
          onClick={() => history.go(0)}
        >
          List Another Item
        </button>
      </div>

      <div className='LoginMain LoginMainNoMarg'>
        <div className='PostItem__Complete__ItemPreview'>
          <img
            src={props.picture.preview}
            alt={props.title}
            className='PostItem__Complete__ItemImage'
          />
        </div>
        <div className='PostItem__Complete__ItemDetails__Container'>
          <div className='ItemNameText'>{props.title}</div>
          <div className='ItemPriceText'>${props.price}</div>

          <div className='LocationDeliveryCategory'>
            <div className='LDCIconContainer'>
              <img src={Location} alt='' className='LDCIcon' />
            </div>
            {props.city}
          </div>
          <div className='LocationDeliveryCategory'>
            {props.deliveryOption === 'BOTH' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.9em',
                  }}
                >
                  <div
                    className={`${
                      props.deliveryPrice > 0 ? 'LDCIconContainer' : 'Hide'
                    }`}
                  >
                    <img
                      src={Delivery}
                      alt=''
                      className='LDCIcon'
                      style={{ height: '22px' }}
                    />
                  </div>
                  <div>
                    Delivery Available&nbsp;
                    <span
                      className={`${props.deliveryPrice > 0 ? '' : 'Hide'}`}
                    >
                      /
                    </span>
                    <span
                      className={`DeliveryFeeText ${
                        props.deliveryPrice > 0 ? '' : 'Hide'
                      }`}
                    >
                      &nbsp;${props.deliveryPrice} Delivery Fee
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.9em',
                  }}
                >
                  <div
                    className={`${
                      props.pickupPrice > 0 ? 'LDCIconContainer' : 'Hide'
                    }`}
                  >
                    <img
                      src={Delivery}
                      alt=''
                      className='LDCIcon'
                      style={{ height: '22px' }}
                    />
                  </div>
                  <div>
                    Pickup Available&nbsp;
                    <span className={`${props.pickupPrice > 0 ? '' : 'Hide'}`}>
                      /
                    </span>
                    <span
                      className={`DeliveryFeeText ${
                        props.pickupPrice > 0 ? '' : 'Hide'
                      }`}
                    >
                      &nbsp;${props.pickupPrice} Pickup Fee
                    </span>
                  </div>
                </div>
              </div>
            )}
            {props.deliveryOption === 'DELIVERY' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.9em',
                  }}
                >
                  <div
                    className={`${
                      props.deliveryPrice > 0 ? 'LDCIconContainer' : 'Hide'
                    }`}
                  >
                    <img
                      src={Delivery}
                      alt=''
                      className='LDCIcon'
                      style={{ height: '22px' }}
                    />
                  </div>
                  <div>
                    Delivery Only&nbsp;
                    <span
                      className={`${props.deliveryPrice > 0 ? '' : 'Hide'}`}
                    >
                      /
                    </span>
                    <span
                      className={`DeliveryFeeText ${
                        props.deliveryPrice > 0 ? '' : 'Hide'
                      }`}
                    >
                      &nbsp;${props.deliveryPrice} Delivery Fee
                    </span>
                  </div>
                </div>
              </div>
            )}
            {props.deliveryOption === 'PICKUP' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '0.9em',
                  }}
                >
                  <div
                    className={`${
                      props.pickupPrice > 0 ? 'LDCIconContainer' : 'Hide'
                    }`}
                  >
                    <img
                      src={Delivery}
                      alt=''
                      className='LDCIcon'
                      style={{ height: '22px' }}
                    />
                  </div>
                  <div>
                    Pickup Only&nbsp;
                    <span className={`${props.pickupPrice > 0 ? '' : 'Hide'}`}>
                      /
                    </span>
                    <span
                      className={`DeliveryFeeText ${
                        props.pickupPrice > 0 ? '' : 'Hide'
                      }`}
                    >
                      &nbsp;${props.pickupPrice} Pickup Fee
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={'LocationDeliveryCategory'}>
            <div className='LDCIconContainer'>
              <img src={Category} alt='' className='LDCIcon' />
            </div>
            {props.category}
          </div>
        </div>
        <button
          className='LoginFormButton'
          onClick={() => {
            if (!props.itemID) return
            else history.push(`/item/${props.itemID}`)
          }}
          style={{ marginBottom: '1em' }}
        >
          See Item
        </button>
      </div>
    </>
  )
}
