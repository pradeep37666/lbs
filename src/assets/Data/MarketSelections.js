import {
    Search,
    Message,
    Calendar,
    ThumbsUp,
    MowingImg,
    CameraImg,
    DollarSign,
    DummyAvatar1,
    DummyAvatar2,
    DummyAvatar3,
    DummyAvatar4,
    DummyBlog,
    Tools,
    Gardening,
    Events,
    Hobbies,
    Outdoor,
    Kids,
    Vehicle,
    Closet,
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
        title: '1. Create and List',
        procedureDesc: <p>
            To start sharing <a style={{fontWeight: '600'}} href='/#/register'>create an account</a> and follow the steps to verify your identity and payment details.<br /><br />
            You can select the days and times you are available to share – giving you full control over lending out your shed.<br /><br />
            To list an item, click the ‘post item’ button – select a category, upload photos, write a description, and set your price with the help of our handy calculator tool.<br /><br />
            Learn more about how to successfully rent out your items in our <a style={{fontWeight: '600'}} href='/#/register'>listing tips</a>: link to FAQs section on images and description etc…
        </p>
    },
    {
        id: 2,
        icon: CameraImg,
        title: '2. Accept and Arrange',
        procedureDesc: <p>
            You'll receive an alert notification in the app when your item has been requested. You can choose to confirm or decline the booking.<br /><br />
            Once confirmed, the booking will automatically be added to your in-app calendar.<br /><br />
            Use the chat function in the app to respond to any questions from the borrower and to arrange handover details.<br /><br />
            You can also choose to deliver and/or pick up your item from the borrower for an additional fee – which also supports contactless sharing:link to Covid FAQ.
        </p>
    },
    {
        id: 3,
        icon: DollarSign,
        title: '3. Connect and Share ',
        procedureDesc: <p>
            If you’ve arranged to meet the borrower in person, it’s a good chance to show them any tips/quirks about using your item.<br /><br />
            You can also upload additional ‘how to use’ instructions on the item listing.<br /><br />
            Once the handover is complete, sit back and relax worry-free, knowing that we have you covered if something goes wrong! Check out our <a style={{fontWeight: '600'}} href='/#/lend_your_stuff'>lender protection</a> policy to find out more about sharing with our verified users.
        </p>
    },
    {
        id: 4,
        icon: Message,
        title: '4. Rate and Get Paid',
        procedureDesc: <p>
            Once your item is safely returned, build trust in your neighbourhood by reviewing the borrower via our 5-star rating system.<br /><br />
            When you have confirmed the share is complete, you’ll be paid for doing good directly into your bank account.<br /><br />
            We take no platform service fee but a 2.9% payment processing fee + 30c transaction fee will be deducted by our third party provider from what you get paid.<br /><br />
            Learn more about how payment works: link to FAQs section on lender payment. 
        </p>
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

const howItWorksProcedures = [
    {
        id: 1,
        icon: Search,
        title: 'Explore and Find',
        description: 'Search our little big platform to be matched with neighbours nearby who want to share that item.',
    },
    {
        id: 2,
        icon: Calendar,
        title: 'Book and Pay',
        description: 'Create an account to book in your first borrow. You’ll receive a notification from the lender once accepted.',
    },
    {
        id: 3,
        icon: Message,
        title: 'Collect and Enjoy',
        description: 'Use the app chat to connect and arrange pickup details with the lender. Now you’re ready to make, mend or explore!',
    },
    {
        id: 4,
        icon: ThumbsUp,
        title: 'Return and Rate',
        description: 'Return your borrow when agreed and in the same condition you found it. Review your share using our rating system and help build trust in your hood.',
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

const categories = [
    {
        id: 1,
        category: 'Tools',
        items: 21056,
        image: Tools
    },
    {
        id: 2,
        category: 'Gardening',
        items: 16702,
        image: Gardening
    },
    {
        id: 3,
        category: 'Events & Parties',
        items: 12334,
        image: Events
    },
    {
        id: 4,
        category: 'Hobbies',
        items: 4586,
        image: Hobbies
    },
    {
        id: 5,
        category: 'Outdoor',
        items: 21056,
        image: Outdoor
    },
    {
        id: 6,
        category: 'Kids',
        items: 16702,
        image: Kids
    },
    {
        id: 7,
        category: 'Vehicle',
        items: 12334,
        image: Vehicle
    },
    {
        id: 8,
        category: 'Closet',
        items: 4586,
        image: Closet
    },
]

const dummyBlog = [
    {
        id: 1,
        image: DummyBlog,
        title: 'Little Big Shed Launches New Online Community Sharing App',
        subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
        contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood.',
        contentBody: `We wanted to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good. Now we can all afford to make, mend, learn (and earn) by sharing tools, hobby gear, leisure equipment and plenty more, from like-minded neighbourhood locals!<br /><br/>
        Sound good? It gets better. There’s also no service fee for using our platform – Little Big Shed covers its own running costs so that lenders earn more from sharing their items and borrowers save more from not having to buy new. <br /><br />
        Our equipment rental app means that absolutely anything you have in your little shed (whether that be a garage, a kitchen drawer or a cupboard shelf!) can become part of something much bigger — the sharing economy. Around the world, people are sharing their equipment, their homes, their cars and their skills. This act of sharing helps local communities save money and supports your neighbours to make money.<br /><br /> 
        The sharing economy is projected to explode, according to Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be worth more than NZ$483b. The five key sectors include peer-to-peer finance, peer-to-peer accommodation, car sharing, music, TV and video streaming, and online staffing. In China alone, there are over 600 million users of shared services and platforms.<br /><br />
        Our Little Big Shed tool, hobby and equipment share platform is based on people using items only when required. This eliminates the need for all of us to own possessions which spend most of their life gathering dust. Did you know 80% of household items that we own are used less than once a month? <br/> <br />
        By pooling our resources, from lawnmowers<gardening> and water blasters<cleaning> to walking gear<camping/hiking> and pasta makers<appliances>, we can help to reduce waste by making our spending habits more sustainable. This ticks boxes not just for us personally. The equipment rental and sharing economy has major social, environmental and economic benefits for our planet.<br /><br />
        What’s really great is by sharing within our communities, we buy fewer items overall. With less people buying stuff new, and lending and borrowing more, demand for products reduces. This, in turn, leads to factories manufacturing and supplying less stuff (that we don’t really need).<br /><br />
        By consuming less, we’re doing our bit to save precious natural resources by making less metal and plastic and using less energy. Sharing is a way of designing waste out of the system before it has the chance to become rubbish – cutting pollution and waste across the whole supply chain. Ultimately, less stuff ends up in our landfills, on our beaches and in our oceans – better for us and for our planet. ‘Cause there’s no Planet B, right?`,
    },
    {
        id: 2,
        image: DummyBlog,
        title: 'Real Stories: Rodger',
        subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
        contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood.',
        contentBody: `We wanted to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good. Now we can all afford to make, mend, learn (and earn) by sharing tools, hobby gear, leisure equipment and plenty more, from like-minded neighbourhood locals!<br /><br/>
        Sound good? It gets better. There’s also no service fee for using our platform – Little Big Shed covers its own running costs so that lenders earn more from sharing their items and borrowers save more from not having to buy new. <br /><br />
        Our equipment rental app means that absolutely anything you have in your little shed (whether that be a garage, a kitchen drawer or a cupboard shelf!) can become part of something much bigger — the sharing economy. Around the world, people are sharing their equipment, their homes, their cars and their skills. This act of sharing helps local communities save money and supports your neighbours to make money.<br /><br /> 
        The sharing economy is projected to explode, according to Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be worth more than NZ$483b. The five key sectors include peer-to-peer finance, peer-to-peer accommodation, car sharing, music, TV and video streaming, and online staffing. In China alone, there are over 600 million users of shared services and platforms.<br /><br />
        Our Little Big Shed tool, hobby and equipment share platform is based on people using items only when required. This eliminates the need for all of us to own possessions which spend most of their life gathering dust. Did you know 80% of household items that we own are used less than once a month? <br/> <br />
        By pooling our resources, from lawnmowers<gardening> and water blasters<cleaning> to walking gear<camping/hiking> and pasta makers<appliances>, we can help to reduce waste by making our spending habits more sustainable. This ticks boxes not just for us personally. The equipment rental and sharing economy has major social, environmental and economic benefits for our planet.<br /><br />
        What’s really great is by sharing within our communities, we buy fewer items overall. With less people buying stuff new, and lending and borrowing more, demand for products reduces. This, in turn, leads to factories manufacturing and supplying less stuff (that we don’t really need).<br /><br />
        By consuming less, we’re doing our bit to save precious natural resources by making less metal and plastic and using less energy. Sharing is a way of designing waste out of the system before it has the chance to become rubbish – cutting pollution and waste across the whole supply chain. Ultimately, less stuff ends up in our landfills, on our beaches and in our oceans – better for us and for our planet. ‘Cause there’s no Planet B, right?`,
    },
    {
        id: 3,
        image: DummyBlog,
        title: 'A new look a camping gear',
        subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
        contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood.',
        contentBody: `We wanted to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good. Now we can all afford to make, mend, learn (and earn) by sharing tools, hobby gear, leisure equipment and plenty more, from like-minded neighbourhood locals!<br /><br/>
        Sound good? It gets better. There’s also no service fee for using our platform – Little Big Shed covers its own running costs so that lenders earn more from sharing their items and borrowers save more from not having to buy new. <br /><br />
        Our equipment rental app means that absolutely anything you have in your little shed (whether that be a garage, a kitchen drawer or a cupboard shelf!) can become part of something much bigger — the sharing economy. Around the world, people are sharing their equipment, their homes, their cars and their skills. This act of sharing helps local communities save money and supports your neighbours to make money.<br /><br /> 
        The sharing economy is projected to explode, according to Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be worth more than NZ$483b. The five key sectors include peer-to-peer finance, peer-to-peer accommodation, car sharing, music, TV and video streaming, and online staffing. In China alone, there are over 600 million users of shared services and platforms.<br /><br />
        Our Little Big Shed tool, hobby and equipment share platform is based on people using items only when required. This eliminates the need for all of us to own possessions which spend most of their life gathering dust. Did you know 80% of household items that we own are used less than once a month? <br/> <br />
        By pooling our resources, from lawnmowers<gardening> and water blasters<cleaning> to walking gear<camping/hiking> and pasta makers<appliances>, we can help to reduce waste by making our spending habits more sustainable. This ticks boxes not just for us personally. The equipment rental and sharing economy has major social, environmental and economic benefits for our planet.<br /><br />
        What’s really great is by sharing within our communities, we buy fewer items overall. With less people buying stuff new, and lending and borrowing more, demand for products reduces. This, in turn, leads to factories manufacturing and supplying less stuff (that we don’t really need).<br /><br />
        By consuming less, we’re doing our bit to save precious natural resources by making less metal and plastic and using less energy. Sharing is a way of designing waste out of the system before it has the chance to become rubbish – cutting pollution and waste across the whole supply chain. Ultimately, less stuff ends up in our landfills, on our beaches and in our oceans – better for us and for our planet. ‘Cause there’s no Planet B, right?`,
    },
    {
        id: 4,
        image: DummyBlog,
        title: 'Little Big Shed Launches New Online Community Sharing App',
        subtitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
        contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood.',
        contentBody: `We wanted to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good. Now we can all afford to make, mend, learn (and earn) by sharing tools, hobby gear, leisure equipment and plenty more, from like-minded neighbourhood locals!<br /><br/>
        Sound good? It gets better. There’s also no service fee for using our platform – Little Big Shed covers its own running costs so that lenders earn more from sharing their items and borrowers save more from not having to buy new. <br /><br />
        Our equipment rental app means that absolutely anything you have in your little shed (whether that be a garage, a kitchen drawer or a cupboard shelf!) can become part of something much bigger — the sharing economy. Around the world, people are sharing their equipment, their homes, their cars and their skills. This act of sharing helps local communities save money and supports your neighbours to make money.<br /><br /> 
        The sharing economy is projected to explode, according to Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be worth more than NZ$483b. The five key sectors include peer-to-peer finance, peer-to-peer accommodation, car sharing, music, TV and video streaming, and online staffing. In China alone, there are over 600 million users of shared services and platforms.<br /><br />
        Our Little Big Shed tool, hobby and equipment share platform is based on people using items only when required. This eliminates the need for all of us to own possessions which spend most of their life gathering dust. Did you know 80% of household items that we own are used less than once a month? <br/> <br />
        By pooling our resources, from lawnmowers<gardening> and water blasters<cleaning> to walking gear<camping/hiking> and pasta makers<appliances>, we can help to reduce waste by making our spending habits more sustainable. This ticks boxes not just for us personally. The equipment rental and sharing economy has major social, environmental and economic benefits for our planet.<br /><br />
        What’s really great is by sharing within our communities, we buy fewer items overall. With less people buying stuff new, and lending and borrowing more, demand for products reduces. This, in turn, leads to factories manufacturing and supplying less stuff (that we don’t really need).<br /><br />
        By consuming less, we’re doing our bit to save precious natural resources by making less metal and plastic and using less energy. Sharing is a way of designing waste out of the system before it has the chance to become rubbish – cutting pollution and waste across the whole supply chain. Ultimately, less stuff ends up in our landfills, on our beaches and in our oceans – better for us and for our planet. ‘Cause there’s no Planet B, right?`,
    },
    {
        id: 5,
        image: DummyBlog,
        title: 'The Origins of Little Big Shed: Founders Story',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        category: [ 'Tools', 'Sharing', 'Knowledge' ],
        postedDate: '22-02-2022',
        contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood.',
        contentBody: `We wanted to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good. Now we can all afford to make, mend, learn (and earn) by sharing tools, hobby gear, leisure equipment and plenty more, from like-minded neighbourhood locals!<br /><br/>
        Sound good? It gets better. There’s also no service fee for using our platform – Little Big Shed covers its own running costs so that lenders earn more from sharing their items and borrowers save more from not having to buy new. <br /><br />
        Our equipment rental app means that absolutely anything you have in your little shed (whether that be a garage, a kitchen drawer or a cupboard shelf!) can become part of something much bigger — the sharing economy. Around the world, people are sharing their equipment, their homes, their cars and their skills. This act of sharing helps local communities save money and supports your neighbours to make money.<br /><br /> 
        The sharing economy is projected to explode, according to Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be worth more than NZ$483b. The five key sectors include peer-to-peer finance, peer-to-peer accommodation, car sharing, music, TV and video streaming, and online staffing. In China alone, there are over 600 million users of shared services and platforms.<br /><br />
        Our Little Big Shed tool, hobby and equipment share platform is based on people using items only when required. This eliminates the need for all of us to own possessions which spend most of their life gathering dust. Did you know 80% of household items that we own are used less than once a month? <br/> <br />
        By pooling our resources, from lawnmowers<gardening> and water blasters<cleaning> to walking gear<camping/hiking> and pasta makers<appliances>, we can help to reduce waste by making our spending habits more sustainable. This ticks boxes not just for us personally. The equipment rental and sharing economy has major social, environmental and economic benefits for our planet.<br /><br />
        What’s really great is by sharing within our communities, we buy fewer items overall. With less people buying stuff new, and lending and borrowing more, demand for products reduces. This, in turn, leads to factories manufacturing and supplying less stuff (that we don’t really need).<br /><br />
        By consuming less, we’re doing our bit to save precious natural resources by making less metal and plastic and using less energy. Sharing is a way of designing waste out of the system before it has the chance to become rubbish – cutting pollution and waste across the whole supply chain. Ultimately, less stuff ends up in our landfills, on our beaches and in our oceans – better for us and for our planet. ‘Cause there’s no Planet B, right?`,
    },
]

const dummyQuestions = [
    {
        id: 1,
        title: 'Setting Listing Fees For You Items.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 2,
        title: 'How To Make Sure Your Item Is Safe For Others.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 3,
        title: 'What To Do When An Item Is Damaged.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 4,
        title: 'How To List An Item.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 5,
        title: 'Tips To A Successful Listing.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
    {
        id: 6,
        title: 'How To Take A Good Photo.',
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    },
]

export { 
    procedures, 
    rentOutProcedures,
    rentingProcedures,
    damagedProcedures,
    howItWorksProcedures,
    teamMembers,
    categories, 
    dummyBlog,
    dummyQuestions,
}