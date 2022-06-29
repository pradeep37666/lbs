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
        name: 'Painting',
        icon: <PaintingIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Office',
        icon: <OfficeIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Tools',
        icon: <HammerIcon fill='#ac172c' className="CategoryDDIcon"/>,
    },
    {
        name: 'BBQ',
        icon: <BBQIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Automotive',
        icon: <CarIcon fill='#ac172c' className="CategoryDDIcon" style={{height: '16px'}}/>,
    },
    {
        name: 'Power Tools',
        icon: <DrillIcon fill='#ac172c' className="CategoryDDIcon"/>,
    },
    {
        name: 'Creative',
        icon: <CreativeIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Mowing',
        icon: <MowingIcon className="CategoryDDIcon" style={{height: '25px'}}/>,
    },
    {
        name: 'Cleaning',
        icon: <CleaningIcon className="CategoryDDIcon"/>,
    },
    {
        name: 'Sporting',
        icon: <SportingIcon className="CategoryDDIcon"/>,
    },
]

const DELIVERY_OPTIONS = [
    'DELIVERY',
    'PICKUP',
    'BOTH',
    'NONE'
]

export { ITEM_CATEGORIES, DELIVERY_OPTIONS }