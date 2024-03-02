import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import { userValidationSchema } from "../validate/user.validate";
import { ApiError } from "../utils/ApiError";

interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory: mongoose.Types.ObjectId[];
  password: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
//Define pre hook to validate user details before saving it to the database
// userSchema.pre<IUser>("save", async function (next) {
//   try {
//     const user: any = this; // Cast this to any
//     await userValidationSchema.validateAsync(user.toObject());
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Define pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  // pre is hook we bcrypt password just before saving it
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    throw new ApiError(422,"Joi validation failed ");
    next(error);
  }
});

// Define method to check if password is correct , we created our own function using method to check user password with bcrypt password
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
// we use normal function instead of arrow function to get refrence of our object using "this" 
userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username: this.username,
    fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}
// Refresh Token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username: this.username,
    fullName: this.fullName
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}
export const User = mongoose.model("User", userSchema);
