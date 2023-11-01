import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    user: {
        type: String
    },
    products: [{
        productId: {
            type: String
        },
        name: {
            type: String
        },
        price: {
            type: Number
        },
        category: {
            type: String
        },
        quantity: {
            type: Number
        },
    }]
});



export const cartsModel = mongoose.model('Carts', cartsSchema);