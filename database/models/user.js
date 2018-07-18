'use strict';

module.exports = function(mongoose, connection){
    let UserDefinition, UserSchema,
        Schema = mongoose.Schema,
        bcrypt = require("bcrypt-nodejs");

    UserDefinition = {
        phone_number: {type: String, unique: true, required: true},
        email: {type: String, unique: true},
        username: {type: String},
        password: {type: String, required: true},
        blocked: {type: Boolean, default: false},
        role: {type: Schema.ObjectId, ref: 'Role'},
        permissions: [{type: String}],
        last_login: {type: Date},
        login_count: {type: Number},
        deleted_at: {type: Date, default: null}
    };
    
    UserSchema = new mongoose.Schema(UserDefinition, {
        collection: 'users',
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });
    UserSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    UserSchema.pre("save", function(next) {
        if(this.password)
            this.password = bcrypt.hashSync(this.password);
        next();
    });

    UserSchema.pre('update', function(next){
        var update = this.getUpdate();

        if(update.$set)
        {
            if(update.$set.password)
                update.$set.password = bcrypt.hashSync(update.$set.password);
        }
        this.update({}, update);

        next();
    });

    return connection.model('User', UserSchema);
};