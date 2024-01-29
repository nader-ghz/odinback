module.exports = (sequelize, Sequelize) => {
  const Agent = sequelize.define("agents", {
    totalPlayer: {
      type: Sequelize.STRING,
    },
    totalCareerTransfers: {
      type: Sequelize.STRING,
    },
    clubCovered: {
      type: Sequelize.STRING,
    },
    
    //soit pour des joueurs soit pour une equipe
    typeresponsable: {
      type: Sequelize.STRING,
    },
    //tjs a la fin de process de register
    skills: {
      type: Sequelize.STRING,
    },
  });
  return Agent;
};
