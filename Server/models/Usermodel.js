import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    },

   
    otp:{
        type:String
    },

    otpExpiry:{
        type:Date,
    },

    password: {
        type: String,
        required: true
    },

    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        count:{
            type:Number,
            default:1
        }
    }],

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],

    orders: [{
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        count:{
            type:Number,
            default:1
        }
    }]

}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User