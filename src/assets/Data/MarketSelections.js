import {
    Search,
    Message,
    Calendar,
    ThumbsUp,
    DummyCategoryImg,
    MowingImg,
    CameraImg,
    DollarSign,
    DummyAvatar1,
    DummyAvatar2,
    DummyAvatar3,
    DummyAvatar4,
    DummyBlog,
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

const rentingProcedures = [
    {
        id: 1,
        icon: MowingImg,
        title: '1. Explore And Find',
        description1: 'To book your first borrow create an account and follow the steps to verify your identity and payment details.',
        description2: 'Search for your item on our little big platform via category, location, and price. You can add an item to ‘your favourites’ before requesting a booking to borrow.',
    },
    {
        id: 2,
        icon: CameraImg,
        title: '2. Book And Pay',
        description1: 'When you’ve found an item you’d like to borrow, send a booking request to the lender. You’ll receive a notification when your booking has been accepted. It’ll automatically be added to your in-app calendar and the lender fee will be deducted from your account. At the time of booking a 10% deposit is taken. The remaining balance is paid once the share is complete.',
        description2: 'If you change your mind, no worries. Find out more about our cancellation policy. Use the chat function in the app to ask the lender any questions and arrange handover details. You can choose to have your item delivered and/or picked up from the lender for an additional fee or arrange contactless sharing.',
    },
    {
        id: 3,
        icon: DollarSign,
        title: '3. Collect And Enjoy',
        description1: 'Now you’re ready to make, mend or learn! If you’ve arranged to meet the lender in person, it’s a good chance to ask them about any tips/quirks for using the item.',
        description2: 'When using the item, take care and show respect as if it was your own. If you come across any issues during your borrow, learn what to do.',
    },
    {
        id: 4,
        icon: Message,
        title: '4. Return And rate',
        description1: 'Once you have returned the item and the lender is happy that it’s still in good condition, they will confirm the share is complete.',
        description2: 'Help build trust in your neighbourhood by leaving a review about the lender and item via our 5-star rating system.',
    },
]

const damagedProcedures = [
    {
        id: 1,
        icon: ThumbsUp,
        title: '1. Photos Or Videos',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 2,
        icon: Message,
        title: '2. When do I report?',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 3,
        icon: MowingImg,
        title: '3. Borrower Communication',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 4,
        icon: DollarSign,
        title: '4. Reach Out To Us',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
]

const teamMembers = [
    {
        id: 1,
        avatar: DummyAvatar1,
        firstName: 'Test',
        lastName: 'Name',
        position: 'Position',
        title: 'Title',
        description: 'pariatur incididunt. Id ut sunt do non excepteur. Ullamco enim ea consectetur in nisi amet ex minim quis ullamco cillum quis est. Laborum tempor quis dolore ut et quis dolor culpa in incididunt nulla consectetur Lorem. Sit anim est dolor officia eu esse ex ipsum. Aute et magna aliquip anim. Deserunt eiusmod qui in incididunt est non excepteur laborum amet.',
    },
    {
        id: 2,
        avatar: DummyAvatar2,
        firstName: 'Test',
        lastName: 'Name',
        position: 'Position',
        title: 'Title',
        description: 'pariatur incididunt. Id ut sunt do non excepteur. Ullamco enim ea consectetur in nisi amet ex minim quis ullamco cillum quis est. Laborum tempor quis dolore ut et quis dolor culpa in incididunt nulla consectetur Lorem. Sit anim est dolor officia eu esse ex ipsum. Aute et magna aliquip anim. Deserunt eiusmod qui in incididunt est non excepteur laborum amet.',
    },
    {
        id: 3,
        avatar: DummyAvatar3,
        firstName: 'Test',
        lastName: 'Name',
        position: 'Position',
        title: 'Title',
        description: 'pariatur incididunt. Id ut sunt do non excepteur. Ullamco enim ea consectetur in nisi amet ex minim quis ullamco cillum quis est. Laborum tempor quis dolore ut et quis dolor culpa in incididunt nulla consectetur Lorem. Sit anim est dolor officia eu esse ex ipsum. Aute et magna aliquip anim. Deserunt eiusmod qui in incididunt est non excepteur laborum amet.',
    },
    {
        id: 4,
        avatar: DummyAvatar4,
        firstName: 'Test',
        lastName: 'Name',
        position: 'Position',
        title: 'Title',
        description: 'pariatur incididunt. Id ut sunt do non excepteur. Ullamco enim ea consectetur in nisi amet ex minim quis ullamco cillum quis est. Laborum tempor quis dolore ut et quis dolor culpa in incididunt nulla consectetur Lorem. Sit anim est dolor officia eu esse ex ipsum. Aute et magna aliquip anim. Deserunt eiusmod qui in incididunt est non excepteur laborum amet.',
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

const dummyBlog = [
    {
        id: 1,
        image: DummyBlog,
        title: 'Little Big Shed Launches New Online Community Sharing App',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
    },
    {
        id: 2,
        image: DummyBlog,
        title: 'Real Stories: Rodger',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
    },
    {
        id: 3,
        image: DummyBlog,
        title: 'A new look a camping gear',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
    },
    {
        id: 4,
        image: DummyBlog,
        title: 'Little Big Shed Launches New Online Community Sharing App',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
    },
    {
        id: 5,
        image: DummyBlog,
        title: 'The Origins of Little Big Shed: Founders Story',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
    },
]

export { 
    procedures, 
    rentOutProcedures,
    rentingProcedures,
    damagedProcedures,
    teamMembers,
    dummyCategory, 
    dummyBlog,
}