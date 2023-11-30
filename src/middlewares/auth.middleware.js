// export const authMiddleware = (req, res, next) => {
//     const {user} = req;
//     if(user.email ==='cesarviccicl@gmail.com'){
//         next()
//     }else{
//         res.send("Not Authorized")
//     }
// }

// export const authMiddleware = (role) => {
//     return(req, res, next)=>{
//         if(req.user.role !== "ADMIN"){
//             return res.status(403).json("Not authorized")
//         }
//         next();
//     }
// }

export const authMiddleware = (roles) => {
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json("Not authorized")
        }
        next();
    }
}