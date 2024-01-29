const { authJwt } = require('../middleware');
const playerController = require('../controllers/player.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define the route for retrieving a player by userId
  app.get('/api/player/:iduser', playerController.getPlayerByUserId);

  app.get('/api/players', playerController.getAllPlayers);
  app.put('/api/player/:iduser', playerController.updatePlayerByUserId);
};
