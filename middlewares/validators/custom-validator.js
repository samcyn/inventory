"use strict";
let moment = require('moment');
let permissions = require(_pathfinder.join(_pathfinder.config, 'permission'));
let lodash = require('lodash');
let CustomValidators = {};



function arrayContainsArray (superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

CustomValidators.emailOrPhoneNumber = function(input){
    return false;
};

CustomValidators.isGT = function(input, num){
    return num > input;
};

CustomValidators.isGTE = function(input, num){
    return num >= input;
};

CustomValidators.isLT = function(input, num){
    return num < input;
};

CustomValidators.isLTE = function(input, num){
    return num <= input;
};

CustomValidators.isEqual = function(input, val){
    if(!input)
        return false;

    return val === input;
};

CustomValidators.isLengthEqual = function(input, val){
    if(!input)
        return false;

    return input.length === val;
};

CustomValidators.isMinLen = function(input, val){
    if(!input)
        return false;

    return input.length >= val;
};

CustomValidators.isMaxLen = function(input, val){
    if(!input)
        return false;

    return input.length <= val;
};

CustomValidators.isGender = function(input){
    try{
        input = input.toString().toUpperCase();
    }
    catch(e){
        return false;
    }

    return ["MALE", "FEMALE"].includes(input);
};

CustomValidators.isHouseAddress = function(input){
    if(typeof input !== 'string')
        return false;

    if(input.length < 2 || input.length > 100)
        return false;

    return /^([a-zA-Z#,.\d\s])*$/.test(input);
};

CustomValidators.isBVN = function(input){
    return /^(2)([0-9]{10})$/.test(input);
};

CustomValidators.isNigerianMobile = function(input){
    return /^(0)*(\d{10})$/.test(input);
};

CustomValidators.isUserType = function(input){
    return /^([a-zA-Z\d\-])*$/.test(input);
};

CustomValidators.isName = function(input){
    return /[\w\s\—\-]{3,50}/.test(input);
};

CustomValidators.isProductCode = function(input){
    return /[A-Z]{3}/.test(input);
};

CustomValidators.isInitiatorId = function(input){
    return /[\w\s/—-]{2,50}/.test(input);
};

CustomValidators.isRoute = function(input){
    return /[\w//]*/.test(input);
};

CustomValidators.isUserAgent = function(input){
    return /.+?[/\s][\d.]+/.test(input);
};

CustomValidators.isIpAddress = function(input){
    return /((1?\d\d?|2[0-4]\d|25[0-5])\.){3}(1?\d\d?|2[0-4]\d|25[0-5])/.test(input);
};

CustomValidators.isIdType = function(input){
    if(input.length < 2 || input.length > 50)
        return false;

    return /^([a-zA-Z#\-\\\/\d])*$/.test(input);
};

CustomValidators.isIdNumber = function(input){
    if(input.length < 2 || input.length > 50)
        return false;

    return /^([a-zA-Z#\-\\\/\d])*$/.test(input);
};

CustomValidators.isOccupation = function(input){
    if(input.length < 2 || input.length > 50)
        return false;

    return /[a-zA-Z\d\s]/.test(input);
};

CustomValidators.isHumanName = function(input){
    if(typeof input !== 'string')
        return false;

    if(input.length < 2 || input.length > 50)
        return false;

    return /^([a-zA-Z,.\d\s\-])*$/.test(input);
};

CustomValidators.isHumanTitle = function(input){
    try{
        input = input.toString().toUpperCase();
    }
    catch(e){
        return false;
    }

    return ["MR", "MRS", "MISS"].includes(input);
};

CustomValidators.isEmployeeContractType = function(input){
    try{
        input = input.toString().toUpperCase();
    }
    catch(e){
        return false;
    }

    return ["FULL-TIME", "PART-TIME", "CONTRACT"].includes(input);
};

CustomValidators.isEmployeeRole = function(input){
    try{
        input = input.toString().toUpperCase();
    }
    catch(e){
        return false;
    }

    return ["COMPANY-ADMIN", "STAFF-ADMIN", "FINANCE-ADMIN", "STAFF"].includes(input);
};

CustomValidators.isGrantType = function(input){
    return ['password', 'authorization_code', 'refresh_token', 'client_credentials'].includes(input);
};

CustomValidators.isPermission = function(input){
    var pArray = [];
    for (var key in permissions) {
        if (permissions.hasOwnProperty(key)) {
            pArray.push(permissions[key]);
        }
    }
    return arrayContainsArray (pArray, input);
    // return lodash.some(input,pArray) 
};

CustomValidators.isEmailV2 = function(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

CustomValidators.isDateV2 = function(input){
    return moment(input).isValid();
};

CustomValidators.isArray = function(input){
    return Array.isArray(input);
};

module.exports = CustomValidators;
