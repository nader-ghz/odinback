module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define('player', {
    height: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.STRING,
    },
    strongSkill: {
      type: Sequelize.STRING,
    },
    positionPlay: {
      type: Sequelize.STRING,
    },
    positionSecond: {
      type: Sequelize.STRING,
    },
    skillsInProfile: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })
  return Player
}
