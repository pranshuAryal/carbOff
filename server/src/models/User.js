import mongoose from "mongoose";

const userSignupSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    }
});

const UserSignup = mongoose.model("UserSignup", userSignupSchema);

export default UserSignup;