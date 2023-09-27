import {
    Router
} from "express";
import {
    authMiddleware
} from "../middlewares/auth.middleware.js"
import productManager from "../ProductManager.js"


const router = Router();


//Products
router.get('/', async (req, res) => {
    try {

        const products = await productManager.getProducts(req.query);

        if (!products.length) {
            res.status(200).json({
                message: 'No products'
            })
        }

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
    
    const id = parseInt(req.params.pid);

    try {

        const product = await productManager.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found whith that id'
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
});

router.post('/', async (req, res) => {

    const {
        title,
        description,
        code,
        price,
        stock,
        category
    } = req.body;

    if (!title || !description || !price || !stock || !code || !category) {
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };

    try {
        const response = await productManager.addProduct(req.body);

        res.status(200).json({
            message: "Product created",
            product: response
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.delete('/:pid', async (req, res) => {
    const {
        pid
    } = req.params;

    try {
        const response = await productManager.deleteProduct(+pid);

        if (!response) {
            return res.status(404).json({
                message: "No product found with that id"
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

});

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
            message: "Product updated",
            response
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});



export default router;