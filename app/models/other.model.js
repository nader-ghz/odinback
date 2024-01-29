module.exports = (sequelize, Sequelize) => {
  const Other = sequelize.define('others', {
    profession: {
      type: Sequelize.STRING,
    },
    skills: {
      type: Sequelize.STRING,
    },
  })
  return Other
}
