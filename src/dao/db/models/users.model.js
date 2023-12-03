import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Asegúrate de que esté referenciando al modelo de Carts
    },
    isGithub: {
        type: Boolean,
        default: false
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'PREMIUM', 'USER'],
        default: "USER"
    }
});

usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model("Users", usersSchema);