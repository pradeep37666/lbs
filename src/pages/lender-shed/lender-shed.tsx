import { useEffect, useState } from 'react'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserService from '../../services/user'
import { User } from '../../types/User'
import useErrorState from '../../util/reducers/errorContext'
import { CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import UserProfileCard from '../../components/cards/user-profile-card'
import Button from '../../components/core/button'
import ReviewCard from '../../components/reviewCard/reviewCard'
import { Rating } from '../../types/Rating'
import { Item } from '../../types/Item'
import ItemCard from '../../components/itemCard/itemCard'
import ColdChatModal from '../../components/modals/ColdChatModal.js/ColdChatModal'

function LenderShed() {
	const userService = new UserService()
	const history = useHistory()
	const { errorDispatch } = useErrorState()

	const [lender, setLender] = useState<User>()
	const [lenderReviews, setLenderReviews] = useState<Rating[]>([])
	const [lenderItems, setLenderItems] = useState<Item[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isColdChatOpen, setIsColdChatOpen] = useState(false)

	const params: {
		lenderId?: string
	} = useParams()

	const getLender = async () => {
		if (!params.lenderId) {
			history.push('/search')
			return
		}

		try {
			const lenderResult = await userService.getOne(params.lenderId)

			console.log(lenderResult)
			setLender(lenderResult)
		} catch (error) {
			errorDispatch({
				type: 'openSnackBar',
				data: {
					message: 'Failed to get Lender information, please try again.',
					btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
					btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
				},
			})
			history.push('/search')
		} finally {
			setIsLoading(false)
		}
	}

	const getLenderReviews = async () => {
		if (!params.lenderId) {
			history.push('/search')
			return
		}

		try {
			const reviewsResult = await userService.getLenderReviews(params.lenderId)

			console.log(reviewsResult)
			setLenderReviews(reviewsResult)
		} catch (error) {
			errorDispatch({
				type: 'openSnackBar',
				data: {
					message: 'Failed to get Lender information, please try again.',
					btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
					btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
				},
			})
			history.push('/search')
		} finally {
			setIsLoading(false)
		}
	}

	const getLenderItems = async () => {
		if (!params.lenderId) {
			history.push('/search')
			return
		}

		try {
			const itemsResult = await userService.getLenderItems(params.lenderId)

			console.log(itemsResult)
			setLenderItems(itemsResult)
		} catch (error) {
			errorDispatch({
				type: 'openSnackBar',
				data: {
					message: 'Failed to get Lender information, please try again.',
					btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
					btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
				},
			})
			history.push('/search')
		} finally {
			setIsLoading(false)
		}
	}

	const getLenderData = async () => {
		await Promise.all([getLender(), getLenderReviews(), getLenderItems()])
	}

	const renderLenderReviews = () => {
		return lenderReviews.map((review, index) => {
			return (
				<ReviewCard
					review={review}
					isOnlyOne={lenderReviews.length > 1 ? false : true}
					key={index}
				/>
			)
		})
	}

	const renderLenderItems = () => {
		return lenderItems.map((item, index) => {
			return <ItemCard item={item} key={index} favourited={false} />
		})
	}

	useEffect(() => {
		getLenderData()
	}, [])

	if (isLoading)
		return (
			<PageWrapper>
				<main
					id='Lender Shed'
					className='py-[5%] w-full px-[15%] flex justify-center items-center'>
					<CircularProgress size={75} style={{ color: '#ac172c' }} />
				</main>
			</PageWrapper>
		)

	if (!lender) return

	return (
		<PageWrapper>
			<main id='Lender Shed' className='py-[5%] w-full px-[15%]'>
				<section className='grid grid-cols-[1fr_3fr] gap-8 w-full'>
					<ColdChatModal
						userId={lender.id}
						isOpen={isColdChatOpen}
						onClick={() => setIsColdChatOpen(false)}
					/>

					<section>
						<h1 className='font-bold text-[35px] text-blue-base mb-4'>Overview</h1>

						<p className='font-bold text-[14px] mb-2'>Users Account</p>

						<UserProfileCard user={lender} />

						<Button
							onClick={() => setIsColdChatOpen(true)}
							text={`Message ${lender.firstName}`}
							className='bg-white text-black-base hover:bg-white mb-4'
						/>

						<p className='font-bold text-[14px] mb-2'>Lender Reviews</p>

						<section>{renderLenderReviews()}</section>
					</section>

					<section>
						<h1 className='font-bold text-[35px] text-blue-base mb-4'>
							{lender.firstName}'s Shed
						</h1>

						<section className='flex-wrap flex gap-4'>{renderLenderItems()}</section>
					</section>
				</section>
			</main>
		</PageWrapper>
	)
}

export default LenderShed
