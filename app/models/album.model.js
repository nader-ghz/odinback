module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("albums", {
        album_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userID: {
            type: Sequelize.INTEGER,
        },
    });

    return Album;
};
