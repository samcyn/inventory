# `mailjet-fluent-util` — Mailjet Fluent Utility

A fluent utility over node-mailjet for handling mail validation and options builder.

## Getting Started

## Installation
`npm install --save mailjet-fluent-util`

##Usage
``` javascript

var MailjetFluentUtil = require('mailjet-fluent-util');

var MailjetFluentUtilObject = new MailjetFluentUtil().connect('api_key MJ_APIKEY_PUBLIC', 'api_secret MJ_APIKEY_PRIVATE');

```

### Send Email

```
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

```

### More Examples

For examples coming soon.

## Contact
For more information on Node-Mailjet please check out [mailjet][mailjetlink].
For guidance on how to use this module, email me: [Support][supportemail].

[supportemail]: mailTo:benjamineloke@gmail.com
[mailjetlink]: https://github.com/mailjet/mailjet-apiv3-nodejs