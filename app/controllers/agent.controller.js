const db = require("../models");
const Agent = db.agent;
const User = db.user;


exports.getAllAgents = (req, res) => {
    Agent.findAll({
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving agents',
        });
      });
  };