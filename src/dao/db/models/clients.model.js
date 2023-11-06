import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true,
    },
    calificacion:{
        type: Number,
        required: true
    }
});

export const clientsModel = mongoose.model("Clients", clientsSchema);