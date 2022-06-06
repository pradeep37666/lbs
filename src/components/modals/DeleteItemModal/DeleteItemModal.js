import React from 'react'
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';

export default function DeleteItemModal({ isDeleteModalOpen, deleteItem, setIsDeleteModalOpen }) {
    return (
        <Dialog 
        open={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
            <DialogContent className="DeleteModalContainer">
            <div className="DeleteModalTextContainer">
                <div className="DeleteModalHeading">Are you sure you want to delete this item?</div>
                
                <div className="DeleteModalText">This item will be permanently deleted from the Little Big Shed platform.</div>
                <div className="DeleteModalText">Are you sure you want to do this?</div>
            </div>
            <div className="ItemButtons" style={{ justifyContent: 'center', justifySelf: 'flex-end', height: '3.5rem' }}>
                <button
                className="ButtonAvailability"
                style={{ width: '25%'}}
                onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                >
                <div className="ItemButtonFlex">No, go back</div>
                </button>
                <button
                style={{ width: '25%'}}
                className="SearchButtonLarge"
                onClick={() => {
                    setIsDeleteModalOpen(!isDeleteModalOpen)
                    deleteItem();
                }}>
                Yes, Delete
                </button>
            </div>
                
            </DialogContent >
        </Dialog>
    )
}
