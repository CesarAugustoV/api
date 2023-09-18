import express from "express";
import {
    ProductManager
} from "./ProductManager.js";


const app = express();
const path = 'products.json';
const manager = new ProductManager(path);


app.get('/', (req, res) => {
    res.send('Probando...')
})

app.get('/products', async (req, res) => {

    const products = await manager.getProducts();

    const param = parseInt(req.query.limit);

    const limit = param && param > products.length ? products.length : param;


    if (limit && limit > 0) {

        const productsSlice = products.slice(0, limit);

        res.send(productsSlice)

        return

    } else if (limit <= 0 || Number.isNaN(limit)) {


        const error = new Error("El parametro ingresado no es valido.");
        res.send(error)
        throw error;


    }

    res.send(products);

})

app.get('/products/:pid', async (req, res) => {

    const id = parseInt(req.params.pid);
    const products = await manager.getProductById(id);
    res.send(products)
})


app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
})