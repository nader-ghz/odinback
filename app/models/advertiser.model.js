module.exports = (sequelize, Sequelize) => {
  const Advertiser = sequelize.define('advertiser', {
    entreprise: {
      type: Sequelize.STRING,
    },
    advertisingCampaigns: {
      type: Sequelize.STRING,
    },
    targetAudience: {
      type: Sequelize.STRING,
    },
    budget: {
      type: Sequelize.STRING,
    },
  })
  return Advertiser
}
