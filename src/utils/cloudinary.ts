import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const CLOUDINARY_CLOUD_NAME = "ankitnarang";
const CLOUDINARY_API_KEY = "312252828465399";
const CLOUDINARY_API_SECRET = "p3ZjSd0xGa-0Odzoyeer0GMhM5o";

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath: string | undefined) => {
    try {
        console.log("local file path: ", localFilePath);
        
        if (!localFilePath) {
            throw new Error('Local file path is not provided');
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        
        // Remove the locally saved temporary file if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Local file removed:", localFilePath);
        }

        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };
