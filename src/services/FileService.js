import Instance from '../util/axios'

const uploadAvatar = async (file) => {
    try {
        const response = await Instance.post('/file-upload/uploadToS3', file) 
        console.log({response})
        if (!response) return false
        else return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export { uploadAvatar }