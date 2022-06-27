import Instance from '../util/axios'

const FileService = {
    uploadSingleImage: async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data, status } = await Instance.post('/file-uploads/single', formData) 
            if (status === 201) return data
        } catch (error) {
            console.log(error)
        }
    },

    uploadMultipleImages: async (files) => {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
        try {
            const { data, status } = await Instance.post('/file-uploads/multiple', formData)
            if (status === 201) {
                const newData = []
                for (let i = 0; i < data.length; i++) {
                    newData.push({
                        imageKey: data[i]
                    })
                }
                return newData
            }
        } catch (error) {
            console.log(error.response)
        }
    },

    uploadIdentityImage: async (file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const { data, status } = await Instance.post('/stripe/stripe-connect/identity-documents', formData)
            if (status === 201) return data
        } catch (error) {
            console.log(error.response)
        }
    }
}

export { FileService }