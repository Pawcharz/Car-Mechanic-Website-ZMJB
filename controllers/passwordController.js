const Password = require("../models/password");
const path = require("path");
let MD5 = require("crypto-js/md5");


const setPassword = async () => {
    try {
        let passwordData = {
            value: "12345"
        }

        let newPassword = new Password(passwordData);
        let newPasswordDb = await newPassword.save();

    } catch (err) {
        console.log(err);
    }
}


const updatePassword = async (oldPassword, newPassword) => {
    try {        
        let passwordDb = await Password.findOne();

        if(passwordDb.value == oldPassword) {

            passwordDb.value = newPassword;
            await passwordDb.save();

            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
    
}

const verifyPassword = async (password) => {
    try {

        let validPassword = await Password.findOne();
        validPassword = validPassword.value;

        if(password == validPassword) {
            return true;
        }
        else{
            return false;
        }

    } catch (err) {
        console.log(err)
    }
    
}

module.exports = {
    verifyPassword,
    updatePassword,

}