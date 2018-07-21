require('dotenv').config();
global._pathfinder = require('../../config/path_finder');
const database = require('../models/index');
let permissions = require(_pathfinder.join(_pathfinder.config, 'permission'));

database.mongoose.connect(database.mongodbConfig.uri, database.mongodbConfig.options, function(err) {
    if (err)
    {
        console.log('Mongodb connection error', err);
        process.exit();
    }
    else
    {
        console.log('Mongodb connection successful');
        database.Role
            .insertMany([
                {
                    name: 'super_admin',
                    display_name: 'Super Admin',
                    description: "The role for The over all admin",
                    permissions: [permissions.GLOBAL],
                },
                {
                    name: 'admin',
                    display_name: 'Admin',
                    description: 'The role for admin with restricted access',
                    permissions: [permissions.READ_USER, permissions.READ_SALE, permissions.READ_ITEM, permissions.WRITE_ITEM, permissions.READ_ORDER, permissions.READ_PERFORMANCE]  
                },
                {
                    name: 'inventory_manager',
                    display_name: 'Inventory Manager',
                    description: 'The role for users with special stock/item permisions',
                    permissions: [permissions.READ_USER, permissions.READ_ITEM, permissions.WRITE_ITEM],
                },
                {
                    name: 'cashier',
                    display_name: 'Cashier',
                    description: 'The role for the user with special sales permissions',
                    permissions: [permissions.READ_USER, permissions.WRITE_SALE, permissions.WRITE_ORDER],
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
