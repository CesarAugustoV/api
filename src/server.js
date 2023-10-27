import express from "express";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import ordersRouter from "./routes/orders.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
//DB
import "./db/configDB.js";



const app = express();

//configuramos el servidor para que pueda leer la informacion enviada por body
app.use(express.json());
//leer info que viene poor formularios
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + "/public"))

//handlebars
//nombre de motor de plantilla, y la funcion
app.engine('handlebars', engine());
//ruta
app.set('views', __dirname + '/views');
//motor de plantilla
app.set('view engine', 'handlebars');

//routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);


//home
app.get('/', (req, res) => {
    res.send('Probando Home...')
})

//listar servidor 
const httpServer = app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
});

export const socketServer = new Server(httpServer);
