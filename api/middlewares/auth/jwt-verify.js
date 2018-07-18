"use strict";

var jwt = require("jsonwebtoken"),
    Transformer = require( _pathfinder.join(_pathfinder.utils, "transformer") ),
    IpAddress = require( _pathfinder.join(_pathfinder.utils, "ip-address") ),
    JWT = {};

JWT.verifyToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).json(Transformer.transformResponse(0, "No token provided"));
    }

    jwt.verify(token, req.app.get("jwt_secret"), verifyCallBack);

    function verifyCallBack(error, decoded)
    {
        if(error)
        {
            return res.status(401).json(Transformer.transformResponse(0, error.message));
        }

        var user_ip_address = IpAddress.getAddress(req);

        if(decoded.ip_address !== user_ip_address)
        {
            return res.status(401).json(Transformer.transformResponse(0, "Your IP Address has changed. Please log in again"));
        }

        req.decodedToken = decoded;
        next();
    }
};

module.exports = JWT;
