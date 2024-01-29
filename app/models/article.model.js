
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    video: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    userId: {  // Add this foreign key
      type: Sequelize.INTEGER,
      references: {
        model: 'users',  // Assuming 'users' is the name of your 'user' table
        key: 'id',
      },
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0, // Initial value of likes is 0
    },

    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0, // Initial value of likes is 0
    },
  });

  Article.associate = (models) => {
    Article.belongsToMany(models.User, {
      through: 'UserLikes',
      as: 'likedBy',
      foreignKey: 'articleId',
    });
  

  }
 
  return Article;
};
