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

    async addCart(products) {

        // validaciones
        if (!products) {
            throw new Error('Products required');
        };

        try {

            const carts = await this.getCarts();

            let id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;

            const newCarts = {
                id,
                products
            };

            carts.push(newCarts);

            await promises.writeFile(this.path, JSON.stringify(carts));

            return newCarts;

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

    async deleteProduct(idProduct) {

        try {

            const products = await this.getProducts();

            const product = products.find(p => p.id === idProduct);

            if (product) {

                const newArrayProducts = products.filter(p => p.id !== idProduct);

                await promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            }


            return product

        } catch (error) {
            throw error
        }
    }

    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts({})
            const index = products.findIndex(p => p.id === id);

            if (index === -1) {
                return null
            }

            const updateProduct = {
                ...products[index],
                ...obj
            };

            products.splice(index, 1, updateProduct)

            await promises.writeFile(this.path, JSON.stringify(products))

            return updateProduct;

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