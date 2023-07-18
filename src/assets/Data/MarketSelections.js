import { Link } from 'react-router-dom'
import {
  Search,
  Message,
  Calendar,
  ThumbsUp,
  MowingImg,
  CameraImg,
  ShareImg,
  Tools,
  Gardening,
  Events,
  Hobbies,
  Outdoor,
  Kids,
  Vehicle,
  Closet,
  BlogImage1,
  BlogImage2,
  BlogImage3,
  BlogImage4,
  BlogImage5,
  BlogImage6,
} from '../Images/Marketings/Marketings'

const procedures = [
  {
    id: 1,
    icon: Search,
    title: '1. Explore and Find',
    description:
      'Search our little big platform to be matched with neighbours nearby who want to share that item.',
  },
  {
    id: 2,
    icon: Calendar,
    title: '2. Book and Pay',
    description:
      'Create an account to book in your first borrow. You’ll receive a notification from the lender once accepted.',
  },
  {
    id: 3,
    icon: Message,
    title: '3. Collect and Enjoy',
    description:
      'Use the app chat to connect and arrange pickup details with the lender. Now you’re ready to make, mend or explore!',
  },
  {
    id: 4,
    icon: ThumbsUp,
    title: '4. Return and Rate',
    description:
      'Return your borrow when agreed and in the same condition you found it. Review your share using our rating system and help build trust in your hood.',
  },
]

const rentOutProcedures = [
  {
    id: 1,
    icon: MowingImg,
    title: '1. Create and List',
    procedureDesc: (
      <p>
        To start sharing{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/register'
        >
          create an account
        </a>{' '}
        and follow the steps to verify your identity and payment details.
        <br />
        <br />
        You can select the days and times you are available to share – giving
        you full control over lending out your shed.
        <br />
        <br />
        To list an item, click the ‘post item’ button – select a category,
        upload photos, write a description, and set your price.
        <br />
        <br />
        Learn more about how to successfully rent out your items in our{' '}
        <Link class='underline_link' style={{ fontWeight: '600' }} to={'/faqs'}>
          listing tips
        </Link>{' '}
        section on images and description etc…
      </p>
    ),
  },
  {
    id: 2,
    icon: CameraImg,
    title: '2. Accept and Arrange',
    procedureDesc: (
      <p>
        You'll receive an alert notification in the app when your item has been
        requested. You can choose to confirm or decline the booking.
        <br />
        <br />
        Once confirmed, the booking will automatically be added to your in-app
        calendar.
        <br />
        <br />
        Use the chat function in the app to respond to any questions from the
        borrower and to arrange handover details.
        <br />
        <br />
        You can also choose to deliver and/or pick up your item from the
        borrower for an additional fee – which also supports{' '}
        <Link class='underline_link' style={{ fontWeight: '600' }} to={'/faqs'}>
          contactless sharing
        </Link>
        .
      </p>
    ),
  },
  {
    id: 3,
    icon: ShareImg,
    title: '3. Connect and Share ',
    procedureDesc: (
      <p>
        If you’ve arranged to meet the borrower in person, it’s a good chance to
        show them any tips/quirks about using your item.
        <br />
        <br />
        Once the handover is complete, sit back and relax worry-free, knowing
        that we have you covered if something goes wrong! Check out our{' '}
        <Link
          class='underline_link'
          style={{ fontWeight: '600' }}
          to={'/protection'}
        >
          lender protection
        </Link>{' '}
        policy to find out more about sharing with our verified users.
      </p>
    ),
  },
  {
    id: 4,
    icon: Message,
    title: '4. Rate and Get Paid',
    procedureDesc: (
      <p>
        Once your item is safely returned, build trust in your neighbourhood by
        reviewing the borrower via our 5-star rating system.
        <br />
        <br />
        When you have confirmed the share is complete, you’ll be paid for doing
        good directly into your bank account.
        <br />
        <br />
        We take no platform service fee but a 2.9% payment processing fee + 30c
        transaction fee will be deducted by our third party provider from what
        you get paid.
        <br />
        <br />
        Learn more about{' '}
        <Link class='underline_link' style={{ fontWeight: '600' }} to={'/faqs'}>
          how payment works
        </Link>{' '}
        section on lender payment.
      </p>
    ),
  },
]

const rentingProcedures = [
  {
    id: 1,
    icon: MowingImg,
    title: '1. Explore and Find',
    procedureDesc: (
      <p>
        To book your first borrow{' '}
        <Link
          class='underline_link'
          style={{ fontWeight: '600' }}
          to={'/register'}
        >
          create an account
        </Link>{' '}
        and follow the steps to verify your identity and payment details. Search
        for your item on our little big platform via category, location, and
        price. You can add an item to ‘your favourites’ before requesting a
        booking to borrow.
      </p>
    ),
  },
  {
    id: 2,
    icon: CameraImg,
    title: '2. Book and Pay',
    procedureDesc: (
      <p>
        You’ll receive a notification when your booking has been accepted. It’ll
        automatically be added to your trade dashboard and the full payment
        deducted from your account.
        <br />
        <br />
        If you change your mind, no worries. Find out more about our{' '}
        <Link class='underline_link' style={{ fontWeight: '600' }} to={'/faqs'}>
          cancellation policy
        </Link>{' '}
        section.
        <br />
        Use the chat function in the app to ask the lender any questions and
        arrange handover details. <br />
        You can choose to have your item delivered and/or picked up from the
        lender for an additional fee or arrange{' '}
        <Link
          class='underline_link'
          style={{ fontWeight: '600' }}
          to={'/protection'}
        >
          contactless sharing
        </Link>
        .<br />
        <br />
      </p>
    ),
  },
  {
    id: 3,
    icon: ShareImg,
    title: '3. Collect and Enjoy',
    procedureDesc: (
      <p>
        Now you’re ready to make, mend or learn!
        <br />
        <br />
        If you’ve arranged to meet the lender in person, it’s a good chance to
        ask them about any tips/quirks for using the item.
        <br />
        When using the item, take care and show respect as if it was your own.
        If you come across any issues during your borrow, learn{' '}
        <Link class='underline_link' style={{ fontWeight: '600' }} to={'/faqs'}>
          what to do
        </Link>{' '}
        section about disputes.
      </p>
    ),
  },
  {
    id: 4,
    icon: Message,
    title: '4. Return and Rate',
    procedureDesc: (
      <p>
        Once you have returned the item and the lender is happy that it’s still
        in good condition, they will confirm the share is complete.
        <br />
        Help build trust in your neighbourhood by leaving a review about the
        lender and item via our 5-star rating system.
      </p>
    ),
  },
]

const damagedProcedures = [
  {
    id: 1,
    icon: CameraImg,
    title: '1. Take photos or videos',
    description: (
      <p>
        Take clear photos or videos of the item(s) on your mobile phone or
        camera with a timestamp immediately (and no more than 24 hours) before
        the rental to prove they were in your possession undamaged at that time.
      </p>
    ),
  },
  {
    id: 2,
    icon: CameraImg,
    title: '2. Take photos and videos of the damage on return',
    description: (
      <p>
        ● Take clear photos or videos on your mobile phone or camera with a
        timestamp immediately (and no more than 24 hours) after the rental to
        prove the damage happened during the rental and not during your own
        subsequent use.
        <br />● In the case of theft, report the incident to the police as soon
        as reasonably possible, and obtain a crime reference number from them.)
      </p>
    ),
  },
  {
    id: 3,
    icon: Message,
    title: '3. Raise a dispute',
    description: (
      <p>
        ● Immediately raise a dispute with the borrower via the chat function
        seeking compensation for any damage, loss or theft of your items during
        the rental period.
        <br />● Immediately raise a dispute with Little Big Shed by contacting
        support@littlebigshed.com.
        <br />● Do not post on social media, online, or make public information
        about your claim before the claim process has completed.'
      </p>
    ),
  },
  {
    id: 4,
    icon: Message,
    title: '4. Provide documents',
    description: (
      <p>
        Provide Little Big Shed with the appropriate documentation to support
        the claim. This is included but not limited to:
        <br />
        ○ An itemised breakdown of all items that have suffered damage, loss or
        theft;
        <br />
        ○ Evidence of the value when you purchased the items;
        <br />○ Serial numbers on item.
      </p>
    ),
  },
]

