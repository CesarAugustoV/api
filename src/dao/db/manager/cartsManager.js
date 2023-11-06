import {
    cartsModel
} from "../models/carts.model.js";

class CartsManager {
    async findAll() {
        const result = await cartsModel.find();
        return result;
    }

    async findCartById(id) {
        //populate sirve para poblar la informacion desde el id. index por el modelo ref.
        const response = await cartsModel.findById(id).populate('products.product', ['name', 'price']);
        return response;
    }

    async createCart() {
        const newCart = {
            products: []
        }
        const response = await cartsModel.create({newCart})
        return response;
    }

    async addProducts(idCart, idProduct) {

        const cart = await cartsModel.findById(idCart);
        
        const productIndex = cart.products.findIndex(
            (p)=> p.product.equals(idProduct)
        );

        if(productIndex === -1){
            cart.products.push({product: idProduct, quantity: 1})
        }else{
            cart.products[productIndex].quantity++;
        }

        return await cart.save();
    }

    async updateOne(id, obj) {
        const result = await cartsModel.updateOne({
            _id: id
        }, obj);
        return result;
    }

    async deleteOne(id) {
        const result = await cartsModel.deleteOne({
            _id: id
        });
        return result
    }
}

export const cartsManager = new CartsManager();