import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [{
        product: {
            //tipo id de mongo
            type: mongoose.SchemaTypes.ObjectId,
            //referencia documento
            ref: 'Products'
        },
        quantity: {
            type: Number
        },
        _id: false
    }]
});



export const cartsModel = mongoose.model('Carts', cartsSchema);