const howItWorksProcedures = [
  {
    id: 1,
    icon: Search,
    title: 'Explore and Find',
    description:
      'Search our little big platform to be matched with neighbours nearby who want to share that item.',
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Book and Pay',
    description:
      "Select a time to borrow the item – it's good for you because you save some money, and it's good for them because they make some money. Plus, everyone’s money stays local. That means it circulates around your neighbourhood, rather than being spent at the global big box retailers, who take your money offshore.",
  },
  {
    id: 3,
    icon: Message,
    title: 'Collect and Enjoy',
    description:
      'Connect with locals like you and use your borrowed item to learn, make or mend. ',
  },
  {
    id: 4,
    icon: ThumbsUp,
    title: 'Return and Rate',
    description:
      'Review your experience and build connections and trust within your neighbourhood.',
  },
]

const teamMembers = [
  {
    id: 1,
    name: 'Sarmuhabat Singh | Founder',
    shortBio: (
      <p>
        Social entrepreneur and business lecturer, Sarmuhabat Singh, believes
        that one's success and resources should be shared within the community
        to help support society as a whole. He’s currently looking to borrow a
        pair of hedge clippers to take care of a few jobs in the garden.
      </p>
    ),
    longBio: (
      <p>
        With roots descending from a long line of Punjab farmers, Sarmuhabat
        learnt the importance of cultivating land, growing vegetables, and doing
        things by hand from a young age. Although academia never came naturally
        to him, Sarmuhabat discovered his strength and purpose in business and
        entrepreneurship after moving to Australia as an international student.
        <br />
        <br />
        During his Executive MBA research project with RMIT Melbourne,
        Sarmuhabat uncovered the heartbreaking statistics of Australia's
        recycling crises. Research showed that developed countries are recycling
        less than 30% of plastic with only 56% of all packaging being recovered
        and recycled.
        <br />
        <br />
        There must be something he could do to help.
        <br />
        <br />
        While unpacking a new lawnmower, an idea came to mind. He thought, ‘If
        we all need to take care of our place, why should we all purchase
        several tools that spend most of their time sitting in the shed?’ “The
        a-ha moment for me came when I realised how many of my neighbours were
        doing the same thing. There are some tools you may only need once, and
        not everyone has the means to buy every tool. Many people, including
        myself, hesitate to ask their neighbours if we can share things and help
        each other out.”
        <br />
        <br />
        The solution to our waste crisis is not about bettering our recycling
        system but finding ways to move to zero waste. One way is to revitalise
        the power of sharing.
        <br />
        <br />
        And so Little Big Shed was born – an online platform to share tools,
        equipment, hobby gear and more between neighbours. A platform intended
        to eliminate barriers and enable people to connect, share, earn and
        thrive. Read more about our Little Big Shed evolution and global mission
        in our Founder’s Story blog.
        <br />
        <br />
        Sarmuhabat is currently pursuing his Doctorate in Business
        Administration from the University of Technology Sydney in collaboration
        with the Business Science Institute, Luxembourg and Lyon University,
        France. His research explores the most effective government policies
        required in Victoria to achieve the targeted 50% new car sales to be
        zero-emission vehicles by 2030.
        <br />
        <br />
        With dedication, courage and integrity, Sarmuhabat has proved his
        abilities in business, management, and leadership levels. His diverse
        business portfolio consists of retail, e-commerce, pre-delivery services
        for automotive retailers and a not-for-profit venture that produces and
        publishes audiobooks in the Punjabi language.
      </p>
    ),
  },
  {
    id: 2,
    name: 'Kylie Bailey | Marketing Director',
    shortBio: (
      <p>
        Journalist and communications consultant Kylie Bailey believes in using
        words to create a better, more connected world. She’s currently looking
        to borrow a surfboard because she’s just started learning to surf and is
        saving up to buy one.
      </p>
    ),
    longBio: (
      <p>
        Kylie Bailey is Little Big Shed’s Marketing Director. A magazine
        journalist and senior editor with over 15 years experience in
        publishing, Kylie took a leap of faith and decided to only work with
        organisations who take care of people and the planet. That’s why she
        collaborates with GoodSense, who are Little Big Shed’s ethical marketing
        partners. She is grateful to be working on a platform that supports
        people to take small actions by sharing stuff and doing good.
      </p>
    ),
  },
  {
    id: 3,
    name: 'Moumita Das Roy | Lending Marketing Skills for Little Big Shed',
    shortBio: (
      <p>
        Cross-industry marketer with local and international experience with B2B
        and B2C audiences, Moumita Das Roy brings her left-brain-right-brain
        balanced approach to work. Last season, she failed at snowboarding,
        that’s why she wants to try it again this year. She is looking to borrow
        good snow-gear before she invests on her own.
      </p>
    ),
    longBio: (
      <p>
        Moumita Das Roy is a Marketing Consultant with Little Big Shed. She
        brings more than 15 years experience working with iconic, global brands.
        She takes great interest in doing meaningful and contributory work for
        purpose-led brands and has multiple volunteering engagements with
        not-for-profit organisations in Aotearoa, New Zealand. That is why she
        is associated with GoodSense, who are Little Big Shed’s ethical
        marketing partners. She is completely aligned with the philosophy of
        proper utilisation of stuff and takes pride in repurposing and doing
        good.
      </p>
    ),
  },
  {
    id: 4,
    name: 'Moumita Das Roy | Lending Marketing Skills for Little Big Shed',
    shortBio: (
      <p>
        Cross-industry marketer with local and international experience with B2B
        and B2C audiences, Moumita Das Roy brings her left-brain-right-brain
        balanced approach to work. Last season, she failed at snowboarding,
        that’s why she wants to try it again this year. She is looking to borrow
        good snow-gear before she invests on her own.
      </p>
    ),
    longBio: (
      <p>
        Moumita Das Roy is a Marketing Consultant with Little Big Shed. She
        brings more than 15 years experience working with iconic, global brands.
        She takes great interest in doing meaningful and contributory work for
        purpose-led brands and has multiple volunteering engagements with
        not-for-profit organisations in Aotearoa, New Zealand. That is why she
        is associated with GoodSense, who are Little Big Shed’s ethical
        marketing partners. She is completely aligned with the philosophy of
        proper utilisation of stuff and takes pride in repurposing and doing
        good.
      </p>
    ),
  },
  {
    id: 5,
    name: 'Moumita Das Roy | Lending Marketing Skills for Little Big Shed',
    shortBio: (
      <p>
        Cross-industry marketer with local and international experience with B2B
        and B2C audiences, Moumita Das Roy brings her left-brain-right-brain
        balanced approach to work. Last season, she failed at snowboarding,
        that’s why she wants to try it again this year. She is looking to borrow
        good snow-gear before she invests on her own.
      </p>
    ),
    longBio: (
      <p>
        Moumita Das Roy is a Marketing Consultant with Little Big Shed. She
        brings more than 15 years experience working with iconic, global brands.
        She takes great interest in doing meaningful and contributory work for
        purpose-led brands and has multiple volunteering engagements with
        not-for-profit organisations in Aotearoa, New Zealand. That is why she
        is associated with GoodSense, who are Little Big Shed’s ethical
        marketing partners. She is completely aligned with the philosophy of
        proper utilisation of stuff and takes pride in repurposing and doing
        good.
      </p>
    ),
  },
]

