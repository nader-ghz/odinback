module.exports = (sequelize, Sequelize) => {
  const Scout = sequelize.define('scouts', {
    totalPlayer: {
      type: Sequelize.STRING,
    },
    typeOfScouting: {
      type: Sequelize.STRING,
    },
    locationOfScouting: {
      type: Sequelize.STRING,
    },
      //tjs a la fin de process de register
      skills: {
        type: Sequelize.STRING,
      },
    
  })
  return Scout
}
