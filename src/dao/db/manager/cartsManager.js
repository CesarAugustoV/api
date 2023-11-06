import {
    cartsModel
} from "../models/carts.model.js";

class CartsManager {
    async findAll() {
        const result = await cartsModel.find().populate('products.product', ['name', 'price']);;
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
        const response = await cartsModel.create({
            newCart
        })
        return response;
    }

    async addProducts(idCart, idProduct) {

        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(idProduct)
        );

        if (productIndex === -1) {
            cart.products.push({
                product: idProduct,
                quantity: 1
            })
        } else {
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

    async deleteOneProduct(idCart, idProduct) {
        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(idProduct)
        );

        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity === 1) {
                // Si la cantidad del producto en el carrito es 1, lo eliminamos.
                cart.products.splice(productIndex, 1);
            } else {
                // Si la cantidad del producto en el carrito es mayor que 1, reducimos la cantidad en 1.
                cart.products[productIndex].quantity--;
            }
        }

        return await cart.save();

    }

    async deleteOneCart(idCart) {
        const result = await cartsModel.deleteOne({
            _id: idCart
        });

        if (result.deletedCount === 1) {
            return true; // Devuelve true para indicar que se eliminó el carrito con éxito.
        } else {
            return false; // Devuelve false para indicar que no se encontró el carrito con el ID especificado.
        }
    }

    async updateOneProduct(cid, pid, quantity) {
        const cart = await cartsModel.findById(cid);

        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(pid)
        );

        if (productIndex !== -1) {
            if (quantity === 0) {
                // Si la quantity deseada es 0, eliminamos el producto del carrito.
                cart.products.splice(productIndex, 1);
            } else {
                // Modificamos la quantity del producto en el carrito con la nueva cantidad deseada.
                cart.products[productIndex].quantity = quantity;
            }
        }

        return await cart.save();
    }
}

export const cartsManager = new CartsManager();