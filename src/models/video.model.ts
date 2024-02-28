import mongoose, { Schema, Document, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define an interface representing a Video document
interface IVideo extends Document {
    video: string;
    thumbnail: string;
    title: string;
    description: string;
    time?: number;
    views?: number;
    isPublished?: boolean;
    owner: Types.ObjectId;
}

// Define a Mongoose schema for the Video document
const videoSchema: Schema<IVideo> = new Schema({
    video: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" // Reference to the User model for ownership association
    }
});

// Define a Mongoose model for the Video document using the schema
const Video = mongoose.model<IVideo>("Video", videoSchema);

videoSchema.plugin(mongooseAggregatePaginate) //we use it as plugin as pipline concept introduce later

// Export the Video model
export { Video };
