var
    Transformer = require( _pathfinder.join(_pathfinder.utils, 'transformer') ),
    Util = require(_pathfinder.join(_pathfinder.utils, 'util') ),
    AdminPermissionList = require( _pathfinder.join(_pathfinder.config, '/permissions/admin') ),
    AdminPermission = {};

//admin permissions
AdminPermission.canView = function(req, res, next){
    return AdminPermission.processPermission(AdminPermissionList.view_admin, req, res, next);
};

AdminPermission.canCreate = function(req, res, next){
    return AdminPermission.processPermission(AdminPermissionList.create_admin, req, res, next);
};

AdminPermission.canDelete = function(req, res, next){
    return AdminPermission.processPermission(AdminPermissionList.delete_admin, req, res, next);
};

AdminPermission.canUpdate = function(req, res, next){
    return AdminPermission.processPermission(AdminPermissionList.update_admin, req, res, next);
};

AdminPermission.processPermission = function(requested_permission, req, res, next){
    var Product, permissions;

    if(!req.user)
    {
        return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
    }

    Product = Util.getRFCFromUser(req.user);

    permissions = Product.permissions;

    if( !permissions.includes(AdminPermissionList[requested_permission]) )
    {
        return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
    }

    next();
};

module.exports = AdminPermission;