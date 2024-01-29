module.exports = (sequelize, Sequelize) => {
    const FriendRequest = sequelize.define('friend_requests', {
      senderId: {
        type: Sequelize.INTEGER,
      },
      receiverId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING, // 'pending', 'accepted', 'rejected', etc.
      },
    });
  
    return FriendRequest;
  };