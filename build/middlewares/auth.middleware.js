import jwt from "jsonwebtoken";
var isAuth = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization)
        return res.json(setError(401, "Unauthorized"));
    var jwt = splitBearerToken(authorization);
    try {
        var token = jwt.verify(jwt, req.app.get("secretKey"));
    }
    catch (error) {
        return next(setError(500, "Token invalid"));
    }
    var authority = {
        id: token.id,
        name: token.name,
    };
    req.authority = authority;
    next();
};
var splitBearerToken = function (bearerToken) {
    var splits = bearerToken.split(" ");
    if (splits.length !== 2 || splits[0] !== "Bearer")
        return res.json(setError(400, "Not Bearer"));
    return splits[1];
};
export default isAuth;
