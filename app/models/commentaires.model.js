module.exports = (sequelize, Sequelize) => {
  const Commentaires = sequelize.define("commentaires", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.STRING,
    },
    articleId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  Commentaires.associate = (models) => {
    Commentaires.hasMany(models.Reply, {
      foreignKey: 'commentaireId',
      onDelete: 'CASCADE',
    });
  };

  return Commentaires;
};
