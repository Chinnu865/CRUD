const router = require('express').Router();
const { getUsers, getUserByID, createUser, updateUser, deleteUser, login } = require('./user.controller');

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login)
module.exports = router;