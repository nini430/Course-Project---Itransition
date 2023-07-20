import {v2 as cloudinary} from 'cloudinary'

const uploadImage=async(base64String:string)=>{
    try{
    const image=await cloudinary.uploader.upload(base64String);
    return image.url;
    }catch(err) {
        throw err;
    }
}

export {uploadImage};

