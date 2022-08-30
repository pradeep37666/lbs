import { 
    GiGardeningShears as GardeningIcon,
    GiPartyPopper as PartyIcon,
} from 'react-icons/gi'
import { 
    MdSportsTennis as SportIcon,
    MdOutlineOutdoorGrill as BBQIcon,
} from 'react-icons/md'
import { 
    AiOutlineCamera as CameraIcon,
    AiOutlineCar as CarIcon,
} from 'react-icons/ai'
import { BiCloset as ClosetIcon } from 'react-icons/bi'
import { TbToolsKitchen2 as KitchenIcon } from 'react-icons/tb'
import { IoGameControllerOutline as GameIcon } from 'react-icons/io5'
import { TbMusic as MusicIcon } from 'react-icons/tb'
import { BsHouseDoor as HouseholdIcon } from 'react-icons/bs'
import { 
    MdElectricalServices as ElectronicsIcon,
    MdWorkspacesOutline as SpaceIcon,
    MdOutlineOtherHouses as OthersIcon,
} from 'react-icons/md'


const ITEM_CATEGORIES = [
    {
        name: 'DIY & Garden',
        icon: <GardeningIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Outdoor & Sport',
        icon: <SportIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Photography',
        icon: <CameraIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Parties & Events',
        icon: <PartyIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Vehicle',
        icon: <CarIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Closet',
        icon: <ClosetIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Kitchen',
        icon: <KitchenIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Gaming & Toys',
        icon: <GameIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Musical',
        icon: <MusicIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Household',
        icon: <HouseholdIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Babies & Kids',
        icon: <BBQIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Electronics',
        icon: <ElectronicsIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Spaces',
        icon: <SpaceIcon className="ReactIconCategory"/>,
    },
    {
        name: 'Other',
        icon: <OthersIcon className="ReactIconCategory"/>,
    },
]

const DELIVERY_OPTIONS = [
    'DELIVERY',
    'PICKUP',
    'BOTH',
    'NONE'
]

export { ITEM_CATEGORIES, DELIVERY_OPTIONS }