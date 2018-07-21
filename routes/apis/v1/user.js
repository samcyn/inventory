
let express = require('express');
let router = express.Router();
let Validator = require(_pathfinder.join(_pathfinder.middlewares, "validators/user")),
    jwtVerify = require(_pathfinder.join(_pathfinder.middlewares, "auth/jwt-verify")),
    permission = require(_pathfinder.join(_pathfinder.middlewares, "permissions/user")),
Controller = require(_pathfinder.join(_pathfinder.api_controllers, "v1/user") );

//Validator.create,
router.post('/', Validator.create, jwtVerify.verifyToken, permission.canCreate, Controller.post);
router.post('/login', Validator.login, Controller.postLogin);
router.get('/', jwtVerify.verifyToken, permission.canView, Controller.get);
router.get('/:id', Validator.get, jwtVerify.verifyToken, permission.canView, Controller.getById);
router.put('/:id', Validator.update, jwtVerify.verifyToken, permission.canUpdate, Controller.update);
router.delete('/:id', Validator.delete, jwtVerify.verifyToken, permission.canDelete, Controller.delete);


module.exports = router;
