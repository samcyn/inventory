function LogException(message)
{
    this.message = message;
    this.name = "LogException";
}

class Log
{
    constructor(options)
    {
        this.winston = require("winston");
        this.winstonMongoDB = require("winston-mongodb");

        this.init(options);
    }

    log(message, meta, level)
    {
        level = level || "info";
        meta = meta || {};

        this.winstonLogObj.log(level, message, meta);
    }


    init(options)
    {
        var transports = [];

        if(options.console)
        {
            if(options.console.enabled !== false)
            {
                var op1 = new this.winston.transports.Console({
                    enabled: options.console.enabled || true,
                    name: options.console.name || "console",
                    level: options.console.level || "info",
                    handleExceptions: options.console.handleException || true,
                    json: options.console.json || true
                });

                transports.push(op1);
            }
        }

        if(options.mongodb)
        {
            if(!options.mongodb.connectionUrl)
            {
                throw new LogException("db option is required for mongodb logging");
            }

            var op2 = new this.winstonMongoDB.MongoDB({
                name: options.mongodb.name || "mongodb",
                level: options.mongodb.level || "info",
                db: options.mongodb.connectionUrl,
                collection: options.mongodb.collection || "Log"
            });

            transports.push(op2);
        }

        if(options.file)
        {
            if(!options.file.filename)
            {
                throw new LogException("filename option is required for file logging");
            }

            if(options.file.enabled !== false)
            {
                var op3 = new this.winston.transports.File({
                    name: options.file.name || "file",
                    level: options.file.level || "info",
                    filename: options.file.filename
                });

                transports.push(op3);
            }
        }

        this.winstonLogObj = new (this.winston.Logger)({
            transports: transports
        });
    }

    disableTransportByName(transportName)
    {
        this.winstonLogObj.remove(transportName);
    }
}

module.exports = Log;
