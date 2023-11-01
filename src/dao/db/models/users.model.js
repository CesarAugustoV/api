import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true //indexar propiedad para busqueda.
    },
    password: {
        type: String,
        required: true,
    },
    gender:{
        type: String
    }
});

export const usersModel = mongoose.model("Users", usersSchema);