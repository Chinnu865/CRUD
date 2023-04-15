const { generateToken } = require('../jwt/authtoken');
const user = require('./user.model'); 
const { compare } = require('bcrypt');
const { logger } = require('../logger');

exports.fetchUsers = async () => {

    const result = await user.find().count();
    if(result) {
        return { error: null, data: result, total: result.count, message: `all users`}
    } else {
        return { error: true, data: result, total: result.count, message: `no users`}
    }
}

exports.fetchUserByID = async (id) => {

    const result = await user.findById(id);
    if(result) {
        return { error: null, data: result, total: result.count, message: `registered user`}
    } else {
        return { error: true, data: result, total: result.count, message: `not a registered user`}
    }
}

exports.insertUser = async ({name, email, password}) => {

    const result = await user.create({name, email, password});
    if(result) {
        return { error: null, data: result, message: `user registered`}
    } else {
        return { error: true, data: result, message: `not a user registered`}
    }
}

exports.modifyUser = async ({name, email, password}) => {
    
    const result = await user.updateOne({name, email, password})
    if(result) {
        return { error: null, data: result, message: `user updated`}
    } else {
        return { error: true, data: result, message: `user not updated`}
    }
}

exports.removeUser = async (id) => {
    const result = await user.deleteOne({ _id: id })
    if (result) {
        return { error: null, data: result, message: "User Deleted" };
    } else {
        return { error: true, data: result, message: "User Not found" };
    }
}

exports.loginService = async ({ email, password }) => {
    const found = await user.findOne({ email })
    if(found) {
        const check = compare(password, found.password)
        if(check) {
            const payload = {
                id : user._id,
                name : user.name,
                email : user.email
            }
            const token = generateToken(payload);
            logger.info(token);
            if(token) {
                return { error: null, data: token, message: "token generated" };
            } else {
                return { error: true, data: token, message: "token not generated" };
            }
        } 

    }
}