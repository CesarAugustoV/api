export const authMiddleware = (req, res, next) => {
    const {user} = req;
    if(user.email ==='cesarviccicl@gmail.com'){
        next()
    }else{
        res.send("Not Authorized")
    }
}
