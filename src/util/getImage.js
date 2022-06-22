const getImage = (imageString) => {
    return `http://54.79.152.215:3000/file-upload/getFile?key=${imageString}`
}

export default getImage