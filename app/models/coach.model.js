module.exports = (sequelize, Sequelize) => {
  const Coach = sequelize.define('coachs', {
    totalTeam: {
      type: Sequelize.STRING,
    },
    countryCoachedIn: {
      type: Sequelize.STRING,
    },
     //tjs a la fin de process de register
     skills: {
      type: Sequelize.STRING,
    },
  })
  return Coach
}
