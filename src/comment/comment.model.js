import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({

    user:{
        type:String,
        required: [true, "User is necessary"]
    },
    body:{
        type: String,
        required: [true, "Body is necessary"]
    },
    img:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comment', CommentSchema)