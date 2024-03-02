import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

// We use asyncHandler wrapper here to avoid try and catch every time
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    // get user details from frontend
    // validation - not empty  : done using joi
    // check if user already exists : username, email
    // check for images and check from avatar
    // upload them to cloudinary, avatar
    // create user object - createentry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response
    const {firstName,email,username,password}=req.body;
    console.log("first Name",firstName)

    const existedUser:any = User.findOne({
      $or:[{email},{username}] // check either email or username exists already
    })
    
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    res.send(firstName)
});

export { registerUser };
