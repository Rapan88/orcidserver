const { User } = require("../models/User");
const axios = require("axios");
const getDate = async (id) => {
  const urlArr = ["person", "works"];
  const profileUrl = `https://pub.orcid.org/v3.0/${id}/`; // Замініть на власний ORCID ідентифікатор
  const result = {};

  for (let i = 0; i < urlArr.length; i++) {
    result[urlArr[i]] = (await axios.get(`${profileUrl}${urlArr[i]}`)).data;
  }

  return result;
};

const getDataByOrcid = async (req, res) => {
  console.log("tut");
  const { orcid } = req.params;
  const data = await getDate(orcid);
  res.json(data);
};

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
  getDataByOrcid,
};
