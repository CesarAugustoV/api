import dotenv from "dotenv";
import program from '../commander.js'

const { mode } = program.opts();

dotenv.config({
    path: mode === 'test' 
    ? '.env.testing'
    : mode === 'prod' 
    ? '.env.production'
    : '.env.development'
});

export default {
    mongo_uri: process.env.MONGO_URI,
    secret_jwt: process.env.SECRET_KEY_JWT,
    google_client_id: process.env.GOOGLE_CLIENT_SECRET
};