module.exports = (sequelize, Sequelize) => {
    const EventApplication = sequelize.define("EventApplication", {
        event_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return EventApplication;
};
