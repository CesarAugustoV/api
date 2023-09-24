import express from "express";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import ordersRouter from "./routes/orders.router.js"


const app = express();
//configuramos el servidor para que pueda leer la informacion enviada por body
app.use(express.json());


//routes
app.use('/api/products', productsRouter)

app.use('/api/users', usersRouter)

app.use('/api/orders', ordersRouter)

//home
app.get('/', (req, res) => {
    res.send('Probando Home...')
})

//listar servidor 
app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
})