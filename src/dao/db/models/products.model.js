import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
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

//añadimos el plugin paginate a el schema
productsSchema.plugin(mongoosePaginate);



export const productsModel = mongoose.model('Products', productsSchema);