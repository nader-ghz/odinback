



const controller = require('../controllers/reply.controller')

module.exports = function (app) {
  app.get('/api/replies/:commentaireId', controller.getRepliesByCommentaire)
  app.post('/api/replies', controller.createReply)
  


}
