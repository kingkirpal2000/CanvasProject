const jwt = require('jsonwebtoken');

function checktokenSetUser(req, res, next) {
    const authToken = req.get('authorization');
    if (authToken) {
        const token = authToken.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    const err = new Error("Cannot Sign in User");
                    next(error);
                    // This part throws an error if jwt cannot validate
                    // which it shouldn't even reach if it doesn't havea token
                    // if it gives issues check this point for troubleshooting
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

function isLoggedin(req, res, next) {
    if (req.user) {
        next();
    } else {
        const error = new Error("--Unauthorized User--");
        next(error);
    }
}

module.exports = {
    checktokenSetUser,
    isLoggedin,
};