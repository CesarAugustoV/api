import {
    sessionModel
} from "../models/session.model.js";

class SessionManager {

    async findById(id) {
        const response = await sessionModel.findById(id)
        return response;
    }

    async findByEmail(email) {
        const response = await sessionModel.findOne({
            email
        });
        return response;
    }

    async createOne(obj) {
        const response = await sessionModel.create(obj);
        return response;
    }

}

export const sessionManager = new SessionManager();