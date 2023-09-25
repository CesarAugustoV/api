import express from "express";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import ordersRouter from "./routes/orders.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js";


const app = express();
//configuramos el servidor para que pueda leer la informacion enviada por body
app.use(express.json());

app.use(express.static(__dirname + "/public"))


//routes
app.use('/api/products', productsRouter)

app.use('/api/users', usersRouter)

app.use('/api/orders', ordersRouter)

app.use('/api/carts', cartsRouter )

// app.use('/api/carts', cartsRouter)

//home
app.get('/', (req, res) => {
    res.send('Probando Home...')
})

//listar servidor 
app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
})