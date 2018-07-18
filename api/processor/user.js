let processor = {},
    Promise = require('bluebird'),
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

processor.getById = function(user_id){
    return new Promise(function(resolve, reject){
        var query = {_id: user_id};

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
