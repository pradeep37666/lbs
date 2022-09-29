import React, { useState } from 'react'
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import { CometChat } from '@cometchat-pro/chat'
import { useHistory } from 'react-router-dom'

type Props = {
	onClick: () => void
	userId: string
	isOpen: boolean
}

const ColdChatModal = ({ onClick, userId, isOpen }: Props) => {
	const [chatText, setChatText] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const history = useHistory()

	const startColdChat = async () => {
		if (chatText === '') onClick()
		const textMessage = new CometChat.TextMessage(
			userId,
			chatText,
			CometChat.RECEIVER_TYPE.USER
		)
		try {
			setIsLoading(true)
			await CometChat.sendMessage(textMessage)
			history.push('/user/messages')
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isOpen} onClose={onClick}>
			<DialogContent className='BorrowerMain'>
				<span className='ApplicationModalTitle'>Start Chat</span>
				<br></br>
				{/* <span className="ApplicationModalText">Add some text to prompt users to send a message</span> */}
				<textarea
					rows={10}
					maxLength={254}
					className='LoginInput PostItem__TextArea'
					onChange={(e) => setChatText(e.target.value)}
				/>
				{isLoading ? (
					<div className='ApplicationModalButton' style={{ margin: '1rem 0' }}>
						<CircularProgress size={30} style={{ color: '#000' }} />
					</div>
				) : (
					<div
						className='ApplicationModalButton'
						onClick={startColdChat}
						style={{ margin: '1rem 0' }}>
						<span className='ApplicationModalButtonText'>Send</span>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default ColdChatModal
