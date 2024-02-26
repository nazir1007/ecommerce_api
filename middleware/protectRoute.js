const jwt = require("jsonwebtoken");
const User = require('../models/user_model')

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        console.log("Token:", token); 

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

       

        console.log("Decoded Token:", decoded); 

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findOne(decoded.userId, { attributes: { exclude: ['password'] } });

        console.log("User:", user); 

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in ProtectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = protectRoute;