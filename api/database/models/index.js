let mongoose = require("mongoose"),
    DBConfig = require('../../config/database'),
    conn1;

mongoose.Promise = require("bluebird");

if(process.env.NODE_ENV === 'production')
    conn1 = mongoose.createConnection(DBConfig.mongodb.uri, DBConfig.mongodb.options);
else
    conn1 = mongoose.createConnection(DBConfig.mongodb.uri);

conn1.once('open', function callback() {
    console.log('db connection open');
});

let UserModel = require('./user')(mongoose, conn1);
let RoleModel = require('./role')(mongoose, conn1); 
module.exports = {
    User: UserModel,
    Role: RoleModel,
    mongoose: mongoose,
    mongodbConfig: DBConfig.mongodb
};
