var OptionsBuilder = function(){
    this.options = {};
    return this;
};

OptionsBuilder.prototype.newOption = function(){
    this.options = {};
    return this;
};

OptionsBuilder.prototype.addRecipient = function(recipient){
    if(!this.options.Recipients)
        this.options.Recipients = [];

    this.options.Recipients.push(recipient);
    return this;
};

OptionsBuilder.prototype.setRecipients = function (recipients) {
    this.options.Recipients = recipients;
    return this;
};

OptionsBuilder.prototype.isUsingMailJetTemplate = function(bool){
    this.options['MJ-TemplateLanguage'] = bool;
    return this;
};

OptionsBuilder.prototype.setErrorReportingMail = function (email) {
    this.options['MJ-TemplateErrorReporting'] = email;
    return this;
};

OptionsBuilder.prototype.setSenderEmail = function(sender_email){
    this.options.FromEmail = sender_email;
    return this;
};

OptionsBuilder.prototype.setSenderName = function(sender_name){
    this.options.FromName = sender_name;
    return this;
};

OptionsBuilder.prototype.setSubject = function(subject){
    this.options.Subject = subject;
    return this;
};

OptionsBuilder.prototype.setVariables = function(vars){
    this.options.Vars = vars;
    return this;
};

OptionsBuilder.prototype.setHTMLContent = function(html){
    this.options['Html-part'] = html;
    return this;
};

OptionsBuilder.prototype.setTextContent = function(text){
    this.options['Text-part'] = text;
    return this;
};

OptionsBuilder.prototype.setAttachments = function(attachments){
    this.options.Attachments = attachments;
    return this;
};

OptionsBuilder.prototype.setTo = function(email){
    this.options.To = email;
    return this;
};

OptionsBuilder.prototype.setCc = function(email){
    this.options.Cc = email;
    return this;
};

OptionsBuilder.prototype.setBcc = function(email){
    this.options.Bcc = email;
    return this;
};

OptionsBuilder.prototype.setMailJetTemplateID = function(template_id){
    this.options['MJ-TemplateID'] = template_id;
    return this;
};

OptionsBuilder.prototype.build = function(){
    return this.options;
};

module.exports = OptionsBuilder;