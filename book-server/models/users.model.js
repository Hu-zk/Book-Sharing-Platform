const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    from: Date,
    to: Date,
    isConfirmed: Boolean,
}, { timestamps: true });

const staysShcema = new mongoose.Schema({
    name: String,
    price: String,
    location: String,
    pic_url: String,
    bookings: [bookingsSchema]
}, {timestamps: true})

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    country: String,
    user_type: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    stays: [staysShcema]
}, {
    timestamps: true
})

const model = mongoose.model("User", usersSchema);
module.exports = model;