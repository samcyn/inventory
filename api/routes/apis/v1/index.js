let router = require('express').Router(),
    userRoutes = require('./user');

    //initiate swagger
var swaggerJSDoc = require('swagger-jsdoc');

// Swagger jsdoc configuration
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Api documentation for the TSS inventory app.',
  },
  host: 'localhost:3120/apis/v1',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs

  apis: ['./swagger/apis/v1/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

router.get('/', function(req, res){
    res.send('You\'ve reached api/v1 routes');
});
router.get('/swagger.json', function(req, res){
    res.header('Content-Type', 'application/json');
    res.send(swaggerSpec);
})
router.use('/user', userRoutes);

module.exports = router;
