import {
    cartsModel
} from "../models/carts.model.js";
import {
    productsManager
} from "./productsManager.js"

class CartsManager {
    async findAll() {
        const result = await cartsModel.find();
        return result;
    }

    async findById(id) {
        const result = await cartsModel.findById(id);
        return result;
    }

    async createOne(obj) {
        const result = await cartsModel.create(obj)
        return result;
    }

    async addProducts(idCart, idProduct) {

        // Busca el carrito por su ID
        const cart = await this.findById(idCart);
        if (!cart) {
            throw new Error('Cart does not exist');
        }

        // Busca el producto por su ID
        const product = await productsManager.findById(idProduct);
        if (!product) {
            throw new Error('Product does not exist');
        }

        // Verifica si el producto ya existe en el carrito
        const existingProduct = cart.products.find(p => p.productId === idProduct);

        if (existingProduct) {
            // Si el producto ya existe en el carrito, incrementa la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no existe en el carrito, agrégalo al arreglo
            cart.products.push({
                productId: idProduct,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: 1
            });
        }

        // Guarda la actualización del carrito en la base de datos
        const updatedCart = await cart.save();

        return updatedCart;

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