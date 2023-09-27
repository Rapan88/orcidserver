const { User } = require("../models/User");

const getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUser = (req, res) => {
  const { full_name, orcid, rank, position, section } = req.body;

  User.create({ full_name, orcid, rank, position, section })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getUsers,
  createUser,
};
