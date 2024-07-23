'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = function(value, message) {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMinLen = function(value, min, message) {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMaxLen = function(value, max, message) {
    if (!value || value.length > max)
        errors.push({ message: message });
}

ValidationContract.prototype.isFixedLen = function(value, len, message) {
    if (value.length != len)
        errors.push({ message: message });
}

ValidationContract.prototype.isEmail = function(value, message) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.isBase64 = function(value, message) {
    const base64Pattern = /^data:image\/[a-zA-Z]+;base64,[^\s]+$/;
    if (!base64Pattern.test(value)) {
        errors.push({ message: message });
    }
}

ValidationContract.prototype.errors = function() {
    return errors;
}

ValidationContract.prototype.clear = function() {
    errors = [];
}

ValidationContract.prototype.isValid = function() {
    return errors.length == 0;
}

module.exports = ValidationContract;
