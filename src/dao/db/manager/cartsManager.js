import { cartsModel } from "../models/carts.model.js";

class CartsManager {
    async findAll(){
        const result = await cartsModel.find();
        return result;
    }

    async findById(id){
        const result = await cartsModel.findById(id);
        return result;
    }

    async createOne(obj){
        const result = await cartsModel.create(obj)
        return result;

    }

    async updateOne(id, obj){
        const result = cartsModel.updateOne({_id:id}, obj);
        return result;
    }

    async deleteOne(id){
        const result = await cartsModel.deleteOne({_id: id});
        return result
    }
}

export const cartsManager = new CartsManager();