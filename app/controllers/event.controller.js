const db = require("../models");
const Event = db.event;
const Images = db.imageEvent;
const User = db.user;
const EventApplication = db.eventApplication;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

exports.createEvent = async (req, res) => {
    // Handle the uploaded file if needed
    const data = JSON.parse(req.body.data);
    try{
        if (!data.userId) {
            return res.status(400).send({
                error : "please authenticate to be able to create an event"
            })
        }
        if (!data.EventName ||!data.address || !data.date||!data.description ) {
            return res.status(401).send({
                error : "All field required "
            })
        }

        const event = await Event.create({
            event_name: data.EventName,
            address : data.address ,
            description : data.description,
            country : data.country ,
            town: data.town,
            date : data.date ,
            postcode : data.Postcode,
            userID : data.userId,
        })
        console.log(event)
        const images = {
                event_id: event.dataValues.id,
                image_url: "http://localhost:8088/uploads/album/" + req.file.filename,
        }
        console.log('sfgsd' , images)
        try {
            // Bulk create the images
            await Images.create(images).then(() => {
                console.log('done')
            });
        } catch (error) {
            console.error("Error creating images:", error);
            // Handle the error as needed
        }
        res.status(200).send({
            message:  "Event added successfully",
        });
    }catch(e) {
        console.log(e)
    }

}

exports.getAll = async (req, res) => {

    const eventWithImages = await Event.findAll({
        include: [{ model: Images }],
    });
    return res.status(200).send({
        message : 'done' ,
        data : eventWithImages,
    })
}
exports.getById = async (req, res) => {
    const { id } = req.params;
    const singleAlbumWithImages = await Event.findOne({
        where  : { id : id},
        include: { model: Images },
    })

    return res.status(200).send({
        message : 'done' ,
        data : singleAlbumWithImages,
    })
}

exports.apply = async (req, res) => {
    const { userID, eventID } = req.params;
    try{
        const exist = await EventApplication.findOne({
            where: {
                user_id: userID,
                event_id: eventID,
            },
        })
        if(exist){
            console.log('Event found:', exist);
            return res.status(200).send({
                message : 'already applied' ,
            })
        }else {
            const application = await EventApplication.create({
                event_id : eventID,
                user_id  : userID,
            }).then(() => {
                return res.status(200).send({
                    message : 'done' ,
                    data : userID,
                })
            })
        }

    }catch (e) {
        console.log('error found:', e);
    }



}