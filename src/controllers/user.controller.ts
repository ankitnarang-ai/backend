import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";
import Joi from "joi";
import { userValidationSchema } from "../validate/user.validate"; // Importing the user validation schema

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  // Validate the request body using Joi
  const { error, value } = userValidationSchema.validate(req.body);

  if (error) {
    // If validation fails, throw a 400 error with the validation error message
    throw new ApiError(400, error.message);
  }

  // Destructure validated values
  const { fullName, email, username, password } = value;

  // Check if user already exists by email or username
  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Access uploaded files
  const avatarLocalPath: string | undefined =
    typeof req.files === "object" && req.files !== null && !Array.isArray(req.files)
      ? req.files["avatar"]?.[0]?.path
      : undefined;
  const coverImageLocalPath: string | undefined =
    typeof req.files === "object" && req.files !== null && !Array.isArray(req.files)
      ? req.files["coverImage"]?.[0]?.path
      : undefined;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  // Create user in the database
  const user = await User.create({
    fullName,
    avatar: avatar ? avatar.url:"",
    coverImage: coverImage ? coverImage.url : "", // If coverImage exists, use its URL, otherwise use an empty string
    email,
    password,
    username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // Exclude password and refreshToken from the response

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser };
