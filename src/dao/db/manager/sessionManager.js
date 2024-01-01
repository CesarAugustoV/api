import {
    sessionModel
} from "../models/session.model.js";
import BasicManager from "./basic.manager.js";


class SessionManager extends BasicManager {

    constructor(){
        super(sessionModel)
    }

}

export const sessionManager = new SessionManager();