import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

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

//añadimos el plugin paginate a el schema
usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model("Users", usersSchema);