require('dotenv').config();
global._pathfinder = require('../../config/path-finder');
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
        database.Permission
            .insertMany([
                {
                    name: 'global',
                    description: 'Performs all operations',
                },
                {
                    name: 'read_user',
                    description: 'Retrieves members from db',
                },
                {
                    name: 'write_user',
                    description: 'Write members to db',
                },
                {
                    name: 'global_user',
                    description: 'Performs all operations on member',
                },
                {
                    name: 'read_item',
                    description: 'Retrieves items from db',
                },
                {
                    name: 'write_item',
                    description: 'Write items to database',
                },
                {
                    name: 'global_item',
                    description: 'Performs all operations on items',
                },
                {
                    name: 'read_order',
                    description: 'Retrieves items from db',
                },
                {
                    name: 'write_order',
                    description: 'Write items to database',
                },
                {
                    name: 'read_sale',
                    description: 'Retrieves items from db',
                },
                {
                    name: 'write_sale',
                    description: 'Write items to database',
                }
            ])
            .then(function(docs){
                console.log(docs);
                database.mongoose.connection.close();
                process.exit();
            })
            .catch(function(error){
                console.log(error.message);
                database.mongoose.connection.close();
                process.exit();
            });
    }
});
