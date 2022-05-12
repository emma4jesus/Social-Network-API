const { User } = require("../models");

// get users
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get User by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // add users

  addUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  //update User

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendID } },
      { runValidators: true, new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {},
};

module.exports = userController;
