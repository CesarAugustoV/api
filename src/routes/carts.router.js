import { Router } from "express";
import {cartsManager} from "../dao/db/manager/cartsManager.js"


const router = Router();


//Carts
router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.findAll();

        res.status(200).json({
            message: "Carts found",
            carts
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.get('/:id', async (req, res) => {
    try {

        const {id} = req.params;

        const cart = await cartsManager.findCartById(id);

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

    try {
        const response = await cartsManager.createCart();

        res.status(200).json({
            message: "Cart created",
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

        const response = await cartsManager.addProducts(cid, pid);


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