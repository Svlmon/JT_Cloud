const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Song_Gender', {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Song',
        key: 'id'
      },
      unique: true
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Gender',
        key: 'id'
      },
      unique: true
    }
  }, {
    sequelize,
    tableName: 'Song_Gender',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_Song_Gender_1",
        unique: true,
        fields: [
          { name: "song_id" },
          { name: "genre_id" },
        ]
      },
    ]
  });
};
