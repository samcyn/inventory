'use strict';

module.exports = function(mongoose, connection){
    var RoleDefinition,
        RoleSchema;

    RoleDefinition = {
        name: {type: String, required: true},
        display_name: {type: String},
        description: {type: String},
        permissions: [{type: String}],
    };

    RoleSchema = new mongoose.Schema(RoleDefinition, {
        collection: 'roles',
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });

    return connection.model('Role', RoleSchema);
};