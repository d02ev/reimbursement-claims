const JWT = require('jsonwebtoken');
const HttpError = require('http-errors');

const verifyAuthToken = (req, res, next) => {
    try {
        let authToken = req.headers.authorization;
        if (!authToken) return next(HttpError.Forbidden('No Auth Token Found!'));

        authToken = authToken.slice(7);
        const decodedToken = JWT.verify(authToken, process.env.SECRET_KEY);
        req.user = decodedToken;
    }
    catch (err) {
        return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));
    }

    return next();
};

module.exports = verifyAuthToken;