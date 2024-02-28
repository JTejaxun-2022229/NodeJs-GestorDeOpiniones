import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is necessary"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is necessary"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is necessary"]
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    publication:{
        type: Array
    },
    google: {
        type: Boolean,
        default: true
    }

});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    usuario.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema); 