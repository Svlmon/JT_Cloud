const {initModels} = require("../models/init-models");
const {sequelize} = require("../models");
const {Artist, Song, Gender} = initModels(sequelize);

class ModelService{

    constructor() {}

    get_album_model(include_artist_songs = false){
        var include_tab = [
            {
                model: Gender,
                as: 'gender'
            }
        ]
        if (include_artist_songs){
            include_tab.push({
                model: Artist,
                as: 'artist'
            })
        }
        return {
            attributes: {
                exclude: ['artist_id']
            },
            include: [
                {
                    model: Song,
                    as: 'songs',
                    attributes: {
                        exclude: ['gender_id', 'album_id', 'artist_id']
                    },
                    include: include_tab
                },
                {
                    model: Artist,
                    as: 'artist'
                },
            ]
        }
    }

    get_artist_with_songs(){
        return {
            include: [
                {
                    model: Song,
                    as: 'Songs',
                    attributes: {
                        exclude: ['artist_id']
                    }
                }
            ]
        }
    }
}

module.exports = ModelService