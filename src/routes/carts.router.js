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

router.post('/:cid/products/:pid', async (req, res) => {


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

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await cartsManager.deleteOneProduct(cid, pid);


        res.status(200).json({
            response,
            message: "Product deleted"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const {quantity} = req.body;

    try {
        const response = await cartsManager.updateOneProduct(cid, pid, quantity);

        res.status(200).json({
            response,
            message: "Product deleted"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await cartsManager.deleteOneCart(cid);


        res.status(200).json({
            response,
            message: "Cart deleted"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



export default router;