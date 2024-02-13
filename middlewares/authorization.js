const jwt = require('jsonwebtoken');

const secret = 'mausooqSecret';

exports.jwtAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // Handle the error, for example, send a response indicating the error
                return res.status(401).json({ message: 'Authentication failed' });
            }
            // Attach decoded data to the request object
            req.user = decoded;
            next();
        });
    } else {
        // Handle the case when there is no authorization header
        res.status(401).json({ message: 'Authorization header not provided' });
    }
};
