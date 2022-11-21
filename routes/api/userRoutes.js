const router = require('express').Router();

const {
    getUsers,
    getUserByID,
    addNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    } = require('../../controllers/userController');

    // https://localhost:3001/api/users
    router.route('/')
        .get(getUsers)
        .post(addNewUser);

    // /api/users/:id
    router.route('/:id')
        .get(getUserByID)
        .delete(deleteUser)
        .put(updateUser);

    // /api/users/:id/friends/:friendId
    router.route('/:id/friends/:friendID')
        .post(addFriend)
        .delete(deleteFriend);

    module.exports = router;

