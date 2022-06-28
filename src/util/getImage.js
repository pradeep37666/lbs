const getImage = (imageString) => {
    return `http://54.79.152.215:3000/file-uploads?key=${imageString}`
}

export default getImage