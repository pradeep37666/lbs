import { async } from 'validate.js'
import Instance from '../util/axios'

const FileService = {
    uploadSingleImage: async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data, status } = await Instance.post('/file-upload/uploadToS3', formData) 
            if (status === 201) return data
        } catch (error) {
            console.log(error)
        }
    },

    uploadMultipleImages: async (file) => {

    },

    uploadIdentityImage: async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data, status } = await Instance.post('/stripe/identity-documents', formData)
            if (status === 201) return data
        } catch (error) {
            console.log(error.response)
        }
    }
}

export { FileService }