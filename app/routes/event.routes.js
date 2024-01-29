const controller = require("../controllers/event.controller");
const multer = require("multer");
const path = require("path");

module.exports = function (app) {



// Set up multer to handle multipart/form-data
    const storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './public/uploads/album/');
        },
        filename: (req, file, callBack) => {
            callBack(
                null,
                file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            );
        },
    });

    const upload = multer({ storage: storage });
// Example route that uses multer to handle multipart/form-data
    app.post('/api/event/upload',upload.single('files') ,controller.createEvent);
    app.post('/api/event/apply/:userID/:eventID' , controller.apply);
    app.get('/api/event',controller.getAll);
    app.get('/api/event/:id',controller.getById);

}
