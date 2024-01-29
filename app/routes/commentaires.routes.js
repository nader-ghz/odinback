const controller = require('../controllers/commentaires.controller')

module.exports = function (app) {
  app.get('/api/commentaires/:id', controller.findOne)
  app.get('/api/commentaires/', controller.findAll)
  app.post('/api/commentaires/', controller.create)
  app.put('/api/commentaires/:id', controller.update)
  app.delete('/api/commentaires/', controller.deleteAll)
  app.delete('/api/commentaires/:id', controller.delete)


  app.get('/api/commentaires/article/:articleId', controller.findCommentsOfArticle)

}
