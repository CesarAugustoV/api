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

    async updateCartProducts(idCart, updatedProduct) {
        const cart = await cartsModel.findById(idCart);
    
        const productIndex = cart.products.findIndex(
            (p) => p.product.equals(updatedProduct.product)
        );
    
        if (productIndex === -1) {
            // Si el producto no existe en el carrito, lo agregamos.
            cart.products.push(updatedProduct);
        } else {
            // Si el producto ya existe, actualizamos la cantidad.
            cart.products[productIndex].quantity += updatedProduct.quantity;
        }
    
        return await cart.save();
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
        const cart = await cartsModel.findById(idCart);

        // Limpia el contenido de cart.products
        cart.products = [];
        
        return await cart.save();
    }

    async updateCartProducts(idCart, updatedProducts) {
        const cart = await cartsModel.findById(idCart);
    
        updatedProducts.forEach(updatedProduct => {
            const productIndex = cart.products.findIndex(
                (p) => p.product.equals(updatedProduct.product)
            );
    
            if (productIndex === -1) {
                // Si el producto no existe en el carrito, lo agregamos.
                cart.products.push(updatedProduct);
            } else {
                // Si el producto ya existe, actualizamos la cantidad.
                cart.products[productIndex].quantity += updatedProduct.quantity;
            }
        });
    
        return await cart.save();
    }
    
}

export const cartsManager = new CartsManager();