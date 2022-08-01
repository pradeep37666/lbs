import { ReactComponent as PaintingIcon } from '../Icons/PaintingIcon.svg'
import { ReactComponent as OfficeIcon } from '../Icons/OfficeIcon.svg'
import { ReactComponent as HammerIcon } from '../Icons/HammerIcon.svg'
import { ReactComponent as BBQIcon } from '../Icons/BBQIcon.svg'
import { ReactComponent as CarIcon } from '../Icons/AutomotiveIcon.svg'
import { ReactComponent as DrillIcon } from '../Icons/DrillIcon.svg'
import { ReactComponent as CreativeIcon } from '../Icons/CreativeIcon.svg'
import { ReactComponent as MowingIcon } from '../Icons/MowingIcon.svg'
import { ReactComponent as CleaningIcon } from '../Icons/CleaningIcon.svg'
import { ReactComponent as SportingIcon } from '../Icons/SportingIcon.svg'

const ITEM_CATEGORIES = [
    {
        name: 'DIY & Garden',
        icon: <MowingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Outdoor & Sport',
        icon: <MowingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Photography',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Parties & Events',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Vehicle',
        icon: <CarIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Closet',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Kitchen',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Gaming & Toys',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Musical',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Household',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Babies & Kids',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Electronics',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Spaces',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Other',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
]

const DELIVERY_OPTIONS = [
    'DELIVERY',
    'PICKUP',
    'BOTH',
    'NONE'
]

export { ITEM_CATEGORIES, DELIVERY_OPTIONS }