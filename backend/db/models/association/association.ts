const { Type_DB } = require('../')

module.exports = (domain: typeof Type_DB) => {
  // ------ User - UserMeta -----------------
  domain.User.hasOne(domain.UserMeta, {
    foreignKey: 'userId'
  });
  domain.UserMeta.belongsTo(domain.User, {
    foreignKey: 'userId'
  })

  // ------ Project - User -----------------
  domain.Project.belongsTo(domain.User, {
    foreignKey: 'userId'
  })
  domain.User.hasMany(domain.User, {
    foreignKey: 'userId'
  })
}