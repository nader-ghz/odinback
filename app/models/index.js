const config = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize




//album
db.album = require('./album.model.js')(sequelize, Sequelize);
db.imageAlbum = require('./albumImages.model.js')(sequelize, Sequelize);
//Event
db.event = require('./event.model.js')(sequelize,Sequelize);
db.imageEvent = require('./imageEvent.model.js')(sequelize, Sequelize);
//admin
// db.admin = require('./admin.model.js')(sequelize, Sequelize);

//event application
db.eventApplication = require('./EventApplication.model.js')(sequelize, Sequelize);


db.user = require('./user.model.js')(sequelize, Sequelize);
db.player = require('./player.model.js')(sequelize, Sequelize);
db.coach = require('./coach.model.js')(sequelize, Sequelize);
db.agent = require('./agent.model.js')(sequelize, Sequelize);
db.scout = require('./scout.model.js')(sequelize, Sequelize);
db.advertiser = require('./advertiser.model.js')(sequelize, Sequelize);
db.other = require('./other.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.commentaires = require('./commentaires.model.js')(sequelize, Sequelize);
db.article = require('./article.model.js')(sequelize, Sequelize);
db.refreshToken = require('./refreshToken.model.js')(sequelize, Sequelize);
db.reply = require('./reply.model.js')(sequelize, Sequelize);
db.friend_requests = require('./friendRequest.model.js')(sequelize, Sequelize);
db.userLikes = require('./userLikes.model.js')(sequelize, Sequelize);

const Reply = require('./reply.model.js')(sequelize, Sequelize);
db.Reply = Reply;


//admin relation
// db.user.hasOne(Admin);
// db.admin.belongsTo(User);
//album relation
db.album.hasMany(db.imageAlbum , {
  foreignKey : 'album_id',
});
//event relation
db.event.hasMany(db.imageEvent , {
  foreignKey : 'event_id',
});
db.user.hasMany(db.imageEvent , {
  foreignKey : 'event_id',
});
//application relation
db.eventApplication.belongsTo(db.user , {
  foreignKey : 'user_id',
})
// Define associations after all models are loaded
db.Commentaires = require('./commentaires.model.js')(sequelize, Sequelize);
db.Article = require('./article.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
})
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})

// db.article.belongsToMany(db.user, {
//   through: 'commentaires',
//   foreignKey: 'articleId',
//   otherKey: 'userId',
// })
// db.user.belongsToMany(db.article, {
//   through: 'commentaires',
//   foreignKey: 'userId',
//   otherKey: 'articleId',
// })





db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
});
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
});

/// Define associations
db.Commentaires.hasMany(Reply, {
  foreignKey: 'commentaireId',
  onDelete: 'CASCADE',
});

Reply.belongsTo(db.Commentaires, {
  foreignKey: 'commentaireId',
});
Reply.belongsTo(db.user, {
  foreignKey: 'userId',
});


db.user.belongsToMany(db.user, {
  through: 'friend_requests',
  as: 'sender',
  foreignKey: 'senderId',
  otherKey: 'receiverId',
});

db.user.belongsToMany(db.user, {
  through: 'friend_requests',
  as: 'receiver',
  foreignKey: 'receiverId',
  otherKey: 'senderId',
});

db.user.belongsToMany(db.article, {
  through: 'UserLikes',
  as: 'likedArticles',
  foreignKey: 'userId',
});

db.article.belongsToMany(db.user, {
  through: 'UserLikes',
  as: 'likedBy',
  foreignKey: 'articleId',
});




db.Reply = db.reply;

db.Commentaires = db.commentaires;
db.Article = db.article;



//heritage
db.user.hasMany(db.player, {
  as: 'player_user',
  foreignKey: 'iduser',
})
db.player.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.coach, {
  as: 'coach_user',
  foreignKey: 'iduser',
})
db.coach.belongsTo(db.user, { foreignKey: 'iduser' })



db.user.hasMany(db.agent, {
  as: 'agent_user',
  foreignKey: 'iduser',
})
db.agent.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.scout, {
  as: 'scout_user',
  foreignKey: 'iduser',
})
db.scout.belongsTo(db.user, { foreignKey: 'iduser' })



db.user.hasMany(db.advertiser, {
  as: 'advertiser_user',
  foreignKey: 'iduser',
})
db.advertiser.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.other, {
  as: 'other_user',
  foreignKey: 'iduser',
})
db.other.belongsTo(db.user, { foreignKey: 'iduser' })

db.ROLES = [
  'user',
  'admin',
  'player',
  'coach',
  'agent',
  'scout',
  'advertiser',
  'other',
]
module.exports = db
