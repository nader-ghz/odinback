module.exports = (sequelize, Sequelize) => {
    const ImageEvent = sequelize.define('ImageEvent', {
        event_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return ImageEvent
}