const controller = require('../controllers/article.controller')

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/uploads/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

module.exports = function (app) {
  app.get('/api/articles/:id', controller.findOne)
  app.get('/api/articles/', controller.findAll)
  app.post('/api/articles/', upload.single("file"), controller.create)
  // app.put('/api/articles/:id', controller.update)
  app.put('/api/articles/:id', upload.single('file'), controller.update);

  app.delete('/api/articles/', controller.deleteAll)
  app.delete('/api/articles/:id', controller.delete)
  app.post('/api/articles/like/:articleId', controller.addLikeToArticle);
  // app.get('/api/articles/:id/likes', controller.getLikesForArticle);
  app.get('/api/articles/gallery/:id', controller.displayGallery);
  app.get('/api/articles/byUser/:userId', controller.findByUserId);


}
