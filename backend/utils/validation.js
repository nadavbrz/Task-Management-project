function isValidText(value, minLength =0){
    return value && value.trim().length > minLength;

}
function isValidEmail(value){
    return value && value.includes('@')
}

exports.isValidEmail = isValidEmail
exports.isValidText = isValidText