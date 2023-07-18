import { UserTradeData } from '../../../types/User'
import getCancelledText from '../../../util/tradeUtils/getCancelledText'
import StatusButton from './StatusButton'

type Props = {
  userDetails: UserTradeData
  status: string
  isLender: boolean
}

export const StatusRejected = ({ userDetails, status, isLender }: Props) => {
  const statusText = getCancelledText(status, isLender, userDetails)

  return (
    <div className='TradeStatusContentContainer'>
      <span style={{ marginBottom: '0.5em' }}>{statusText}</span>
      <StatusButton text={statusText} nonBtn={true} />
    </div>
  )
}

export default StatusRejected
