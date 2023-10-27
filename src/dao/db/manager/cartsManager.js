import { productsModel } from "../../models/products.model.js";

class ProductsManager {
    async findAll(){
        const result = await productsModel.find();
        return result;
    }

    async findById(id){
        const result = await productsModel.findById(id);
        return result;
    }

    async createOne(obj){
        const result = await productsModel.create(obj)
        return result;

    }

    async updateOne(id, obj){
        const result = productsModel.updateOne({_id:id}, obj);
        return result;
    }

    async deleteOne(id){
        const result = await productsModel.deleteOne({_id: id});
        return result
    }
}

export const productsManager = new ProductsManager();