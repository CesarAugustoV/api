import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import userManager from "../UserManager.js";

const router = Router();


//Users
router.get('/', async (req, res) => {
    try {

        const users = await userManager.getUsers(req.query);

        res.status(200).json({
            message: "Users found",
            users
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

        const user = await userManager.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found whit the id provided'
            })
        }

        res.status(200).json({
            message: "User found",
            user
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

router.post('/', authMiddleware, async (req, res) => {

    const {
        nombres,
        correo,
        telefono,
        code,
        password, 
        age
    } = req.body;

    
    if (!nombres || !correo || !telefono || !password || !code || !age) {
        
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };
    
    try {

        const response = await userManager.addUser(req.body);

        res.status(200).json({
            message: "User created",
            user: response
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
        const response = await userManager.deleteUser(+pid);

        if (!response) {
            return res.status(404).json({
                message: "User not found with the id provided"
            });
        }

        res.status(200).json({
            message: "User deleted"
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

        const response = await userManager.updateUser(+pid, req.body);

        if (!response) {
            return res.status(404).json({
                message: "User not found with the id provided"
            });
        }

        res.status(200).json({
            message: "User updated", response
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});



export default router;