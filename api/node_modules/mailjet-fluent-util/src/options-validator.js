
var isMailOptionSendable = function(mailOptions){
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

module.exports = {
    isMailOptionSendable: isMailOptionSendable
};

