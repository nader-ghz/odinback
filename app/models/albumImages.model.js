module.exports = (sequelize, Sequelize) => {
    const ImagesAlbum = sequelize.define('ImagesAlbum', {
        album_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return ImagesAlbum
}