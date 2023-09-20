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


//products & limit

app.get('/products', async (req, res) => {
    try {
        const products = await manager.getProducts();

        const limit = isNaN(req.query.limit) ? undefined : parseInt(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            throw new Error("El parámetro ingresado no es válido.");
        }

        const productsSlice = products.slice(0, limit);

        res.send(productsSlice);

    } catch (error) {

        res.status(400).send(error.message);

    }
});


//Products id

app.get('/products/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);

        const products = await manager.getProductById(id);

        res.send(products)

    } catch (error) {

        res.status(400).send(error.message);
        
    }
})


app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
})