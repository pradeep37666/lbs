import React, { useState } from 'react'
import './MenuModal.css'
import { Modal, Box } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const MenuModal = ({ open, handleClose }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const history = useHistory()

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className='modal_box' style={{ width: '30em', maxWidth: '50em' }}>
        <IoClose className='modal_close_icon' onClick={handleClose} />
        <Link to='/lend_your_stuff' className='modal_text'>
          Lend Your Stuff
        </Link>
        <Link to='/rent_stuff' className='modal_text'>
          Rent Stuff
        </Link>
        <Link to='/how_it_works' className='modal_text'>
          How It Works
        </Link>
        <Link to='/about_us' className='modal_text'>
          About Us
        </Link>
        <div
          className='modal_info_hub_container'
          onClick={() => setIsInfoOpen(!isInfoOpen)}
        >
          Info Hub
          {isInfoOpen ? (
            <IoIosArrowUp
              className='link_title_icon'
              onClick={() => setIsInfoOpen(false)}
            />
          ) : (
            <IoIosArrowDown
              className='link_title_icon'
              onClick={() => setIsInfoOpen(true)}
            />
          )}
        </div>
        <div
          className={isInfoOpen ? 'modal_popup_opend' : 'modal_popup_closed'}
        >
          <p className='option_blog' onClick={() => history.push('/blog')}>
            Blog
          </p>
          <p
            className='option_protection'
            onClick={() => history.push('/protection')}
          >
            Lender Protection
          </p>
          <p className='option_faqs' onClick={() => history.push('/faqs')}>
            FAQs for sharing
          </p>
        </div>
      </Box>
    </Modal>
  )
}

export default MenuModal
