import { Router } from "express";
import cartsManager from "../dao/filesystem/CartsManager.js"


const router = Router();


//Carts
router.get('/', async (req, res) => {
    try {

        const carts = await cartsManager.getCarts(req.query);

        res.status(200).json({
            message: "Products found",
            carts
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.get('/:cid', async (req, res) => {
    try {

        const id = parseInt(req.params.cid);

        const cart = await cartsManager.getCartById(id);

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found whit the id provided'
            })
        }

        res.status(200).json({
            message: "Cart Found",
            cart
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

router.post('/', async (req, res) => {

    const {
        products = []
    } = req.body;

    try {
        const response = await cartsManager.addCart(products);

        res.status(200).json({
            message: "Product created",
            cart: response
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.post('/:cid/product/:pid', async (req, res) => {


    const { cid, pid } = req.params;

    try {

        const response = await cartsManager.addProductCart(+cid, +pid);

        if (!response) {
            return res.status(404).json({
                message: "Cart not found with the id provided"
            });
        }

        res.status(200).json({
            message: "Product added", response
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



export default router;