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

    const {
        limit
    } = req.query;

    const max = limit && limit > products.length ? products.length : limit;


    if (max > 0) {

        const productsSlice = products.slice(0, max);

        res.send(productsSlice)

        return

    } else if (max <= 0 && Number.isNaN(max)) {
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