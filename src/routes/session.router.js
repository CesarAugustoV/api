import {
    Router
} from "express";

import {
    hashData,
    compareData,
    generateToken
} from "../utils.js";
import {
    usersManager
} from "../dao/db/manager/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post('/signup', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body;

    if (!first_name, !last_name, !email, !password, !age) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const hashPassword = await hashData(password);
        console.log(req.body);
        const createdUser = await usersManager.createOne({
            ...req.body,
            password: hashPassword,
            role: "ADMIN"
        });
        res.status(200).json({
            message: "user created",
            user: createdUser
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            return res.redirect('/signup');
        }
        const isPasswordValid = await compareData(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Password is not valid"
            })
        }
        //sessiones
        // const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ? {
        //     email,
        //     first_name: user.first_name,
        //     isAdmin: true
        // } : {
        //     email,
        //     first_name: user.first_name,
        //     isAdmin: false
        // };
        // req.session.user = sessionInfo;
        // res.redirect('/api/views/products');

        //JWT
        const {
            first_name,
            last_name,
            role
        } = user;
        const token = generateToken({
            first_name,
            last_name,
            email,
            role
        });
        //res.json({message: 'Token', token})
        res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .json({ message: "Bienvenido", token });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

router.post('/current', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            return res.redirect('/signup');
        }
        const isPasswordValid = await compareData(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Password is not valid"
            })
        }

        //JWT
        const {
            first_name,
            last_name,
            role
        } = user;
        const token = generateToken({
            first_name,
            last_name,
            email,
            role
        });
        
        res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .redirect("/products");
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

router.get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    });
})

// //SIGNUP - LOGIN - PASSPORT GITHUB

// router.get('/auth/github', passport.authenticate('github', {
//     scope: ['user:email']
// }));

// router.get('/callback', passport.authenticate("github", {
//     successRedirect: "/products",
//     failureRedirect: "/error"
// }));

// router.post("/signup", passport.authenticate("signup", {
//     successRedirect: "/products",
//     failureRedirect: "/error"
// }));

// router.post("/login", passport.authenticate("login", {
//     successRedirect: "/products",
//     failureRedirect: "/error"
// }));

// //SIGNUP - LOGIN - PASSPORT GOOGLE

// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['profile', 'email']
//     }));

// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/error'
//     }),
//     (req, res)=> {
//         // Successful authentication, redirect home.
//         res.redirect('/products');
//     });




router.post('/restaurar',jwtValidation, async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            return res.redirect("/login");
        }
        const passwordHashed = await hashData(password)
        user.password = passwordHashed;
        await user.save();
        res.redirect('/login')

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

router.get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    });
})

export default router;