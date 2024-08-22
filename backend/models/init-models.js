var DataTypes = require("sequelize").DataTypes;
var _Album = require("./Album");
var _Artist = require("./Artist");
var _Gender = require("./Gender");
var _Song = require("./Song");
var _Song_Album = require("./Song_Album");
var _Song_Artist = require("./Song_Artist");
var _Song_Gender = require("./Song_Gender");
var _User = require("./User");

function initModels(sequelize) {
  var Album = _Album(sequelize, DataTypes);
  var Artist = _Artist(sequelize, DataTypes);
  var Gender = _Gender(sequelize, DataTypes);
  var Song = _Song(sequelize, DataTypes);
  var Song_Album = _Song_Album(sequelize, DataTypes);
  var Song_Artist = _Song_Artist(sequelize, DataTypes);
  var Song_Gender = _Song_Gender(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Song.belongsTo(Album, { as: "album", foreignKey: "album_id"});
  Album.hasMany(Song, { as: "songs", foreignKey: "album_id"});
  Song_Album.belongsTo(Album, { as: "album", foreignKey: "album_id"});
  Album.hasMany(Song_Album, { as: "Song_Albums", foreignKey: "album_id"});
  Album.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
  Artist.hasMany(Album, { as: "Albums", foreignKey: "artist_id"});
  Song.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
  Artist.hasMany(Song, { as: "Songs", foreignKey: "artist_id"});
  Song_Artist.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
  Artist.hasMany(Song_Artist, { as: "Song_Artists", foreignKey: "artist_id"});
  Song.belongsTo(Gender, { as: "gender", foreignKey: "gender_id"});
  Gender.hasMany(Song, { as: "Songs", foreignKey: "gender_id"});
  Song_Gender.belongsTo(Gender, { as: "genre", foreignKey: "genre_id"});
  Gender.hasMany(Song_Gender, { as: "Song_Genders", foreignKey: "genre_id"});
  Song_Album.belongsTo(Song, { as: "song", foreignKey: "song_id"});
  Song.hasMany(Song_Album, { as: "Song_Albums", foreignKey: "song_id"});
  Song_Artist.belongsTo(Song, { as: "song", foreignKey: "song_id"});
  Song.hasMany(Song_Artist, { as: "Song_Artists", foreignKey: "song_id"});
  Song_Gender.belongsTo(Song, { as: "song", foreignKey: "song_id"});
  Song.hasMany(Song_Gender, { as: "Song_Genders", foreignKey: "song_id"});

  return {
    Album,
    Artist,
    Gender,
    Song,
    Song_Album,
    Song_Artist,
    Song_Gender,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
