import {
    Router
} from "express";
import passport from "passport";

import {
    hashData,
    compareData
} from "../utils.js";
import {
    usersManager
} from "../dao/db/manager/usersManager.js";

const router = Router();

// router.post('/signup', async (req, res) => {
//     const {
//         first_name,
//         last_name,
//         email,
//         password
//     } = req.body;

//     if (!first_name, !last_name, !email, !password) {
//         return res.status(400).json({
//             message: 'All fields are required'
//         })
//     }

//     try {
//         const hashPassword = await hashData(password);

//         const createdUser = await usersManager.createOne({
//             ...req.body,
//             password: hashPassword
//         });
//         res.status(200).json({
//             message: "user created",
//             user: createdUser
//         })
//     } catch (error) {
//         res.status(500).json({
//             error
//         })
//     }
// })

// router.post('/login', async (req, res) => {
//     const {
//         email,
//         password
//     } = req.body;

//     if (!email, !password) {
//         return res.status(400).json({
//             message: 'All fields are required'
//         })
//     }

//     try {
//         const user = await usersManager.findByEmail(email);
//         if (!user) {
//             return res.redirect('/api/views/signup');
//         }
//         const isPasswordValid = await compareData(password, user.password)
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 message: "Password is not valid"
//             })
//         }
//         console.log(email === "adminCoder@coder.com" && password === "adminCod3r123");
//         const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ? {
//             email,
//             first_name: user.first_name,
//             isAdmin: true
//         } : {
//             email,
//             first_name: user.first_name,
//             isAdmin: false
//         };

//         req.session.user = sessionInfo;
//         res.redirect('/api/views/products');
//     } catch (error) {
//         res.status(500).json({
//             error
//         })
//     }
// })

// router.get('/signout', (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/api/views/login')
//     });
// })

//SIGNUP - LOGIN - PASSPORT GITHUB

router.get('/auth/github', passport.authenticate('github', {
    scope: ['user:email']
}));

router.get('/callback', passport.authenticate("github",{
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/error"
}));

router.post("/signup", passport.authenticate("signup", {
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/error"
}));

router.post("/login", passport.authenticate("login", {
    successRedirect: "/api/views/products",
    failureRedirect: "/api/views/error"
}));

router.post('/restaurar', async (req, res) => {
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
        res.status(200).json({
            message: "Password Updated"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

router.get('/signout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/api/views/login')
    });
})

export default router;