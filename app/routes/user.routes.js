const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')
const multer = require('multer')
const path = require('path')
const playerController = require('../controllers/player.controller');

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/uploads/') // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

var upload = multer({
  storage: storage,
})

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/user/:id', controller.getUserInfo)
  app.get('/api/user', controller.findAll)
  app.put('/api/user/:id', controller.update)
  app.put('/api/user/img/:id', upload.single('image'), controller.changerImage)
 
  app.get('/api/user/:id/suggest/random', controller.suggestRandomUsers);
  app.post('/api/user/:id/sendFriendRequest/:friendId', controller.sendFriendRequest);
  app.post('/api/user/delete/:id', controller.delete);
  app.post('/api/user/edit/:id', controller.updateUserById);
  app.get('/api/user/:id/friend-requests', controller.getFriendRequests);
  app.put('/api/user/:iduser/updatePlayer', playerController.updatePlayerByUserId);

}
