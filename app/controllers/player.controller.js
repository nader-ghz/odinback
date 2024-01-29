const {users, player } = require('../models');
const db = require("../models");
const Player = db.player;
const User = db.user;

exports.getPlayerByUserId = (req, res) => {
    const userId = req.params.iduser;
  
    Player.findOne({
      where: { iduser: userId },
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No player found for userId=${userId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving player for userId=' + userId,
        });
      });
  };
  exports.getAllPlayers = (req, res) => {
    Player.findAll({
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving players',
        });
      });
  };


  // exports.updatePlayerByUserId = async (req, res) => {
  //   const userId = req.params.iduser;
  
  //   try {
  //     // Update user information
  //     const [numUpdatedUsers] = await User.update(req.body, {
  //       where: { id: userId },
  //     });
  
  //     // Check if the user was found and updated
  //     if (numUpdatedUsers !== 1) {
  //       return res.status(404).send({
  //         message: `No user found for userId=${userId}.`,
  //       });
  //     }
  
  //     // Update player information
  //     const [numUpdatedPlayers] = await Player.update(req.body, {
  //       where: { iduser: userId },
  //     });
  
  //     // Check if the player was found and updated
  //     if (numUpdatedPlayers !== 1) {
  //       return res.status(404).send({
  //         message: `No player found for userId=${userId}.`,
  //       });
  //     }
  
  //     res.send({
  //       message: 'User and Player information updated successfully.',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({
  //       message: 'Error updating User and Player information.',
  //     });
  //   }
  // };


  exports.updatePlayerByUserId = async (req, res) => {
    const userId = req.params.iduser;
  
    try {
      // Update player information
      const [numUpdatedPlayers] = await Player.update(req.body, {
        where: { iduser: userId },
      });
  
      // Check if the player was found and updated
      if (numUpdatedPlayers !== 1) {
        return res.status(404).send({
          message: `No player found for userId=${userId}.`,
        });
      }
  
      res.send({
        message: 'Player information updated successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Error updating player information.',
      });
    }
  };