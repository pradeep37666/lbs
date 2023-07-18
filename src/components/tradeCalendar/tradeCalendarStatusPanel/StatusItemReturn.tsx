import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  toggleReviewModal: () => void
}

export const StatusItemReturn = ({ isLender, toggleReviewModal }: Props) => {
  return (
    <div className='TradeStatusContentContainer'>
      {isLender ? (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Fantastic! Your item has been returned!
          </span>
          <StatusButton
            text='Rate borrower'
            type='blue'
            onClick={toggleReviewModal}
            width='100%'
          />
        </>
      ) : (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Item returned, thank you for borrowing this item with Little Big
            Shed.
          </span>
          <StatusButton
            text='Rate Lender'
            type='blue'
            onClick={toggleReviewModal}
            width='100%'
          />
        </>
      )}
    </div>
  )
}

export default StatusItemReturn
