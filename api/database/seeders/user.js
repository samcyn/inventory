require('dotenv').config();
global._pathfinder = require('../../config/path_finder');
let permissions = require(_pathfinder.join(_pathfinder.config, 'permission'));
const database = require('../models/index');

database.mongoose.connect(database.mongodbConfig.uri, database.mongodbConfig.options, function(err) {
    if (err)
    {
        console.log('Mongodb connection error', err);
        process.exit();
    }
    else
    {
        console.log('Mongodb connection successful');
        database.User
            .create({
                username: 'coding-muse',
                password: 'superduperpassword1234',
                email: 'dent4real@yahoo.com',
                role:  '5b4fafca821cf474ccf0a221',
                phone_number: 08167558013,
                permissions: [permissions.GLOBAL]
            })
            .then(function(todo){
                console.log(todo.toJSON());
                database.mongoose.connection.close();
                process.exit();
            })
            .catch(function(error){
                console.log(error);
                database.mongoose.connection.close();
                process.exit();
            });
    }
});
