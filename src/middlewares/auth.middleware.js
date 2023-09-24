export const authMiddleware = (req, res, next) => {
    const {
        age
    } = req.body;
    if (age < 18) {
        return res.status(401).json({
            message: "you need to be 18 or older."
        });
    }
    next();
}
