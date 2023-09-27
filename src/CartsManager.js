import {
    existsSync,
    promises
} from "fs";
import productManager from "./ProductManager.js";

class CartsManager {

    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async getCarts(queryObj) {
        const limit = queryObj ? queryObj.limit : undefined;

        try {
            if (existsSync(this.path)) {
                const cartsFile = await promises.readFile(this.path, 'utf-8');
                const cartsData = JSON.parse(cartsFile);
                return limit ? cartsData.slice(0, +limit) : cartsData;
            } else {
                return [];
            }

        } catch (error) {
            throw error
        }
    }

    async addCart() {

        try {

            const carts = await this.getCarts();

            let id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;

            const newCart = {
                id,
                products: []
            };

            carts.push(newCart);

            await promises.writeFile(this.path, JSON.stringify(carts));

            return newCart;

        } catch (error) {
            throw error
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();

            const cart = carts.find(c => c.id === id)

            if (!cart) {
                return null;
            } else {
                return cart
            }

        } catch (error) {
            throw error
        }

    }

    async addProductCart(idCart, idProduct) {

        try {

            const carts = await this.getCarts({})

            const indexCart = carts.findIndex(c => c.id === idCart);

            const productData = await productManager.getProductById(+idProduct);

            const product = productData ? {
                id: productData.id,
                title: productData.title
            } : null;

            if (indexCart < 0 || !product) {
                throw new Error('Cart or product no exist')
            }

            const indexProduct = carts[indexCart].products.findIndex(p => p.id === idProduct)

            if (indexProduct >= 0) {
                carts[indexCart].products[indexProduct].quantity += 1;
                await promises.writeFile(this.path, JSON.stringify(carts))
                return carts[indexCart]
            }

            const {
                id,
                title
            } = product;

            carts[indexCart].products.push({
                id,
                title,
                quantity: 1
            });

            await promises.writeFile(this.path, JSON.stringify(carts))

            return carts[indexCart];

        } catch (error) {
            throw error
        }


    }

}

//path del archivo productos
const path = 'carts.json';

//instancia de clase importada
const cartsManager = new CartsManager(path);

export default cartsManager;