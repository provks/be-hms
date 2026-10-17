const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    // get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1]; // assuming the token is sent as "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // decode the token and verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach the decoded user information to the request object for further use in the route handlers

        next(); // proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
}

module.exports = { isAuthenticated };