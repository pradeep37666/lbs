import React from 'react'
import classes from './AgreementModal.module.css'
import { CircularProgress, Dialog } from '@material-ui/core'

const AgreementModal = ({
    title,
    content, 
    isLoading,
    open, 
    onClose, 
    onClick 
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <p className={classes.modal_title}>
            {title}
            </p>
            <p className={classes.modal_content}>
            {content}
            </p>
            <div className={classes.modal_btn_container}>
                {isLoading
                ?   <div className={classes.modal_loading}>
                        <CircularProgress color='black' size={20}/>
                    </div>
                :   <button
                        className={classes.modal_btn_yes}
                        onClick={onClick}
                    >
                        Yes
                    </button>
                }
                <button
                className={classes.modal_btn_no}
                onClick={onClose}
                >
                    No
                </button>
            </div>
        </Dialog>
    )
}

export default AgreementModal