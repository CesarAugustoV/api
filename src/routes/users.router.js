import { Router } from "express";
import {usersManager} from "../dao/db/manager/usersManager.js";

const router = Router();


//Users
router.get('/', async (req, res) => {
    try {

        const users = await usersManager.findAll();

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

router.get('/:idUser', async (req, res) => {
    const id = parseInt(req.params.idUser);
    try {

        const user = await usersManager.findById(id);

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

router.post('/', async (req, res) => {

    const {
        first_name,
        last_name,
        email,
        password,

    } = req.body;

    
    if (!first_name || !last_name || !email || !password ) {
        
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };
    
    try {

        const createUser = await usersManager.createOne(req.body);

        res.status(200).json({
            message: "User created",
            user: createUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
});

router.delete('/:idUser', async (req, res) => {
    const {
        idUser
    } = req.params;

    try {
        const response = await usersManager.deleteOne(+idUser);

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

router.post('/signup', async (req, res)=>{
    const {
        first_name,
        last_name,
        email,
        password, 
    } = req.body;

    
    
    if (!first_name || !last_name || !email || !password ) {
        
        return res.status(404).json({
            message: 'Some data is missing.'
        })
    };

    try {
        console.log('aqui');
        const response = await userManager.addUser(req.body);

        res.redirect(`/api/views/user/${response.id}`)

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

})



export default router;