let path = require("path"),
    PathFinder;

PathFinder = {};

// root of the application
PathFinder.root = path.join(__dirname, "../");

// controllers
PathFinder.controllers = path.join(PathFinder.root, "controllers");
PathFinder.api_controllers = path.join(PathFinder.controllers, "apis");


//database
PathFinder.database = path.join(PathFinder.root, "database/models/index");

PathFinder.services = path.join(PathFinder.root, "services");

//storage
PathFinder.storage = path.join(PathFinder.root, "storage");
PathFinder.logs = path.join(PathFinder.storage, "logs");

//routes
PathFinder.routes = path.join(PathFinder.root, "routes");

//public
PathFinder.public = path.join(PathFinder.root, "public");

//views
PathFinder.views = path.join(PathFinder.root, "views");

// hold all login of the system
PathFinder.processor = path.join(PathFinder.root, "processor");

//middlewares
PathFinder.middlewares = path.join(PathFinder.root, "middlewares");
PathFinder.validators = path.join(PathFinder.middlewares, "validators");
PathFinder.permissions = path.join(PathFinder.middlewares, "permissions");

//config
PathFinder.config = __dirname;

// utils
PathFinder.utils = path.join(PathFinder.root, "utils");

PathFinder.nodepath = path;

PathFinder.join = path.join;

module.exports = PathFinder;
