const { fetchUsers, fetchUserByID, insertUser, modifyUser, removeUser, loginService } = require(`./user.service`);
const response = require('../response');
const morgan = require('morgan');


exports.getUsers = async (req, res) => {
    const result = await fetchUsers();
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.noData(res, result);
    }
}

exports.getUserByID = async (req, res) => {
    const { id } = req.params;
    const result = await fetchUserByID(id);
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.noData(res, result);
    }
}

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const result = await insertUser({name, email, password});
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.unprocessableEntity(res, result);
    }
}

exports.updateUser = async (req, res) => {
    const {name, email, password} = req.body;
    const result = await modifyUser({name, email, password});
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.unprocessableEntity(res, result);
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const result = await removeUser(id);
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.unprocessableEntity(res, result);
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const result = await loginService({ email, password });
    if(!result.error) {
        return response.ok(res, result);
    } else {
        return response.unprocessableEntity(res, result);
    }
}