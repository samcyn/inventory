//add new file extension html
require.extensions[".html"] = function (module, filename) {
    var fs = require('fs');
    module.exports = fs.readFileSync(filename, "utf8");
};
var MailjetFluentUtil = require('../index').connect('MJ_APIKEY_PUBLIC', 'MJ_APIKEY_PRIVATE');

var Template = require("./template.html"); // A template (.html or .mjml) for the mail.

var MailOption = new MailjetFluentUtil.OptionsBuilder()
    .setSubject("Mail Subject")
    .setSenderEmail("sender@mail.com")
    .setSenderName("Sender Name")
    .setHTMLContent(Template)
    .isUsingMailJetTemplate(true) //set to true when using a template
    .setErrorReportingMail("A email Mailjet sends error report when there is an error with the template")
    .addRecipient({
        Email: "example@mail.com",
        Name: "Example"
    })
    .setVariables({
        "name": "Example",
        "company": "My Company"
    })
    .build();

var errors = MailjetFluentUtil.isMailOptionSendable(MailOption);

if(errors.length > 0)
{
    return console.log(errors);
}

MailjetFluentUtil.sendMail(MailOption).then(function(result){
    console.log(result.body);
}).catch(function(error){
    console.log("An error occurred", error);
});