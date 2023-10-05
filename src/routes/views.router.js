import {
    Router
} from "express";
import userManager from "../UserManager.js";
import productManager from "../ProductManager.js";
import {socketServer} from "../server.js"


const router = Router();

const user = {

    first_name: "Cesar",
    last_name: "Vicci",
    email: "cesarvicci@gmail.com"

}

const users = [{
        first_name: "Cesar",
        last_name: "Vicci",
        email: "cesarvicci@gmail.com"
    },
    {
        first_name: "Augusto",
        last_name: "Vicci",
        email: "cesarvicci@gmail.com"
    },
    {
        first_name: "Julio",
        last_name: "Aparcedo",
        email: "Julio@gmail.com"
    },
    {
        first_name: "Nora",
        last_name: "Aparcedo",
        email: "Nora@gmail.com"
    },
    {
        first_name: "Ines",
        last_name: "Vicci",
        email: "Ines@gmail.com"
    },
    {
        first_name: "Molly",
        last_name: "Vicci",
        email: "Molly@gmail.com"
    },
    {
        first_name: "Keira",
        last_name: "Vicci",
        email: "Keira@gmail.com"
    }
]

router.get('/view1', (req, res) => {
    res.render("view1")
})
router.get('/view2', (req, res) => {
    res.render("view2")
})

router.get('/user', (req, res) => {
    res.render("user", {
        user
    })
})

router.get('/users', (req, res) => {
    res.render("users", {
        users
    })
})

router.get('/signup', (req, res) => {
    res.render("signup")
})

router.get('/user/:idUser', async (req, res) => {
    const {
        idUser
    } = req.params;

    const user = await userManager.getUserById(idUser);
        res.render("profile", {user});

})

router.get('/', async (req, res) => {
    try {

        const products = await productManager.getProducts(req.query);

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

router.get('/realtimeproducts', async(req, res)=>{

    try {

        const products = await productManager.getProducts(req.query);

        if (!products.length) {
            res.status(200).json({
                message: 'No products'
            })
        }

        res.render("realTimeProducts");

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


export default router;