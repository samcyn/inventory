"use strict";

var jwt = require("jsonwebtoken"),
    Transformer = require( _pathfinder.join(_pathfinder.utils, "transformer") ),
    JWT = {};

JWT.verifyToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).json(Transformer.transformResponse(0, "No token provided"));
    }

    jwt.verify(token, process.env.SECRET, verifyCallBack);

    function verifyCallBack(error, decoded)
    {
        if(error)
        {
            return res.status(401).json(Transformer.transformResponse(0, error.message));
        }

        req.decodedToken = decoded;
        next();
    }
};

module.exports = JWT;
