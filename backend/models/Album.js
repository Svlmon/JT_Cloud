const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Album',
    timestamps: false
  });
};
