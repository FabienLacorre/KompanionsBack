const { errorHandler, hashPassword } = require("../utils");
const jwt    = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY_JWT;

const getToken = (req) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    return token;
}
const checkJWT = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        errorHandler(res, {}, "Vous devez être connecté pour accéder à cette page.", 401);
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err){
            errorHandler(res, {}, "Votre token est invalide", 401);
            return;
        }
        req.decoded = decoded;
        const expiresIn = 24 * 60 * 60;
        const newToken = jwt.sign(
        {user : decoded.user},
        SECRET_KEY,
        {expiresIn: expiresIn});
        res.header('Authorization', 'Bearer ' + newToken);
        next();
    })
}

module.exports = {
    checkJWT
}