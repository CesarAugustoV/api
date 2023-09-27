import {
    existsSync,
    promises
} from "fs";

class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async getProducts(queryObj) {
        const limit = queryObj ? queryObj.limit : undefined;

        try {
            if (existsSync(this.path)) {
                const usersFile = await promises.readFile(this.path, 'utf-8');
                const usersData = JSON.parse(usersFile);
                return limit ? usersData.slice(0, +limit) : usersData;
            } else {
                return [];
            }

        } catch (error) {
            throw error
        }
    }

    async addProduct(product) {

        try {

            const products = await this.getProducts();

            if (products.length > 0) {
                const isCodeRepeat = products.some((p) => p.code === product.code);

                if (isCodeRepeat) {
                    throw new Error('Code already used');
                }
            }

            let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;

            const newProduct = {
                id,
                ...product,
                thumbnail: product.thumbnail || 'No image',
                status: true,
            };

            products.push(newProduct);

            await promises.writeFile(this.path, JSON.stringify(products));

            return newProduct;

        } catch (error) {
            throw error
        }
    }

    async getProductById(idProduct) {
        try {
            const products = await this.getProducts();

            const product = products.find(p => p.id === idProduct)

            if (!product) {
                return null;
            } else {
                return product
            }

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

            if(index===-1){
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
            return error
        }
    }
}

//path del archivo productos
const path = 'products.json';

//instancia de clase importada
const productManager = new ProductManager(path);

export default productManager;