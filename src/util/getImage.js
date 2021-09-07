const getImage = (imageString) => {
 return `http://192.168.1.107:3000/file-upload/getFile?key=${imageString}`
}

export default getImage