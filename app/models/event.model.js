module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
        event_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        town: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        postcode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userID: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Event;
};
