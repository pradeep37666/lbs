import {
    Search,
    Message,
    Calendar,
    ThumbsUp,
    DummyCategoryImg,
} from '../Images/Marketings/Marketings'

const procedures = [
    {
        id: 1,
        icon: Search,
        title: '1. Explore and Find',
        description: 'Search our little big platform to be matched with neighbours nearby who want to share that item.',
    },
    {
        id: 2,
        icon: Calendar,
        title: '2. Book and Pay',
        description: 'Create an account to book in your first borrow. You’ll receive a notification from the lender once accepted.',
    },
    {
        id: 3,
        icon: Message,
        title: '3. Collect and Enjoy',
        description: 'Use the app chat to connect and arrange pickup details with the lender. Now you’re ready to make, mend or explore!',
    },
    {
        id: 4,
        icon: ThumbsUp,
        title: '4. Return and Rate',
        description: 'Return your borrow when agreed and in the same condition you found it. Review your share using our rating system and help build trust in your hood.',
    },
]

const dummyCategory = [
    {
        id: 1,
        category: 'Tools',
        items: 21056,
        image: DummyCategoryImg
    },
    {
        id: 2,
        category: 'Gardening',
        items: 16702,
        image: DummyCategoryImg
    },
    {
        id: 3,
        category: 'Events & Parties',
        items: 12334,
        image: DummyCategoryImg
    },
    {
        id: 4,
        category: 'Hobbies',
        items: 4586,
        image: DummyCategoryImg
    },
    {
        id: 5,
        category: 'Outdoor',
        items: 21056,
        image: DummyCategoryImg
    },
    {
        id: 6,
        category: 'Kids',
        items: 16702,
        image: DummyCategoryImg
    },
    {
        id: 7,
        category: 'Vehicle',
        items: 12334,
        image: DummyCategoryImg
    },
    {
        id: 8,
        category: 'Closet',
        items: 4586,
        image: DummyCategoryImg
    },
]

export { procedures, dummyCategory }