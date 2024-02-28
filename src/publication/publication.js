import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({

    user:{
        type:String,
    },
    title:{
        type:String,
        required: [true, "Title is necessary"]
    },
    category:{
        type: String,
        required: [true, "Category is necessary"]
    },
    body:{
        type: String,
        required: [true, "Body is necessary"]
    },
    img:{
        type: String
    },
    comment:{
        type: Array
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', PublicationSchema)