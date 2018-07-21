let processor = {},
    Promise = require('bluebird'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require("jsonwebtoken"),
    User = require(_pathfinder.database).User;

processor.create = function(user){
    if(!user.permissions){
        user.permissions = [];
    }
    return new Promise(function(resolve, reject){
        User.create(user).then(function(docs){
            resolve(docs)
        }).catch(function(error){
            reject(error);
        });
    });
};

processor.update = function(user_id, user){
    return new Promise(function(resolve, reject){
        User.update({_id: user_id}, {$set: user}, function(err, update){
            if(err)
                reject(err);
            else
                resolve(update);
        });
    });
}

processor.get = function(){
    return new Promise(function(resolve, reject){
        let query = {};
        
        User.find(query)
        .sort({created_at: 'descending'})        
        .then(function(users){
            resolve(users);
        }).catch(function(error){
            reject(error);
        });
    });
}

processor.login = function(params){
    return new Promise(function(resolve, reject){
        let query = {email: params.email};
        
        User.findOne(query).populate('role')
        .sort({created_at: 'descending'})        
        .then(function(user){
            if(!user)
            {
                reject('Incorrect user credentials.');
            }

            if(!bcrypt.compareSync(params.password, user.password))
            {
                reject('Incorrect user login credentials, please try again.');
            }
            var user = {
                name: user.username,
                email: user.email,
                role: user.role,
                phone_number: user.phone_number
            }

            var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
                data: user
            }, process.env.SECRET);

            var refreshToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 128),
                data: user
            }, process.env.REFRESH_TOKEN_SECRET);
            let response = {
                user: user,
                message: "login successful",
                token: token,
                refreshToken: refreshToken
            }
            resolve(response);
        }).catch(function(error){
            reject(error);
        });
    });
}

processor.getById = function(user_id){
    return new Promise(function(resolve, reject){
        let query = {_id: user_id};

        User.findOne(query).populate('role')
            .then(function(user){
                resolve(user);
            })
            .catch(function(error){
                reject(error);
            });
    });
}

processor.delete = function(user_id){
    return new Promise(function(resolve, reject){
        User.remove({_id: user_id}, function(err, update){
            if(err)
                reject(err);
            else
                resolve(update);
        });
    });
}

module.exports = processor;
