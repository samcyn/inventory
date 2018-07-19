
let express = require('express');
let router = express.Router();
let Validator = require(_pathfinder.join(_pathfinder.middlewares, "validators/user")),
Controller = require(_pathfinder.join(_pathfinder.api_controllers, "v1/user") );

//Validator.create,
router.post('/', Validator.create, Controller.post);
router.post('/login', Validator.login, Controller.postLogin);
router.get('/',  Controller.get);
router.get('/:id', Validator.get, Controller.getById);
router.put('/:id', Validator.update, Controller.update);
router.delete('/:id', Validator.delete, Controller.delete);


module.exports = router;
