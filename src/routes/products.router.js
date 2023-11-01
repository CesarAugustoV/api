import {
    Router
} from "express";
import {
    productsManager
} from "../dao/db/manager/productsManager.js";
import {
    socketServer
} from "../server.js";


const router = Router();


//Products
router.get('/', async (req, res) => {
    try {

        const products = await productsManager.findAll();

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

router.post('/', async (req, res) => {

    const {
        name,
        description,
        price,
        stock,
        category,
        quantity
    } = req.body;
    console.log(name,
        description,
        price,
        stock,
        category,
        quantity);
    if (!name || !description || !price || !stock || !category || !quantity) {
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };

    try {

        const createdProduct = await productsManager.createOne(req.body);

        res.status(200).json({
            message: "Product created",
            product: createdProduct
        });

        const products = await productsManager.findAll();

        socketServer.emit('products', products)

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


router.delete('/:pid', async (req, res) => {
    const {
        pid
    } = req.params;

    try {
        const deletedProduct = await productsManager.deleteOne(pid);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "No product found with that id"
            });
        }

        res.status(200).json({
            message: "Product deleted",
            deletedProduct
        })

        const products = await productsManager.findAll();

        socketServer.emit('products', products)

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