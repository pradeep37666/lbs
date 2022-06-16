import Instance from '../util/axios'

const FileService = {
    uploadSingleImage: async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const response = await Instance.post('/file-upload/uploadToS3', formData) 
            if (!response) return false
            if ( response.status === 201) return response.data
        } catch (error) {
            console.log(error)
        }
    },

    uploadMultipleImages: async (file) => {

    }
}

export { FileService }