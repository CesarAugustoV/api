import {
    existsSync,
    promises
} from "fs";
import {
    createHash
} from "crypto";

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

        const {
            title,
            description,
            price,
            code,
            stock
        } = product;

        // validaciones
        if (!title || !description || !price || !stock || !code) {
            throw new Error('Some data is missing');
        };

        try {

            const products = await this.getProducts();

            if (products.length > 0) {
                const isCodeRepeat = products.some((p) => p.code === code);

                if (isCodeRepeat) {
                    throw new Error('Code already used');
                }
            }

            let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;


            const hashPassword = product.password ? createHash('sha256').update(product.password).digest('hex') : undefined

            const newUser = {
                id,
                thumbnail: product.thumbnail || 'No image',
                ...product,
                password: hashPassword
            };

            products.push(newUser);

            await promises.writeFile(this.path, JSON.stringify(products));

            return newUser;

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












// const test = async () => {



//     // const manager1 = new ProductManager(path);
//     // // // 1
//     // // console.log(await manager1.getProducts());

//     // // // 2
//     // await manager1.addProduct({
//     //     title: 'Iphone',
//     //     description: 'Telefono',
//     //     price: '1200',
//     //     thumbnail: 'img.src',
//     //     code: '123',
//     //     stock: '25',
//     //     password: '1234567890'
//     // })

//     // await manager1.addProduct({
//     //     title: 'Ipad',
//     //     description: 'Tablet',
//     //     price: '900',
//     //     thumbnail: 'img.src',
//     //     code: '1234',
//     //     stock: '15'
//     // })

//     // await manager1.addProduct({
//     //     title: 'Tv',
//     //     description: 'Televisor',
//     //     price: '700',
//     //     thumbnail: 'img.src',
//     //     code: '12345',
//     //     stock: '10'
//     // })

//     // console.log(await manager1.getProducts());

//     // 3
//     // const productoId = await manager1.getProductById(4);

//     // console.log(productoId);


//     // 4
//     // await manager1.updateProduct(1, {
//     //         id: 10,
//     //         title: 'Samsung',
//     //         description: 'Telefono',
//     //         thumbnail: 'fotossamsung.gif',
//     //         stock: '15'
//     //     })

//     //     const productos = await manager1.getProducts();
//     //     console.log(productos);

//     // 5
//     // const productoEliminado = await manager1.deleteProduct(3);

//     // console.log(productoEliminado);
// }

// test();