const categories = [
  {
    id: 1,
    category: 'Tools',
    categorySearchParam: 'DIY & Garden',
    itemCountName: 'DIY & Garden',
    image: Tools,
  },
  {
    id: 2,
    category: 'Gardening',
    categorySearchParam: 'DIY & Garden',
    itemCountName: 'DIY & Garden',
    image: Gardening,
  },
  {
    id: 3,
    category: 'Events & Parties',
    categorySearchParam: 'Parties & Events',
    itemCountName: 'Parties & Events',
    image: Events,
  },
  {
    id: 4,
    category: 'Hobbies',
    categorySearchParam: 'Other',
    itemCountName: 'Other',
    image: Hobbies,
  },
  {
    id: 5,
    category: 'Outdoor',
    categorySearchParam: 'Outdoor & Sport',
    itemCountName: 'Outdoor & Sport',
    image: Outdoor,
  },
  {
    id: 6,
    category: 'Kids',
    categorySearchParam: 'Babies & Kids',
    itemCountName: 'Babies & Kids',
    image: Kids,
  },
  {
    id: 7,
    category: 'Vehicle',
    categorySearchParam: 'Vehicle',
    itemCountName: 'Vehicle',
    image: Vehicle,
  },
  {
    id: 8,
    category: 'Closet',
    categorySearchParam: 'Closet',
    itemCountName: 'Closet',
    image: Closet,
  },
]

