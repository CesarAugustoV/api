import {
    Router
} from "express";
import {
    socketServer
} from "../server.js"
import {
    productsManager
} from "../dao/db/manager/productsManager.js";
import {
    __dirname
} from "../utils.js";
import { usersManager } from "../dao/db/manager/usersManager.js";

const router = Router();


router.get('/signup', (req, res) => {
    res.render("signup", {
        stylesheetURL: '/css/signup.css', // Ruta de la hoja de estilos principal
        title: 'Signup'
    })
})


router.get('/home/:idUser', async(req, res)=>{
    const {idUser} = req.params;
    const user = await usersManager.findById(idUser);
    console.log(user);
    const products = await productsManager.findAll();
    const {first_name, last_name} = user;
    
    res.render('home', {first_name, last_name, products, stylesheetURL: '/css/home.css', // Ruta de la hoja de estilos principal
    title: 'Home'});
})

router.get('/user/:idUser', async (req, res) => {
    const {
        idUser
    } = req.params;

    const user = await usersManager.findById(idUser);
    res.render("profile", {
        user
    });

})

router.get('/', async (req, res) => {
    try {

        const products = await productsManager.findAll();

        if (!products.length) {
            res.status(200).json({
                message: 'No products'
            })
        }

        res.render("home", {
            products
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.get('/realtimeproducts', async (req, res) => {

    try {

        const products = await productsManager.findAll();

        if (!products.length) {
            res.status(200).json({
                message: 'No products'
            })
        }

        res.render("realTimeProducts", {
            stylesheetURL: '/css/first.css', // Ruta de la hoja de estilos principal
            title: 'Productos en tiempo real'
        });

        socketServer.on('connection', socket => {
            console.log(`Cliente conectado: ${socket.id} `);

            socket.emit('products', products)

            socket.on('disconnect', () => {
                console.log(`Cliente desconectado: ${socket.id} `);
            });
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/chat", (req, res) => {
    
    res.render("chat", {
        stylesheetURL: '/css/chat.css', // Ruta de la hoja de estilos principal
        title: 'Chat'
    });
});

router.get("/products",(req,res)=>{
    res.render("products",{
        stylesheetURL: '/css/products.css', // Ruta de la hoja de estilos principal
        title: 'Products'
    })
})



export default router;