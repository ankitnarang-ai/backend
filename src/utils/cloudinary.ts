// first we store image in our local storage or local server than we upload it in cloudinary
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

// Now its time to upload file on cloudinary 

const uploadOnCloudinary = async (localFilePath)=>{
  try{
    if(!localFilePath) return null
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto" // means it should be any type either png jpg etc
    })
    console.log("File is uploaded in cloudinary ",response.url)// in response their will be all the info related to file
    return response;
  }
  catch(error){
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}

export {uploadOnCloudinary}