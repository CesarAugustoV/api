import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    decription:{
        type: String,
    },
    category:{
        type: String,
    },
    quantity:{
        type:Number,
    }
});



export const productsModel = mongoose.model('Products', productsSchema);