const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // userName: {
    //     type: String,
    //     // required: true
    // },
    email: {
        type: String,
        required: true
    },
    userType: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currentAddress: {
        type: String,
        required: true
    },
    // city: {
    //     type: String,
    //     // required: true
    // },
    // postCode: {
    //     type: Number,
    //     // required: true
    // },
    // aboutMe: {
    //     type: String
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 