const db = require("../models");
const Album = db.album;
const Images = db.imageAlbum;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

exports.createAlbum = async (req, res) => {
     // Handle the uploaded file if needed
        const data = req.body;
        try{
            if (!data.userID) {
                return res.status(400).send({
                    error : "please authenticate to be able to create an event"
                })
            }
            if (!data.AlbumName || !req.files.length > 0) {
                return res.status(401).send({
                    error : "All field required "
                })
            }

            const album = await Album.create({
                album_name: req.body.AlbumName,
                description: req.body. Description,
                userID: req.body.userID,
            })
            console.log(album.albums)
            const images = req.files.map(file => {
                return({
                    album_id: album.dataValues.id,
                    image_url: "http://localhost:8088/uploads/album/" + file.filename,
                })
            });

            try {
                // Bulk create the images
                await Images.bulkCreate(images).then(() => {
                   console.log('done')
                });
            } catch (error) {
                console.error("Error creating images:", error);
                // Handle the error as needed
            }
        }catch(e) {
           console.log(e)
        }

}

exports.getAll = async (req, res) => {

    const albumWithImages = await Album.findAll({
        include: { model: Images },
    });
    return res.status(200).send({
        message : 'done' ,
        data : albumWithImages,
    })
}
    exports.getById = async (req, res) => {
        const { id } = req.params;
        console.log(id)
        const singleAlbumWithImages = await Album.findOne({
            where  : { id : id},
            include: { model: Images },
        })

    return res.status(200).send({
        message : 'done' ,
        data : singleAlbumWithImages,
    })
}