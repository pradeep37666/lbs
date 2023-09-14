import imageCompression from "browser-image-compression";

export const compressImage = async (imgFile) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
    };
    if (options.maxSizeMB >= imgFile.size / 1024) {
        return imgFile;
    }
    return imageCompression(imgFile, options)
}

export default compressImage