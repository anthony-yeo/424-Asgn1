function validPass(password){
    if(containsCap(password) && 
        containsLow(password) &&
        containsNum(password) && 
        containsSym(password) &&
        (password.length > 8)){
        return true;
    } else {
        return undefined;
    }
}

function containsCap(str){
    return /[A-Z]/.test(str);
}

function containsLow(str){
    return /[a-z]/.test(str);
}

function containsNum(str){
    return /\d/.test(str);
}

function containsSym(str){
    return /[!@#$%^&*(),.?":{}|<>]/.test(str); 
}

exports.validPass = validPass;


