const mongoose = require('mongoose')

//isValidBody
const isValidBody = (data) => {
    if (Object.keys(data).length > 0)
        return true
    return false
};

//name
const isValidName = (name) => {
    if ((typeof name == 'string' && name.trim().length != 0 && name.match(/^[A-Z a-z]{2,}$/)))
        return true
    return false
};

//isValidPwd
const isValidPass = (pass) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(pass)
    return regex
};

//isValidNumber
const isValidNumber = (ph) => {
    let regex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(ph)
    return regex
};

//isValid adhar  
const isValidAdhar = (no) => {
    let regex = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(no)
    return regex
};

//valid age 
const isValidAge = (no) => {
    let regex = /^\S[0-9]{0,3}$/.test(no)
    return regex
};

//isValidAddress
const isValidAddress = (txt) => {
    const regex = /^(?=.*[A-Za-z,.-?%!&]+)[A-Za-z,.-?%!&\s0-9]{2,}$/.test(txt)
    return regex
}

//isValidpincode
const isValidPin = (pin) => {
    let regex = /^[1-9]{1}[0-9]{5}$/.test(pin)
    return regex
};

//objectId
const isValidObjectId = (objId) => {
    return mongoose.Types.ObjectId.isValid(objId)
};

//isValid
const isValid = (value) => {
    if (!value) return false
    if (typeof value === "undefined" || typeof value === "null" || typeof value === "number") return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
};

//isValidString
const isValidString = (value) => {
    if (typeof value === "undefined" || typeof value === "null" || typeof value === "number") return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
};


module.exports = { isValidBody, isValidName, isValidAdhar, isValidPass, isValidNumber,isValidAge,
     isValidAddress, isValidPin, isValidObjectId, isValid, isValidString};