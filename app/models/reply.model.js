module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define("reply", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageuser: {
        type: Sequelize.STRING,
      },
      nom: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      commentaireId: {
        type: Sequelize.INTEGER,
      },
    });
  
    Reply.associate = (models) => {
        Reply.belongsTo(models.Commentaires, {
          foreignKey: 'commentaireId',
        });
        Reply.belongsTo(models.user, {  // Assuming your user model is named 'user'
          foreignKey: 'userId',
        });
      };
  
    return Reply;
  };
  