const blogData = [
  {
    id: 1,
    publishDate: '27-Mar-2022',
    image: BlogImage1,
    category: ['Making sharing the norm'],
    metaTitle: 'Little Big Shed Launches New Online Community Sharing App',
    metaDesc:
      'We want to let you enjoy the power of sharing so we can all do something positive together – for us, our community and the planet. That’s why we’ve been inspired to create Little Big Shed, an online sharing platform to help you share stuff and do good.',
    bannerTitle: 'Little Big Shed Launches New Online Community Sharing App',
    contentTitle: 'Equipment rental, hobby gear and tool sharing in your hood',
    contentBody: (
      <p>
        We wanted to let you enjoy the power of sharing so we can all do
        something positive together – for us, our community and the planet.
        That’s why we’ve been inspired to create Little Big Shed, an online
        sharing platform to help you share stuff and do good. Now we can all
        afford to make, mend, learn (and earn) by sharing tools, hobby gear,
        leisure equipment and plenty more, from like-minded neighbourhood
        locals!
        <br />
        <br />
        Sound good? It gets better. There's also no service fee for using our
        platform – Little Big Shed covers its own running costs so that lenders
        earn more from sharing their items and borrowers save more from not
        having to buy new.
        <br />
        <br />
        Our equipment rental app means that absolutely anything you have in your
        little shed (whether that be a garage, a kitchen drawer or a cupboard
        shelf!) can become part of something much bigger — the sharing economy.
        Around the world, people are sharing their equipment, their homes, their
        cars and their skills. This act of sharing helps local communities save
        money and supports your neighbours to make money.
        <br />
        <br />
        The sharing economy is projected to explode, according to
        Pricewaterhouse Coopers. Globally, they predict that by 2025 it will be
        worth more than NZ$483b. The five key sectors include peer-to-peer
        finance, peer-to-peer accommodation, car sharing, music, TV and video
        streaming, and online staffing. In China alone, there are over 600
        million users of shared services and platforms.
        <br />
        <br />
        Our Little Big Shed tool, hobby and equipment share platform is based on
        people using items only when required. This eliminates the need for all
        of us to own possessions which spend most of their life gathering dust.
        Did you know 80% of household items that we own are used less than once
        a month?
        <br />
        <br />
        By pooling our resources, from lawnmowers gardening and water blasters
        cleaning to walking gear outdoor and pasta makers parties, we can help
        to reduce waste by making our spending habits more sustainable. This
        ticks boxes not just for us personally. The equipment rental and sharing
        economy has major social, environmental and economic benefits for our
        planet.
        <br />
        <br />
        What’s really great is by sharing within our communities, we buy fewer
        items overall. With less people buying stuff new, and lending and
        borrowing more, demand for products reduces. This, in turn, leads to
        factories manufacturing and supplying less stuff (that we don't really
        need).
        <br />
        <br />
        By consuming less, we're doing our bit to save precious natural
        resources by making less metal and plastic and using less energy.
        Sharing is a way of designing waste out of the system before it has the
        chance to become rubbish – cutting pollution and waste across the whole
        supply chain. Ultimately, less stuff ends up in our landfills, on our
        beaches and in our oceans – better for us and for our planet. ‘Cause
        there’s no Planet B, right?
      </p>
    ),
  },
  {
    id: 2,
    publishDate: '28-Mar-2022',
    image: BlogImage2,
    category: ['Creating equal opportunities'],
    metaTitle: 'The Origins of Little Big Shed: Founders Story',
    metaDesc:
      'We believe that no one should be restricted from doing a DIY project, cultivating their talents or going on an adventure due to a lack of resources. By sharing with each other we can help communities, farmers, and small businesses access resources to fulfil their true potential.',
    bannerTitle: 'The Origins of Little Big Shed – Founders Story',
    contentTitle: 'Equipment and tool borrowing app to make, mend and learn',
    contentBody: (
      <p>
        <strong>
          “We believe that no one should be restricted from doing a DIY project,
          cultivating their talents or going on an adventure due to a lack of
          resources. By sharing with each other we can help communities,
          farmers, and small businesses access resources to fulfil their true
          potential,”
        </strong>{' '}
        Sarmuhabat Singh – Founder, Little Big Shed.
        <br />
        <br />
        Descending from a long line of Punjabi farmers, Sarmuhabat learnt the
        importance of cultivating land, growing vegetables, and doing things by
        hand from a young age. Life growing up in Punjab in northwest India was
        far from easy but his childhood shaped Sarmuhabat into the socially
        responsible, kind yet fearless entrepreneur he is today.
        <br />
        <br />
        Sarmuhabat, the youngest of three siblings, spent his early years in a
        farming village that was self-sufficient yet lacked quality schooling.
        His mother, educated herself, knew that village life didn’t offer the
        best outlook for her children. Consequently, she made the brave decision
        to move away (against the family’s will) to a large city called
        Amritsar, where Sarmuhabat grew up. Although Amritsar offered better
        opportunities and private school education, it was in civil unrest and
        under strong military presence.
        <br />
        <br />
        Despite the challenging circumstances during childhood, at 18 years of
        age, Sarmuhabat made the move to Australia for a brighter future as an
        international student. Although academia never came naturally to him,
        having tried and failed to get the accounting degree his Dad so
        desperately wanted him to, he eventually discovered his strength and
        purpose in business and entrepreneurship.
        <br />
        <br />
        After completing a degree in Business Management, Sarmuhabat moved on to
        an Executive MBA research project with RMIT Melbourne. During research,
        he uncovered the heartbreaking statistics of Australia's recycling
        crises – developed countries are recycling less than 30% of plastic with
        packaging being the single largest contributor to waste in Australia.
        <br />
        <br />
        Sarmuhabat thought there must be something he could do to help. <br />
        <br />
        While unpacking a new lawnmower, an idea came to mind. We all need to
        take care of our place but we don’t all need to purchase new tools,
        equipment or hobby gear that spends most of its life in the shed
        gathering dust! <br />
        <br />
        <strong>
          “The pivotal moment for me came when I realised how many of my
          neighbours were doing the same thing. There are some tools you may
          only need once, and not everyone has the means to buy every tool. Many
          people, including myself, hesitate to ask their neighbours if we can
          share things and help each other out.”
        </strong>
        <br />
        <br />
        Finding a solution to our waste crisis is not just about bettering our
        recycling system but rather about rediscovering how we can repurpose and
        reuse items. This is why embracing the power of sharing is so powerful.
        And so Little Big Shed was born – an online platform to share tools,
        equipment, appliances, hobby gear and more between neighbours.
        <br />
        <br />
        Reducing waste will be achieved through a global effort of conscious
        consumers. Little Big Shed’s tool and equipment rental app is based on
        people using stuff only when required. By buying less, and lending and
        borrowing more, we can make a collective effort to take care of the
        planet. Not only does this put less pressure on our planet’s natural
        resources, but by sharing within our communities we can break down
        barriers of social disparity. <br />
        <br />
        The tool borrowing app utilises technology as a medium for good by
        connecting neighbours to share their stuff without a platform service
        fee. Little Big Shed covers its own running costs so that lenders earn
        more from sharing their items and borrowers save more from not having to
        buy new.
        <br />
        <br />
        <strong>
          “It is a medium for conducting something that we want to achieve for
          the greater good of the planet. Technology has enabled a lot of people
          to do things which they were previously unable to do.”
        </strong>
        <br />
        <br />
        At a grassroots level, Little Big Shed could transform entire
        communities such as the farming village where Sarmuhabat grew up.
        <br />
        <br />
        <strong>
          “If technology like Little Big Shed was available where I grew up it
          could revolutionise the farming community, giving more people access
          to modern tools and equipment they can't afford as individuals. Why
          should they all have to buy machinery new when they could share it?”
        </strong>
        <br />
        <br />
        Sharing benefits each individual farm with their cultivation process.
        While those who lend out the equipment and machinery can earn a living
        or make a business out of it. By lending and borrowing resources within
        communities we support society as a whole.
        <br />
        <br />A LITTLE sharing really can make a BIG difference – for us, our
        community and the planet. Are you ready to{' '}
        <a
          style={{ fontWeight: '600' }}
          class='underline_link'
          href='/#/rent_stuff'
        >
          borrow more
        </a>
        , buy less, and make some extra cash when you{' '}
        <a
          style={{ fontWeight: '600' }}
          class='underline_link'
          href='/#/lend_your_stuff'
        >
          lend your stuff
        </a>
        ?
      </p>
    ),
  },
  {
    id: 3,
    publishDate: '10-May-2022',
    image: BlogImage3,
    category: ['Zero waste', 'connecting community'],
    metaTitle: 'Go Zero Waste With Sharing',
    metaDesc:
      'All around the world people are buying less and sharing more. What’s really cool about this is not only can we do something that’s zero waste but we can also create stronger community connections too. Find out how Little Big Shed helps you do just that.',
    bannerTitle: 'Why Sharing is Caring',
    contentTitle: 'Embrace zero waste through the power of sharing',
    contentBody: (
      <p>
        A LITTLE sharing makes a BIG difference – for us, our community and the
        planet. All around the world, people are embracing zero waste by sharing
        more and buying less. The good news is… this creates stronger{' '}
        <i>community</i> connections too!
        <br />
        <br />
        At Little Big Shed, we want to make it easy for locals like you to share
        your stuff and support your neighbours to make, mend and learn. Our
        peer-to-peer online sharing platform is designed to help everyone{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/rent_stuff'
        >
          borrow more
        </a>
        , buy less, and earn some extra cash when you{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/lend_your_stuff'
        >
          lend your stuff
        </a>
        . Plus, when you share on our platform, we take no service fee – which
        means more money in your back pocket!
        <br />
        <br />
        <a style={{ fontWeight: '600', fontSize: '1.1em' }}>
          Helping You To Do Your Bit And Earn Extra
        </a>
        <br />
        <br />
        It’s an astonishing fact that we use 80% of our household items less
        than once a month. Take a moment to think about all that stuff (from
        clothes and glassware, to snowboards and hedge trimmers). Stuff that
        spends most of its life just sitting there gathering dust. <br />
        <br />
        What about that tool you need to finish a DIY project, but don’t have
        the budget for. Or the outfit you’d love to make if only you had access
        to that overlocker. Or an evening dress for that one big night out.
        Instead of buying one of these barely used items new, doesn’t it make
        much more sense to borrow it?
        <br />
        <br />
        Maybe you have a big shed full of tools that would be useful to your
        neighbours and could earn you some extra cash on the side when you{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/lend_your_stuff'
        >
          lend your stuff
        </a>
        . By pooling our resources, from weed eaters gardening and electric
        drills tools to hiking packs outdoor and bassinets kids, we can help do
        our bit for zero waste by making different choices about how we spend
        our money. And by sharing among locals, we can build stronger community
        connections and trust within our neighbourhoods.
        <br />
        <br />
        The potential list of what could be shared is endless! With your help,
        as our little shed grows into something big, you’ll be able to share all
        sorts of stuff such as:
        <br />
        <ul>
          <li>Tools</li>
          <li>Gardening</li>
          <li>Events & Parties</li>
          <li>Hobbies</li>
          <li>Outdoor</li>
          <li>Kids</li>
          <li>Vehicles</li>
          <li>Closets</li>
        </ul>
        Little Big Shed enables people to connect, share, earn and thrive, for
        the collective purpose of doing good. Read more about why we were
        inspired to create Little Big Shed in our Founder’s Story blog.
        <br />
        <br />
        <a style={{ fontWeight: '600', fontSize: '1.1em' }}>
          Technology Connecting Us To Borrow, Lend And Reduce Waste
        </a>
        <br />
        <br />
        It’s a distressing reality that developed countries such as New Zealand
        and Australia recycle less than 30% of plastic – with packaging being
        the single largest culprit contributing to waste. The problem of big box
        retailers making stuff too cheap and tempting to buy doesn’t help.
        <br />
        <br />
        But sharing is one of the ways we can all do our bit to help achieve
        zero waste. We don’t all need to own the same tools, equipment or hobby
        gear that spends most of its life sitting in the shed! With less people
        buying stuff new, and lending and borrowing more, demand for products
        reduces. This, in turn, leads to factories manufacturing and supplying
        less stuff (that we don't really need). Ultimately, less stuff ends up
        in our landfills, on our beaches and in our oceans.
        <br />
        <br />
        By using stuff only when required, we can reimagine supply chains and
        make a collective effort to support sustainable living! Our Little Big
        Shed platform is a hub which enables this vision. It brings borrowers
        and lenders, like you, together to share tools, equipment and knowledge.
        <br />
        <br />
        By borrowing stuff on Little Big Shed you can:
        <br />
        <ul>
          <li>
            Make, mend and learn – without the hefty costs of buying items new
            or requiring space to store things you hardly use.
          </li>
          <li>
            Support your community – borrowing from your neighbours means that
            they get to make some money while you get to save. Plus, it’s a
            great excuse to connect with locals like you and build trust in your
            hood!
          </li>
          <li>
            Care for the environment – through buying less and borrowing more,
            demand for products reduces. Sharing helps remove waste out of the
            whole supply chain before it has the chance to do damage.
          </li>
        </ul>
        <a style={{ fontWeight: '600', fontSize: '1.1em' }}>
          Taking Better Care Of Our Neighbours And Our Place
        </a>
        <br />
        <br />
        We truly believe that no one should be restricted from doing a DIY
        project, cultivating their talents or going on an adventure due to a
        lack of resources. Through the power of sharing locally, we can build{' '}
        <i>community connections</i> and support each other to make, mend,
        learn, and earn! Little Big Shed makes it easy to search, book and pay
        for items to borrow. If you’re starting a DIY project tools, want to
        experiment with a new craft hobbies, or borrow hobby equipment outdoor
        to give a new activity a go but don’t want to create waste by buying
        new, this platform is for you. It’ll help you save money by not buying
        something that will hardly get used or that you don't have the storage
        space for.
        <br />
        <br />
        How to Borrow in four easy steps:
        <br />
        <ol>
          <li>
            Explore and Find – search our platform for an item you’d like to
            borrow
          </li>
          <li>
            Book and Pay – secure your borrow by booking it with the lender
          </li>
          <li>
            Collect and Enjoy – once the item is in your hands, now you’re ready
            to make, mend or explore!
          </li>
          <li>
            Return and Rate – return and review the borrow to help build trust
            in your hood
          </li>
        </ol>
        Anything you have in your little shed (whether that’s a cupboard shelf
        or large garage) can easily be shared with your neighbours when not in
        use. Plus, you can do it all worry-free! Our ratings system, lender
        protection policy, and verified users make it a trusted, sharing
        marketplace.
        <br />
        <br />
        How to{' '}
        <a
          style={{ fontWeight: '600', fontSize: '1.1em' }}
          href='/#/lend_your_stuff'
        >
          Lend Your Stuff
        </a>{' '}
        in four easy steps:
        <ol>
          <li>
            Create and List – create an account and start listing stuff you’d
            like to share
          </li>
          <li>
            Accept and Arrange – you’ll be notified when bookings come through
            to accept the share
          </li>
          <li>
            Connect and Share – connect with the borrower to share the item and
            any quirks
          </li>
          <li>
            Rate and Get Paid – rate the borrower and get paid once the item is
            safely returned
          </li>
        </ol>
        <h3> No service fee</h3>
        Plus, we don’t charge a service fee to share on our platform. This means
        you end up with more cash in your back pocket, and we hope it inspires
        you to share more! This puts more dollars into local communities,
        instead of big box retailers that create waste and send the money
        offshore!
        <br />
        <br />
        <a style={{ fontWeight: '600', fontSize: '1.1em' }}>
          The Sharing Economy Is Growing Fast Globally
        </a>
        <br />
        <br />
        We’re sharing more stuff with each other than ever before. Peer-to-peer
        technologies are changing the way we travel, listen to music, work,
        borrow money and access other people’s tools, hobby or leisure
        equipment. <br />
        <br />
        In 2013 the sharing economy was worth just NZ$22 billion. It is
        predicted to grow to more than NZ$495 billion by 2025, matching
        traditional hire/rental models.
        <br />
        <br />
        This act of sharing has significant social, economic, cultural and
        environmental benefits. By lending out your stuff on Little Big Shed
        you’re helping to:
        <br />
        <ul>
          <li>
            Create equal opportunities – by making tools, hobby gear and leisure
            equipment more available and affordable to everyone.
          </li>
          <li>
            Build community connection and support – by sharing with your
            neighbours you get to meet a like-minded local, help them save space
            and money, and make some extra cash for yourself on the side.
          </li>
          <li>
            Care for the environment – with less people buying stuff new, demand
            for products reduces. Sharing helps design waste out of the system
            before it has the chance to become rubbish.
          </li>
        </ul>
        Rest assured that when you share your shed on our platform, we have your
        listed items covered against damage during the lending period if
        something goes wrong. Check out our full{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600', fontSize: '1.1em' }}
          href='/#/protection'
        >
          lender protection policy
        </a>{' '}
        to find out more about sharing with our verified Little Big Shed users.
        <br />
        <br />
        Ready to connect with locals like you and help care for your place and
        our planet together?
        <br />
        <br />
        <a style={{ fontWeight: '600', fontSize: '1.1em' }} href='/#/register'>
          Join us
        </a>
      </p>
    ),
  },
  {
    id: 4,
    publishDate: '19-Aug-2022',
    image: BlogImage4,
    category: ['Sharing', 'Equipment rental', 'Equipment sharing services'],
    metaTitle: 'How to create a successful listing',
    metaDesc:
      'Here are the steps to list stuff on the Little Big Shed website, and why it is important to normalise the concept of sharing over buying.',
    bannerTitle: 'What if sharing, not buying, was the norm?',
    contentTitle: 'Share your Shed - Lend with us in Four Simple Steps',
    contentBody: (
      <p>
        Sharing really does make the world a better place. Not only is it a
        potent life lesson for four year olds and their lego, but it’s just as
        important for us forty-somethings with established homes and sheds
        <br />
        <br />
        At Little Big Shed, we ask ourselves every day - what if sharing, not
        buying, was the norm? Imagine a world where we all don’t have to ‘own’
        the items we use as little as once a month.
        <br />
        <br />
        Think about the red lawn mower sitting in every second person's shed or
        the sewing machines that collect dust under the floral sheet in the
        spare room. Or the pressure hoses and drills bought on sale that are
        still sitting neatly on the shelf, unopened in their shiny boxes.
        <br />
        <br />
        Now think of a different world, one where you and your neighbour use
        equipment rental and equipment sharing services, just like Little Big
        Shed. Ask yourself the question - how much money will you save in your
        lifetime? How much waste can you reduce in your neighbourhood? How much
        can all your reduced consumption help the planet?
        <br />
        <br />
        We want to support you to do just this.Why not get started now and list
        your first item. Learn to lend with us in four simple steps:
        <br />
        <br />
        <strong>1. STEP ONE - CREATE & LIST</strong>
        <br />
        <span>
          Create an account and start listing stuff you’d like to share. As part
          of this process it's great to do a walk around a ‘stock take’ of some
          of the items in your shed, home and office that you’ve invested in but
          have outgrown or are seldom used….
          <br />
          For example - <br />
          <ul>
            <li>Drills</li>
            <li>Surfboards</li>
            <li>Sewing machines</li>
            <li>Water blasters</li>
            <li>Lawn mowers </li>
            <li>Kayaks</li>
            <li>Mountain bikes</li>
            <li>Drones</li>
            <li>Evening dresses</li>
            <li>Watches</li>
            <li>Glassware</li>
            <li>Party lights</li>
            <li>Trailers</li>
            <li>Spare cars</li>
            <li>Office desks</li>
            <li>Bassinets</li>
            <li>Baby clothes</li>
          </ul>
          What you decide to list is limitless. You get to be as creative as you
          want and need… Plus, you can do it all worry-free! Our ratings system,
          lender protection policy, and verified users make it a trusted,
          sharing marketplace.
          <br />
          <br />
          <b>How do I decide what to list my item for?</b>
          <br />
          Check our pricing guide below for market trends on some of the most
          commonly used items.
          <br />
          <br />
          <b>Oh… and did we mention no service fee ?</b>
          <br />
          At Little Big Shed we don’t charge a service fee to share on our
          platform. This means you end up with more cash in your back pocket,
          and we hope it inspires you to share more! This puts more dollars into
          local communities, instead of big box retailers that create waste and
          send the money offshore!
          <br />
          <br />
        </span>
        <strong>2. STEP TWO - ACCEPT AND ARRANGE</strong>&nbsp;
        <span>
          – once your listing is loaded successfully on our platform you’ll be
          notified when bookings come through to accept the share. We take the
          hassle out of sharing and connect you directly to a pool of ‘active
          seeking’ borrowers in your local community.
        </span>
        <br />
        <br />
        <strong>3. STEP THREE - CONNECT AND SHARE</strong>&nbsp;
        <span>
          – connect with the borrower to share the item and any quirks. Beyond
          the practicalities of sharing and the good we are doing in the world,
          this is a fantastic opportunity to inspire and invigorate more
          connections in your local community. Chances are you are lending your
          sewing machine or wood carver to someone who shares common interests…
          or wants to learn more about the craft you’ve had experience in. A
          beautiful way to better know thy neighbours! This is also the perfect
          opportunity to advise them of the little kick start and flick of the
          wrist that some items so commonly need to get started.
        </span>
        <br />
        <br />
        <strong>4. STEP FOUR - RATE AND GET PAID</strong>&nbsp;
        <span>
          – rate the borrower and get paid once the item is safely returned.
          It's important to create a sharing community built on integrity and
          trust for both the borrower and for the lender. The rating
          accountability ensures that if people are to be accepted to borrow
          again they are to treat your items with respect and care and for the
          lender our app safely and securely takes care of the transaction and
          ensure the cash gets into your pocket.
        </span>
        <br />
        <br />
        So… are you ready to lend your stuff? <br />
        <br />
        <a
          class='underline_link'
          style={{ fontWeight: '600', fontSize: '1.1em' }}
          href='/#/register'
        >
          Join us
        </a>
      </p>
    ),
  },
  {
    id: 5,
    publishDate: '19-Aug-2022',
    image: BlogImage5,
    category: ['Better Futures', 'Kantar', 'Sustainable Business Council'],
    metaTitle: 'Why more of us care about waste minimisation than ever before',
    metaDesc:
      'Summary of the findings of the Better Futures Report and shows how it is better to share than to buy and pile up stuff that we use very less.',
    bannerTitle:
      'More people are showing they want big changes in dealing with waste.',
    contentTitle:
      'Why more of us care about waste minimisation than ever before',
    contentBody: (
      <p>
        More people than ever before are showing they want big changes in how we
        deal with waste and innovative solutions to stop creating more of it.
        <br />
        <br />
        That’s the findings from the recent Better Futures 2022 Report,
        published by Kantar & the Sustainable Business Council. In the report,
        it’s noted that New Zealanders and Australians undoubtedly value the
        environment as something that needs protecting now.
        <br />
        <br />
        In fact, although the report shows the top three things people care most
        about the cost of living, mental wellbeing and affordable housing, out
        of the top 10 concerns, it also reveals people’s concerns about social
        sustainability and our impact on the health of the environment have
        grown more since 2020 than the top three issues, the report says. <br />
        <br />
        More than ever, it’s clear. People are wondering, “Where does my waste
        go?”
        <br />
        <br />
        How we deal with waste (and not making more of it by choosing new
        behaviours such as sharing items) is one of the ways we can all make a
        proactive impact on our changing environment. <br />
        <br />
        This is revealed in the report.
        <b>Too much waste/rubbish generated</b> is a new entrant into the list
        of top 10 concerns. It did not feature in the 2021 or 2020 reports. This
        alludes, and links directly, to the other core issues of{' '}
        <b>over Packaging, non-recyclable packaging and landfill</b>. This has
        also moved up the ranks with an increase of 6% year-on-year.
        <br />
        <br />
        Think, for example, about the rubbish generated in the life of an
        average human and how their objects of use are packaged.
        <br />
        <ul>
          <li>
            I wake up and open the plastic around the box and pull out my
            individual coffee pods for the coffee maker at home
          </li>
          <li>
            I go to the fridge and unwrap the 6 pack of milks and individual
            plastic straws for my little ones lunch box, make a sandwich and
            reach for the cling wrap
          </li>
          <li>
            I get dressed and stare blankly at the stack of clothes that no
            longer feel appealing to wear
          </li>
          <li>
            I ditch the train and use my bike that I bought 6 months ago for the
            first time to ride to work - my partner says I should finally use it
          </li>
          <li>
            For lunch I open my pre-made salad in a plastic container and use
            the accompanying plastic fork
          </li>
          <li>
            I get home and my partner is mowing the grass because the mower man
            we usually pay can't come.
          </li>
          <li>
            I duck out to the big box retailer to pick up a drill and some new
            shelves for the new fake plants I also bought on my lunch break that
            day
          </li>
          <li>
            For dinner unwrap the pre packaged lasagne and add some vege - and
            throw out the styrofoam bottom and plastic wrap around the two stems
            of broccoli{' '}
          </li>
        </ul>
        When you think about it, almost everything we buy is wrapped in
        something. But what happens to all the wrapping? And what about those
        items we buy that we don’t really need and hardly ever use?
        <br />
        <br />
        The Better Futures report proves these are the types of things people in
        New Zealand and Australia are thinking about right now. Sure ‘Buying
        that cheap drill’ seems fine at the time of purchase. But if you only
        use it once, or once a year, how much waste and impact have you created
        for a tool you use very little?
        <br />
        <br />
        Multiply that by all the people living in New Zealand and across the
        ditch and ask yourself how many unused bikes and mowers are sitting in
        sheds at this moment collecting dust? What does 365 days of coffee pods,
        plastic straws and forks look like in a trash can? These are the
        questions people are starting to honestly ask themselves and, as a
        result, they are turning their trash cans upside down.
        <br />
        <br />
        They’re seeking out new ways to access items and that’s why Little Big
        Shed was created so we can all do our bit to share more stuff and do
        more good.
        <br />
        <br />
        How does Little Big Shed do that for another top environmental concern
        that was raised in the Better Futures report -{' '}
        <b>the build-up of plastic in the environment</b>. Yes there is
        ‘recycling’ - but what does that practically mean? For a long time, our
        waste was shipped to China and commercially ‘repurposed’. However with
        the fall in this agreement, for many countries, it begs the question;
        where is our plastic / recycled plastic now going? It’s no doubt why
        this particular issue in the report has increased 8% and has moved up
        the list of importance in the top 10 priorities.
        <br />
        <br />
        Clearly the problem of plastic doesn't just go away. For generations
        it's been a ‘normal’ thing to see plastic bottles floating in the ocean
        and not blink an eye but now we know how much damage this is doing to
        our environment. Move over microplastics because now we’re dealing with
        something called plastitar in our oceans. In this NBC article,
        scientists warn of this new global pollutant that is made when plastic
        combines with a second substance, oil. This creates a different and
        deadly form of pollution, which looks like oily tar balls gathering in
        our oceans and washing up on our coastlines.
        <br />
        <br />
        So how do we fight back? The most effective, practical way is to think
        about how we can best consume and reduce waste at home.
        <br />
        <br />
        Platforms like Little Big Shed are creating change - forging a circular
        economy that is about buying less and sharing more. One person buys and
        then shares with many.
        <br />
        <br />
        This also helps support other locals like you. Imagine a world where you
        and your neighbor did this… now expand this to you and your whole
        street… now you and your whole community… and now you and your whole
        suburb.
        <br />
        <br />
        At Little Big Shed, we want to help you earn, make, mend and learn by
        borrowing your neighbours stuff. What will you borrow today? What will
        you share tomorrow?
        <br />
        <br />
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/register'
        >
          Join the movement
        </a>{' '}
        - internal hyperlink to registration screen - and connect with locals
        like you and help care for your place and create a better future
        together.
        <br />
        <br />
      </p>
    ),
  },
  {
    id: 6,
    publishDate: '30-Jun-2022',
    image: BlogImage6,
    category: ['Better Futures', 'Kantar', 'Sustainable Business Council'],
    metaTitle: 'The Japanese philosophy of Mottainai: Reduce, Reuse, Recycle',
    metaDesc:
      'Introducing people to the philosophy of Mottainai and drawing similarities with Little Big Shed to show how the platform works and positively impacts the community and planet.',
    bannerTitle: '',
    contentTitle: '',
    contentBody: (
      <p>
        Mottainai is the idea that you can cut down on waste and save money by
        reusing things rather than buying new ones. This philosophy is ingrained
        in Japanese culture. The word "mottainai" is derived from a contraction
        of the words "mottainai omae ga aisareta sonzai" (meaning that I
        depended on myself to manage the household because no one else will do
        it), which translates literally to "wastefulness is something to feel
        bad about."
        <br />
        <br />
        The philosophy behind this word is that it's important to not just
        reduce waste and be mindful of our natural resources but also to find
        ways to reuse things rather than throw them away. The Japanese see no
        shame in reusing or repurposing items, whether they're broken or
        damaged. In fact, there are many stories about how Japanese people have
        used seemingly unusable items in creative ways, such as using tatami
        mats as roofing material during the war years or using old wooden planks
        from houses made out of stone and mud brick walls as firewood during
        colder months.
        <br />
        <br />
        There are many mottainai goods out there, but some of the most common
        ones are used clothing, kitchenware, tools and hobby gears -it is a
        lifestyle and can be found in any country as part of our daily lives.
        Yes in Aotearoa, New Zealand too!
        <br />
        <br />
        With the Little Big Shed.
        <br />
        <br />
        At Little Big Shed, we wanted to let you enjoy the power of sharing so
        we can all do something positive together – for us, our community and
        the planet! That’s why we’ve been inspired to create Little Big Shed, an
        online sharing platform to help you share stuff and do good. So that we
        can all afford to make, mend, learn (and earn) by sharing tools, hobby
        gear, leisure equipment and plenty more, from like-minded neighbourhood
        locals!
        <br />
        <br />
        A few ways you can live by the mottainai principle:
        <br />
        <ul>
          <li>
            Read a used book instead of a new one. If you have an old copy at
            home that you no longer need or use anymore and would like to share
            it with someone else who may benefit from it more than yourself,
            list it in Little Big Shed. Rent it out to someone who may not have
            read the book themselves. That way, you also make money from what
            you may not need, multiple times.
          </li>
          <li>
            Rent a boat instead of buying one on credit. This could save
            thousands over time on interest rates. And come to think of it, how
            often will you take your boat out in the ocean - why not rent it
            instead of buying and letting it sit idle for days. Check the
            listings in Little Big Shed’s hobby section to see if you like a
            boat to rent.
          </li>
          <li>
            If you're travelling abroad for a few months, why invest in a
            backpack worth hundreds of dollars, when you can rent it! Check if
            you can find a listing with Little Big Shed.
          </li>
        </ul>
        The Japanese society has a set of values meant to teach them how to
        reduce, reuse, and recycle respectively. In order to understand the
        Mottainai philosophy, it is necessary to look at how these values are
        taught to children. From a young age, children are taught that they
        should reduce their waste as much as possible by reusing things whenever
        they can. They are also encouraged to recycle anything that can be
        recycled and throw out any leftover waste in the trash bin. Japanese
        schools teach students about Mottainai through educational videos which
        show examples of why it is important for them not only as individuals
        but also as members of society at large (Kawamura). In order for
        Japanese people to follow these values in life, schools and homes, play
        an important role in making sure that children learn about this
        philosophy early on. Parents help reinforce these ideas by making sure
        that their kids do not take advantage of others or waste food
        unnecessarily (Nakanishi).
        <br />
        <br />
        The shop owners and employees around Japan must abide by these values
        for their reputation and future business. Only the smallest minority of
        people do not adhere to these values.
        <br />
        <br />
        What Japan has been practising for several years, can we not do in New
        Zealand too?
        <br />
        <br />
        We live in a world where sustainability is not only a matter of being
        green and reducing our carbon footprint, but also an issue of social
        justice and human rights. According to the United Nations Development
        Programme (UNDP), “Wastefulness is a sin against ourselves and our
        environment, which makes it a crime against future generations.”
        <br />
        <br />
        Ready to connect with other locals like you to start sharing now?{' '}
        <a
          class='underline_link'
          style={{ fontWeight: '600' }}
          href='/#/register'
        >
          Join the movement
        </a>{' '}
        - internal link to registration page
      </p>
    ),
  },
]

const FAQ_General_Data = [
  {
    id: 1,
    title: 'Is it free to use the platform?',
    content: (
      <p>
        We believe in the power of sharing and want to make it as easy,
        accessible and beneficial as possible. That’s why Little Big Shed has no
        platform service fee. We cover the costs for the smooth sailing of our
        shed so that you can earn more when you do good sharing your stuff.{' '}
        <br />
        <br />
        As a lender, the only cost of using Little Big Shed is a 2.9% processing
        fee + 30c transaction fee charged by Stripe, our third party payment
        provider. This amount is deducted from what you get paid each time your
        item is rented out.
      </p>
    ),
  },
  {
    id: 2,
    title: 'Where can I download the app?',
    content: (
      <p>
        The Little Big Shed app is free to download on both Android Play Store
        and the IOS App Store so you can borrow and lend on the go!
      </p>
    ),
  },
  {
    id: 3,
    title: 'Can I cancel a share once booked?',
    content: (
      <p>
        Yes.
        <br />
        <br />
        As a lender, you can cancel a booked item at any time. We recommend you
        give the borrower at least 24 hours notice before cancelling the item.
        You will be charged a small payment processing fee. Check out our
        cancellations & refunds policy for the full details. <br />
        <br />
        As a borrower, you can cancel a booked item more than 24 hours before
        the share begins. You will forfeit the time slot that has been allocated
        to your borrow and be charged a small payment processing fee.
        <br />
        <br />
        As a borrower, if you cancel less than 24 hours before the item is due
        to be delivered by the Lender, you will lose 50% of your deposit. You
        will also only be refunded 80% of your initial borrow deposit to account
        for our handling fees.
      </p>
    ),
  },
  {
    id: 4,
    title: 'How are users on the platform verified?',
    content: (
      <p>
        It’s important to us that you feel safe and secure while using Little
        Big Shed. That’s why we have a two-step verification process when
        signing up users. <br />
        <br />
        <ol>
          <li>
            To join the platform, a user must enter a valid mobile number,
            receive a text and complete a two-factor authentication process. If
            the user is banned, they cannot use their mobile phone number to
            create a new account.
          </li>
          <li>
            Additionally users are verified through our Stripe payment portal to
            ensure secure transactions. Stripe requires a valid credit card and
            a bank account.
          </li>
        </ol>
      </p>
    ),
  },
  {
    id: 5,
    title: 'What happens if something goes wrong during the share?',
    content: (
      <p>
        We know that in life the unexpected can happen! If something goes wrong
        during your share such as the item stops working, breaks, is returned
        late, or not at all, we have processes in place to make sure you’re
        looked after. Check out our Damage and Disputes Process here.
      </p>
    ),
  },
  {
    id: 6,
    title: 'How does COVID-19 impact lending and borrowing?',
    content: (
      <p>
        During the uncertain climate of Coid-19, we encourage you to take extra
        care when sharing your items with neighbours. Follow the government
        guidelines for{' '}
        <a
          class='underline_link'
          href='https://covid19.govt.nz/traffic-lights/life-at-orange/'
        >
          life at orange
        </a>
        .<br />
        <br />
        Our platform also offers a ‘contactless sharing’ option which means you
        can choose to have an item delivered and/or picked up for an extra $10.
      </p>
    ),
  },
]

const FAQ_Lender_Data = [
  {
    id: 1,
    title: 'How do I take a good photo?',
    content: (
      <p>
        Having visual images on your listings will help users discover and learn
        more about the type of item you have on Little Big Shed. We recommend
        following the below criteria to create a successful listing:
        <br />
        <br />
        <ul>
          <li>Add at least four recent photos of your item to your listing</li>
          <li>
            at least one photo that shows the entire item (you can add
            additional closeup photos to show detail)
          </li>
          <li>
            Image files must be high quality (make sure they are not blurry and
            that detail can be seen)
          </li>
          <li>You can upload as many images as you like in any file format.</li>
        </ul>
        Tip - it’s good practice to take time-stamped photo/s of your item
        before each share as part of your{' '}
        <a class='underline_link' href='/#/lend_your_stuff'>
          lender protection
        </a>
        .
      </p>
    ),
  },
  {
    id: 2,
    title: 'How much should I list my item for?',
    content: (
      <p>
        Here is a recommended price list that we’ve put together for some common
        items to help with listing your item.
        <br />
        <br />
        As a rough calculation, we recommend charging 20% of the price of the
        item when it is brand-new.
        <br />
        <br />
        There is an option to set a $0 lending fee. Note, items listed at $0 are
        not covered by the lender protection policy.
      </p>
    ),
  },
  {
    id: 3,
    title: 'Can I lend for free?',
    content: <p>Yes. There is an option to set a $0 lending fee.</p>,
  },
  {
    id: 4,
    title: 'How to make sure your item is safe for others to use?',
    content: (
      <p>
        Keeping our users safe is top priority. Follow the below tips to lend
        safely:
        <br />
        <br />
        <ul>
          <li>
            Check your item before the booking date to ensure there is no damage
            that could affect its performance and safety
          </li>
          <li>
            We encourage you to add ‘how to use’ instructions to your listing
          </li>
          <li>
            When you meet the borrower in person make sure to discuss the item,
            show them any quirks, and answer any questions they may have
          </li>
          <li>
            You can also use our in-app chat function for ‘how to use’
            discussion
          </li>
        </ul>
        Lending electrical equipment?
        <br />
        <br />
        Although not mandatory, the New Zealand Standard recommends that
        electrical equipment needs to be inspected prior to being hired, as well
        as being tested and tagged every three months.
        <br />
        <br />
        If your item is electrical, we recommend you get an ‘Electrical Test and
        Tag’. Test and tagging is a generic name given to the process of
        visually inspecting and electrically testing in-service electrical
        equipment for personal safety.
        <br />
        <br />
        To find where you can get this done, check out Test and Tag NZ
      </p>
    ),
  },
  {
    id: 5,
    title: 'What to do if my item is damaged or stolen?',
    content: (
      <p>
        In the unlikely situation that your item is damaged on return, or is not
        returned and the renter is not responding to your messages, follow our
        Damage and Disputes Process here.
        <br />
        <br />
        Rest assured that when you share your shed on our platform, we have your
        listed items covered against damage during the lending period if
        something goes wrong – up to NZ$2000 of cover per item. Read our full
        Lender Protection Policy
      </p>
    ),
  },
  {
    id: 6,
    title: 'How to create a successful listing?',
    content: (
      <p>
        <ul>
          <li>heck out our blog on how to create a successful listing</li>
          <li>
            Accurately and clearly describe the item and the condition it is in
          </li>
          <li>
            Price your item competitively by checking out similar items to
            yours, both on our shed and other platforms, such as TradeMe.
          </li>
          <li>
            Ensure that all photographs truly and accurately depict the item:
            <ul>
              <li>
                Add at least four recent photos of your item to your listing
              </li>
              <li>
                Make sure to include at least one photo that shows the entire
                item (you can add additional closeup photos to show detail)
              </li>
              <li>
                Image files must be high quality (make sure they are not blurry
                and that detail can be seen)
              </li>
            </ul>
          </li>
        </ul>
      </p>
    ),
  },
  {
    id: 7,
    title: 'What can I list on Little Big Shed?',
    content: (
      <p>
        Anything you have in your ‘little shed’ (whether that’s a garage, a
        kitchen drawer or a cupboard shelf!) can be shared on our platform.
        <br />
        <br />
        As long as the item is not illegal you should be good to go! Listings
        will be monitored by our team and if deemed as inappropriate you will be
        notified and the listing will be deleted. If you are unsure about
        listing an item get in touch.
      </p>
    ),
  },
  {
    id: 8,
    title: 'Is there a cost to lend on Little Big Shed?',
    content: (
      <p>
        As a lender, the only cost of using Little Big Shed is a 2.9% processing
        fee + 30c transaction fee charged by Stripe, our third party payment
        provider. This amount is deducted from what you get paid each time your
        item is rented out.
      </p>
    ),
  },
  {
    id: 9,
    title: 'How does payment work?',
    content: (
      <p>
        Once you confirm the share is complete ( there is no dispute), and you
        have reviewed the borrower, you will be paid directly into the bank
        account you provided.
        <br />
        <br />
        Remember a 2.9% processing fee + 30c transaction fee will be deducted
        from what you get paid. While we take no service fee for the use of our
        platform, this transaction fee is automatically charged by Stripe, our
        third party payment provider.
      </p>
    ),
  },
  {
    id: 10,
    title: 'What if I need to cancel an item a borrower has booked?',
    content: (
      <p>
        If you need to cancel a rental request make sure you contact the
        borrower via the in-app chat at least 24 hours before they are due to
        collect the item.
        <br />
        <br />
        Little Big Shed will add a small penalty fee to your account covering
        the third-party payment fees incurred by the borrower. All penalty fees
        will be deducted from your next payment in the next Lender Payment Run.
        <br />
        <br />
        Before cancelling a booked item remember that your borrower may be
        counting on having the item for that specific rental period.
      </p>
    ),
  },
]

const FAQ_Borrower_Data = [
  {
    id: 1,
    title: 'Can I cancel a booked item or change the rental dates?',
    content: (
      <p>
        Yes, if done prior to 24 hours there is no payment, if within 24 hours,
        the borrower loses their 50% deposit. By cancelling a booked borrow you
        will forfeit the time slot that has been allocated to your borrow. You
        will also only be refunded 80% of your initial borrow deposit to account
        for our handling fees.
        <br />
        <br />
        To change the rental date, contact the lender via the in-app messenger
        to check first that the item is available for the new dates you desire
        and if so, cancel your current booking, rebook and you're good to go.
      </p>
    ),
  },
  {
    id: 2,
    title: 'Item Faults Disputes and resolution',
    content: (
      <p>
        What happens if the item I borrow is damaged? What happens if it breaks
        while I’m using it? When you pick up the item, take a photo that’s time
        stamped so that as the borrower you’ve got a record of what’s happened.
        <br />
        <br />
        If you have an issue with the item, within 12 hours of pick up of the
        item, you need to first contact the lender through the app message
        feature. Then raise a dispute by contacting Little Big Shed’s customer
        service team at{' '}
        <a class='underline_link' href='mailto:support@littlebigshed.com'>
          support@littlebigshed.com
        </a>
      </p>
    ),
  },
  {
    id: 3,
    title: 'What if the item I want to rent isn’t on Little Big Shed?',
    content: (
      <p>
        As our little shed grows into something big, you’ll be able to share
        almost anything! But as we get the ball rolling and you can’t find what
        you’re looking for, feel free to make a request by sending us a message.
        We’ll send your request to our existing network of lenders to see if
        someone has the item and is keen to share it with you!
      </p>
    ),
  },
  {
    id: 4,
    title: 'Can the rental period be extended?',
    content: (
      <p>
        That shouldn’t be a problem! You just need to contact the lender via our
        secure in-app messenger to see whether the item is available to be
        rented for longer. If the lender is okay with it, select the new dates,
        pay the extra amount, and continue your project.
      </p>
    ),
  },
  {
    id: 5,
    title: 'What happens if I return the item late',
    content: (
      <p>
        Wherever possible, try to return your item on time. But we understand,
        life happens.
        <br />
        <br />
        If for whatever reason you have to return an item late, message the
        lender via the app to let them know before the end of your borrow
        period. You will be charged for each extra day it is in your possession.
      </p>
    ),
  },
  {
    id: 6,
    title: 'When am I charged?',
    content: (
      <p>
        Once you have returned the item at the agreed time and the lender has
        confirmed the share is complete (and there is no dispute), the borrow
        fee will be automatically deducted from the bank account you provided.
      </p>
    ),
  },
  {
    id: 7,
    title:
      'Am I liable for anything that happens to the item while borrowing it?',
    content: (
      <p>
        If you wilfully damage or steal the item while it is in your possession,
        you will be liable for its replacement value. If the item is worth less
        than $2,000 and you accidentally damage it while it is in your
        possession, Little Big Shed’s lender protection policy will cover the
        damage up to the full replacement value of the item.
      </p>
    ),
  },
]

const dummyQuestions = [
  {
    id: 1,
    title: 'Setting Listing Fees For You Items.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    id: 2,
    title: 'How To Make Sure Your Item Is Safe For Others.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    id: 3,
    title: 'What To Do When An Item Is Damaged.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    id: 4,
    title: 'How To List An Item.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    id: 5,
    title: 'Tips To A Successful Listing.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    id: 6,
    title: 'How To Take A Good Photo.',
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
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
  blogData,
  FAQ_General_Data,
  FAQ_Lender_Data,
  FAQ_Borrower_Data,
  dummyQuestions,
}
