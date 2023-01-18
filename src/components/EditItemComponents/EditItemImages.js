import { useState } from 'react'
import './EditItemImage.css'
import { CircularProgress, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import getImage from '../../util/getImage'
import { FileService } from '../../services/FileService'
import { v4 as uuidv4 } from 'uuid'

export default function EditItemImages({ state, dispatch }) {
  const { editItemImages, newImages, deletedImages } = state
  const [isUploading, setIsUploading] = useState(false)
  const classes = useStyles()

  const handleImageUpload = async ({ target }) => {
    try {
      setIsUploading(true)
      const files = target.files
      if (!files.length) return
      const fileLinks = await FileService.uploadMultipleImages(files)
      if (!fileLinks) return
      let newPictures = newImages.map(picture => picture)
      for (let i = 0; i < files.length; i++) {
        newPictures.push({
          preview: URL.createObjectURL(files[i]),
          raw: files[i],
          id: uuidv4(),
        })
      }
      dispatch({ type: 'setNewImages', data: newPictures })
      dispatch({ type: 'setNewImageLinks', data: fileLinks })
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsUploading(false)
    }
  }

  const renderItemImages = images => {
    return images.map((image, index) => (
      <div className='upload_item_image_box' key={index}>
        <IconButton
          aria-label='delete'
          className={classes.buttonDelete}
          onClick={() => removeImage(image.id)}
        >
          <RemoveIcon className={classes.icon} />
        </IconButton>
        <img
          src={image.preview ?? getImage(image.imageKey)}
          alt=''
          className='upload_item_image'
        />
      </div>
    ))
  }

  const removeImage = id => {
    const removedImage = editItemImages.find(img => img.id === id)
    if (removedImage) {
      const updatedDisplayImages = editItemImages.filter(img => img.id !== id)
      dispatch({ type: 'setEditItemImages', data: updatedDisplayImages })
      dispatch({
        type: 'setDeletedImages',
        data: [...deletedImages, removedImage.id],
      })
    } else {
      dispatch({
        type: 'setNewImages',
        data: newImages.filter(img => img.id !== id),
      })
    }
  }

  return (
    <div className='LoginMain' style={{ width: '100%', marginTop: '0.5%' }}>
      <div className='LoginHeader'>Item images</div>
      <div className='upload_item_image_container'>
        {renderItemImages(editItemImages)}
        {renderItemImages(newImages)}
        {isUploading && (
          <div
            className='PostItem__ItemPictures__Preview'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <CircularProgress color='inherit' />
          </div>
        )}
      </div>
      <input
        type='file'
        id='selectFile'
        style={{ display: 'none' }}
        onChange={handleImageUpload}
        multiple
      />
      <div
        className='PostItem__Itemimages__Add__Container'
        style={{ marginBottom: '-15%' }}
      >
        <IconButton
          aria-label='delete'
          className={classes.button}
          onClick={() => document.getElementById('selectFile').click()}
        >
          <AddIcon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  button: {
    width: 80,
    height: 80,
    backgroundColor: '#B43B4C',
    '&:hover': {
      backgroundColor: '#cf3247',
    },
  },
  icon: {
    fontSize: 40,
    color: '#FFF',
  },
  buttonDelete: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    backgroundColor: '#B43B4C',
    '&:hover': {
      backgroundColor: '#cf3247',
    },
  },
})
