module.exports = (sequelize, Sequelize) => {
    const UserLikes = sequelize.define("userLikes", {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        articleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      });
    
      return UserLikes;
  };