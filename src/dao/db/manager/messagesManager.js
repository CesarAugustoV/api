import { messageModel } from "../models/message.model.js";

class MessageManager {

    async findAll(){
        const result = await messageModel.find();
        return result;
    }
    
    async createOne(obj){
        const response = await messageModel.create(obj);
        return response;
    }

}

export const messageManager = new MessageManager();