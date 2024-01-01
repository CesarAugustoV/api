import { Router } from "express";

const router = Router();

// cookie
// router.post('/', (req, res)=>{
//     const {email} = req.body;
//     res.cookie('user', email, {maxAge: 10000}).send('Cookie created');
// });

// sesion
router.post('/', (req, res)=>{
    const {name, email} = req.body;
    req.session.name = name;
    req.session.email = email;
    res.send('Session')
});


router.get('/view', (req, res)=>{
    res.send("View cookie")
})


export default router;