const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserAuthMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        try {
            const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedValue._id);

            if (!user) {
                return res.status(401).json({ message: 'Unauthenticated' });
            }

            if (requiredRole && user.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
    };
};

module.exports = UserAuthMiddleware;
