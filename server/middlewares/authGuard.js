import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

const authGuard = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const token = req.headers.authorization.split(" ")[1];

            const { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select('-password');
            next();
        } catch (error) {
            let err = new Error('not authorized, token failed');
            error.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error('not authorized, no token');
        error.statusCode = 401;
        next(error);
    }
}

export default authGuard;