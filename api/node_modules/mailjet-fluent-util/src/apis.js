var NodeMailjet = require('node-mailjet'),
    Bluebird = require('bluebird'),
    OptionsBuilder = require('./options-builder'),
    OptionsValidator = require('./options-validator');

var api = {};

api.nodeMailjetObject = null;

api.disconnect = function(){
    this.nodeMailjetObject = null;
};

api.sendMail = function(mailOptions){
    var deferred = new Bluebird.defer();

    api.nodeMailjetObject
        .post('send')
        .request(mailOptions)
        .then(function(result){
            deferred.resolve(result);
        })
        .catch(function(error){
            deferred.reject(error);
        });

    return deferred.promise;
};

api.OptionsBuilder = OptionsBuilder;

api.isMailOptionSendable = function(mailOptions){
    var self = this;
    self.mailOptions = mailOptions;
    self.errors = [];

    self.addError = function(field, msg){
        self.errors.push({field: field, message: msg});
    };

    self.isValidEmail = function(email){
        return (new RegExp("^.+@.+\..+$", "ig")).test(email);
    };

    if(!this.mailOptions.Recipients || this.mailOptions.Recipients.length <= 0 )
    {
        if(!this.mailOptions.To)
        {
            self.addError('Recipients', 'No recipient supplied');
        }
    }

    if(!this.mailOptions.FromEmail || !self.isValidEmail(this.mailOptions.FromEmail) )
    {
        self.addError('FromEmail', 'Invalid Sender Email');
    }

    return self.errors;
};

api.OptionsValidator = OptionsValidator;

api.connect = function(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE){
    this.nodeMailjetObject = NodeMailjet.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);
    return api;
};

module.exports = api;