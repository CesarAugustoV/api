import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import productManager from "../ProductManager.js"


const router = Router();


//Products
router.get('/', async (req, res) => {
    try {

        const products = await productManager.getProducts(req.query);

        res.status(200).json({
            message: "Products found",
            products
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});
router.get('/:pid', async (req, res) => {
    try {

        const id = parseInt(req.params.pid);

        const product = await productManager.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found whit the id provided'
            })
        }

        res.status(200).json({
            message: "Product found",
            product
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
})
router.post('/', authMiddleware, async (req, res) => {

    const {
        title,
        description,
        price,
        code,
        stock
    } = req.body;

    if (!title || !description || !price || !stock || !code) {
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };

    try {
        const response = await productManager.addProduct(req.body);

        // if(response === true) res.status(400).json({message: "repeated code", product : response})

        res.status(200).json({
            message: "Product created",
            product: response
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
})
router.delete('/:pid', async (req, res) => {
    const {
        pid
    } = req.params;

    try {
        const response = await productManager.deleteProduct(+pid);

        if (!response) {
            return res.status(404).json({
                message: "User not found with the id provided"
            });
        }

        res.status(200).json({
            message: "Product deleted"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

})
router.put('/:pid', async (req, res) => {
    const {
        pid
    } = req.params;

    try {

        const response = await productManager.updateProduct(+pid, req.body);

        if (!response) {
            return res.status(404).json({
                message: "User not found with the id provided"
            });
        }

        res.status(200).json({
            message: "Product updated", response
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
})



export default router;