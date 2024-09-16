// const jwt = require('jsonwebtoken');
// const User = require('../modals/User');

// module.exports = (req, res, next) => {
//     // Check if token is provided in the header
//     const token = req.header('x-auth-token');

//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     // Check if JWT_SECRET is defined
//     if (!process.env.JWT_SECRET) {
//         console.error('JWT_SECRET is not defined in environment variables');
//         return res.status(500).send('Server error');
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user; // Attach user info to request object
//         next(); // Proceed to the next middleware/route handler
//     } catch (err) {
//         console.error(err.message); // Log error for debugging
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../modals/User');

// Middleware for checking authentication
const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        // Check if roles is a single role or an array
        if (typeof roles === 'string') {
            roles = [roles];
        }

        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;

            const user = await User.findById(req.user.id);
            if (!roles.includes(user.role)) {
                return res.status(403).json({ msg: 'Permission denied' });
            }

            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};

module.exports = authMiddleware;
