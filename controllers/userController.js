const { Thought, User } = require("../models");

const userController = {
  // GET all Users
  getUsers(req, res) {
    User.find({})
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

//get users by id
//http://localhost:3001/api/goals/id
  getUserByID(req,res) {
    User.findOne({_id: req.params.id})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log('Error: ', err);
        res.status(500).json(err);
      });
  },

//add new user
//http://localhost:3001/api/goals/  
  addNewUser(req, res) {
    User.create(req.body)
    .then(UserData => res.json(UserData))
    .catch(err => res.status(400).json(err));
  },

    // delete user and associated thought
    //https://localhost:3001/api/users/id
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({
              message: "Error: User does not exist.",
            });
          }
          Thought.deleteMany({username: dbUserData.username})
          .then((result) => {
            res.status(200).json({
              message: "User deleted successfully.",
            });
          })
          .catch((thoughtsError) => {
            res.status(500).json({
              message: "An error occured deleting thoughts."
            });
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).json(err);
        });
    },

    // update user
    // https://localhost:3001/api/users/id
    updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({
              message: "Eror: user not found.",
            });
            } else {
            res.status(200).json({
              message: "User updated.",
              user: dbUserData,
          });
          }
        })
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
    },

    //add friend
    addFriend(req, res) {
      User.findByIdAndUpdate(
        req.params.id,
        { $push: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbFriendData) => {
          if (!dbFriendData) {
            res.status(404).json({
              message: "Error: user not found",
            });
          } else {
            res.status(200).json({
              message: "Friends updated.",
              user: dbFriendData,
            });
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).json(err);
        });
    },

    //delete friend
    deleteFriend(req, res) {
      User.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((dbFriendData) => {
          if (!dbFriendData) {
            res.status(404).json({
              message: "Error: User does not exist.",
            });
          } else {
            res.status(200).json({
              message: "Friend deleted successfully.",
              user: dbFriendData,
            });
          }
        })
        .catch((err) => {
          console.log("An error has occurred: ", err);
          res.status(500).json(err);
        });
    },
  };

  module.exports = userController;


