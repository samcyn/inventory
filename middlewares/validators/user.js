'use strict';

let Transformer = require(_pathfinder.join(_pathfinder.utils, 'transformer')),
    Validator = {};

Validator.create = function(req, res, next){
    req.checkBody('user.username', 'the name supplied is invalid').isName();
    req.checkBody('user.email', 'invalid email supplied').isEmailV2();
    req.checkBody('user.phone_number', 'The phone number must be equal to 11 digits').isLengthEqual(11);
    req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').isName();
    req.checkBody('user.role', 'invalid role was supplied').isIdNumber();
    req.checkBody('user.permissions', 'permission must be an array').optional().isPermission();
    req.asyncValidationErrors()
        .then(next)
        .catch(function(errors){
            return res.status(400).json(Transformer.transformResponse(0, Transformer.transformExpressValidationErrors(errors)));
        });
};

Validator.update = function(req, res, next){
    req.checkParams('id', 'You supplied and invalid Riby Id').isIdNumber();
    req.checkBody('user.username', 'the name supplied is invalid').optional().isName();
    req.checkBody('user.email', 'invalid email supplied').optional().isEmailV2();
    req.checkBody('user.phone_number', 'The phone number must be equal to 11 digits').optional().isLengthEqual(11);
    req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').optional().isName();
    req.checkBody('user.role', 'invalid role was supplied').optional().isIdNumber();
    req.checkBody('user.permissions', 'permission must be an array').optional().isPermission();
    req.asyncValidationErrors()
        .then(next)
        .catch(function(errors){
            return res.status(400).json(Transformer.transformResponse(0, Transformer.transformExpressValidationErrors(errors)));
        });
};

Validator.get = function(req, res, next){
    req.checkParams('id', 'You supplied an invalid Riby Id').isIdNumber();
    req.asyncValidationErrors()
        .then(next)
        .catch(function(errors){
            return res.status(400).json(Transformer.transformResponse(0, Transformer.transformExpressValidationErrors(errors), errors));
        });
};    

Validator.delete = function(req, res, next){
    req.checkParams('id', 'You supplied and invalid Riby Id').isIdNumber();
    req.asyncValidationErrors()
        .then(next)
        .catch(function(errors){
            return res.status(400).json(Transformer.transformResponse(0, Transformer.transformExpressValidationErrors(errors), errors));
        });
}; 
module.exports = Validator;
