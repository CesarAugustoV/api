import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    // products: [{
    //     id: {
    //         required: true
    //     },
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     quantity: {
    //         type: Number,
    //         required: true
    //     },
    // }],
});



export const cartsModel = mongoose.model('Carts', cartsSchema);