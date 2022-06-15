import axios from 'axios'
import Instance from '../util/axios'

const uploadImages = async (formData) => {
    try {
        const response = Instance.post('/file-upload/uploadManyToS3', formData) 
        if (!response) return false
        else return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export { uploadImages }