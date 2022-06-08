import {
    Search,
    Message,
    Calendar,
    ThumbsUp,
    DummyCategoryImg,
    MowingImg,
    CameraImg,
    DollarSign,
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

const rentOutProcedures = [
    {
        id: 1,
        icon: MowingImg,
        title: '1. Create And List',
        description1: 'To start sharing create an account and follow the steps to verify your identity and payment details. You can select the days and times you are available to share – giving you full control over lending out your shed.',
        description2: 'To list an item, click the ‘post item’ button – select a category, upload photos, write a description, and set your price with the help of our handy calculator tool. Learn more about how to successfully rent out your items in our listing tips.',
    },
    {
        id: 2,
        icon: CameraImg,
        title: '2. Snap some photos',
        description1: 'You’ll receive an alert notification in the app when your item has been requested. You can choose to confirm or decline the booking. Once confirmed, the booking will automatically be added to your in-app calendar.',
        description2: 'Use the chat function in the app to respond to any questions from the borrower and to arrange handover details. You can also choose to deliver and/or pick up your item from the borrower for an additional fee – which also supports contactless sharing.',
    },
    {
        id: 3,
        icon: DollarSign,
        title: '3. Pick A Price',
        description1: 'If you’ve arranged to meet the borrower in person, it’s a good chance to show them any tips/quirks about using your item. You can also upload additional ‘how to use’ instructions on the item listing.',
        description2: 'Once the handover is complete, sit back and relax worry-free, knowing that we have you covered if something goes wrong! Check out our lender protection policy to find out more about sharing with our verified users.',
    },
    {
        id: 4,
        icon: Message,
        title: '4. Chat To Borrowers',
        description1: 'Once your item is safely returned, build trust in your neighbourhood by reviewing the borrower via our 5-star rating system. When you have confirmed the share is complete, you’ll be paid for doing good directly into your bank account.',
        description2: 'We take no platform service fee but a 2.9% payment processing fee: FAQs + 30c transaction fee will be deducted by our third party provider from what you get paid Learn more about how payment works.',
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

export { 
    procedures, 
    rentOutProcedures,
    dummyCategory, 
}