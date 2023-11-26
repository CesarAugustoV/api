import express from "express";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import ordersRouter from "./routes/orders.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import clientsRouter from "./routes/clients.router.js"
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
//DB
import "./db/configDB.js";
import { messageManager } from "./dao/db/manager/messagesManager.js";

//sesion
import cookieParser from "cookie-parser";
import cookieRouter from './routes/cookie.router.js';
import sessionRouter from './routes/session.router.js';
import session from "express-session";
import MongoStore from "connect-mongo";

//passport
import "./passport.js"
import passport from "passport";


const app = express();

//configuramos el servidor para que pueda leer la informacion enviada por body
app.use(express.json());
//leer info que viene poor formularios
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SecretCookie"));

//mongo
const URI = 'mongodb+srv://CesarAugustoV:JlG1olNzA39gZPe0@miclustercafe.ahxuo0q.mongodb.net/ecommerce?retryWrites=true&w=majority';

app.use(session({
    //configuracion para guardar las sessiones en archivos
    store: new MongoStore({
        mongoUrl: URI,
    }),
    secret: "secretSession",
    cookie: {
        maxAge: 60000
    }
}));

//configuraciones de passport
app.use(passport.initialize());
app.use(passport.session())


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
app.use('/api/clients', clientsRouter);

//sesion y cookies
app.use('/api/session', sessionRouter);
app.use('/api/cookie', cookieRouter);


//home
app.use('/', viewsRouter);


//listar servidor 
const httpServer = app.listen(8080, () => {
    console.log('Escuchando desde express, puerto 8080');
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('newUser', async(user) => {
        socket.broadcast.emit("userConnected", user);
        socket.emit('connected');
        
        const messages = await messageManager.findAll();
        socketServer.emit("chat", messages);

        socketServer.emit("chat", messages);
        socket.on('message', async (info) => {
            const creado = await messageManager.createOne(info);
            const messages = await messageManager.findAll();

            socketServer.emit("chat", messages);
        });
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});