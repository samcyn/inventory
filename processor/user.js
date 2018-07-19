let processor = {},
    Promise = require('bluebird'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require("jsonwebtoken"),
    User = require(_pathfinder.database).User;
    // geoip = require('geoip-lite');


processor.create = function(user){
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

processor.get = function(params){
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
            console.log(user);
            if(!bcrypt.compareSync(params.password, user.password))
            {
                reject('Incorrect user login credentials, please try again.');
            }
            var user = {
                name: user.user_name,
                email: user.email,
                phone_number: user.phone_number
            }
            console.log('and here');
            const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE})
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE})
            let response = {
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
