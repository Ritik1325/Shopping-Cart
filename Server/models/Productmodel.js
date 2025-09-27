import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },

    },
    category: {
        type: String,
        enum: ["electronics", "clothes", "furniture", "accessories", "home"],
        default: "home"
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        required: true
    },
    panelcolor: {
        type: String,
        required: true
    },
    textcolor: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema);


export default Product