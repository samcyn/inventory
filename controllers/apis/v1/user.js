'use strict';

let Ctrl = {},
    Transformer = require(_pathfinder.join(_pathfinder.utils, 'transformer')),
    lodash = require('lodash'),
    moment = require('moment'),
    Processor = require(_pathfinder.join(_pathfinder.processor, 'user'));

Ctrl.post = function(req, res){
    Processor.create(req.body.user)
    .then(function(newUser){
        res.json(Transformer.transformResponse(1, 'ok', newUser));
    })
    .catch(function(error){
        res.status(400).json(Transformer.transformResponse(0, error.message, error));
    });
};

Ctrl.postLogin = function(req, res){
    Processor.login(req.body.user)
    .then(function(newUser){
        res.json(Transformer.transformResponse(1, 'ok', newUser));
    })
    .catch(function(error){
        res.status(400).json(Transformer.transformResponse(0, error.message, error));
    });
};

Ctrl.update = function(req, res){
    Processor.update(req.params.id, req.body.user)
    .then(function(newUser){
        res.json(Transformer.transformResponse(1, 'ok', newUser));
    })
    .catch(function(error){
        res.status(400).json(Transformer.transformResponse(0, error.message, error));
    });
};

Ctrl.get = function(req, res){
    Processor.get({})
        .then(function(result){
            res.json(Transformer.transformResponse(1, 'ok', result));
        })
        .catch(function(error){
            res.status(400).json(Transformer.transformResponse(0, error.message, error));
        });
};

Ctrl.getById = function(req, res){
    Processor.getById(req.params.id)
        .then(function(result){
            res.json(Transformer.transformResponse(1, 'ok', result));
        })
        .catch(function(error){
            res.status(400).json(Transformer.transformResponse(0, error.message, error));
        });
};

Ctrl.delete = function(req, res){
    Processor.delete(req.params.id)
        .then(function(result){
            res.json(Transformer.transformResponse(1, 'ok', result));
        })
        .catch(function(error){
            res.status(400).json(Transformer.transformResponse(0, error.message, error));
        });
};

module.exports = Ctrl;