var
    Transformer = require( _pathfinder.join(_pathfinder.utils, 'transformer') ),
    PermissionList = require( _pathfinder.join(_pathfinder.config, '/permission') ),
    UserPermission = {};

//admin permissions
UserPermission.canView = function(req, res, next){

    if(!req.decodedToken)
    {
        return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
    }
    console.log(req.decodedToken);
    let permissionList = req.decodedToken.role.permissions;
    let can_view = permissionList.includes(PermissionList.READ_USER) || permissionList.includes(PermissionList.GLOBAL) || permissionList.includes(PermissionList.GLOBAL_USER);
    if(!can_view){
        return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
    }
    next()
};

UserPermission.canCreate = function(req, res, next){

    if(!req.decodedToken)
    {
        return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
    }
    console.log(req.decodedToken);
    let permissionList = req.decodedToken.role.permissions;
    let can_view = permissionList.includes(PermissionList.WRITE_USER) || permissionList.includes(PermissionList.GLOBAL) || permissionList.includes(PermissionList.GLOBAL_USER);
    if(!can_view){
        return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
    }
    next()
};

UserPermission.canDelete = function(req, res, next){

    if(!req.decodedToken)
    {
        return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
    }

    let permissionList = req.decodedToken.role.permissions;
    let can_view = permissionList.includes(PermissionList.GLOBAL) || permissionList.includes(PermissionList.GLOBAL_USER);
    if(!can_view){
        return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
    }
    next()
};

UserPermission.canUpdate = function(req, res, next){

    if(!req.decodedToken)
    {
        return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
    }

    let permissionList = req.decodedToken.role.permissions;
    let can_view = permissionList.includes(PermissionList.GLOBAL) || permissionList.includes(PermissionList.GLOBAL_USER);
    if(!can_view){
        return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
    }
    next()
};


module.exports = UserPermission;