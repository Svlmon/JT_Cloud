const express = require('express');
const router = express.Router();
const {initModels} = require('../models/init-models');
const {sequelize} = require("./../models");
const ModelService = require('./../services/ModelService');
const AuthenticationService = require('../services/AuthenticationService');

const {Album, Artist, Song, Gender} = initModels(sequelize);
const modelService = new ModelService();
const authenticationService = new AuthenticationService();

router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll({
            attributes: {
                exclude: ['artist_id']
            },
            include: {
                model: Artist,
                as: 'artist'
            }
        });
        res.status(201).json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id, {
            include: [
                {
                    model: Artist,
                    as: 'artist',
                    include: [
                        {
                            model: Song,
                            as: 'Songs',
                            include: [
                                {
                                    model: Gender,
                                    as: 'gender'
                                }
                            ],
                            attributes: {
                                exclude: ['artist_id', 'gender_id']
                            }
                        }
                    ]
                }
            ],
            attributes: {
                exclude: ['artist_id']
            }
        });
        if (!album) {
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id/songs', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id, modelService.get_album_model(true));
        if (!album) {
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        res.status(201).json(album.songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, cover_image, release_date, artist_id } = req.body;
        if (!title){
            res.status(400).json({ error: 'Title required' });
            return;
        }
        if (!cover_image){
            res.status(400).json({ error: 'Cover image required' });
            return;
        }
        if (!release_date){
            res.status(400).json({ error: 'Release date required' });
            return;
        }
        if (!artist_id){
            res.status(400).json({ error: 'Artist id required' });
            return;
        }
        const artist = await Artist.findByPk(artist_id);
        if (!artist){
            res.status(409).json({error: 'Unknow artist id: ' + artist_id});
            return;
        }
        const album = await Album.create({
            title,
            cover_image,
            release_date,
            artist_id
        });
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id/songs', async (req, res) => {
    const album_id = req.params.id;
    const { title, duration, artist_id, gender_id} = req.body;
    try {
        if (!title){
            res.status(400).json({ error: 'Title required' });
            return;
        }
        if (!duration){
            res.status(400).json({ error: 'Duration (s) required' });
            return;
        }
        if (!artist_id){
            res.status(400).json({ error: 'Artist id required' });
            return;
        }
        if (!gender_id){
            res.status(400).json({ error: 'Gender id required' });
            return;
        }
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        const artist = await Artist.findByPk(artist_id);
        if (!artist){
            res.status(409).json({error: 'Unknow artist id: ' + artist_id});
            return;
        }
        const gender = await Gender.findByPk(gender_id);
        if (!gender){
            res.status(409).json({error: 'Unknow gender id: ' + gender_id});
            return;
        }
        const newSong = await Song.create({
            title,
            duration,
            artist_id,
            gender_id,
            album_id
        });
        res.status(201).json(newSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        await album.update(req.body);
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticationService.authenticate_token.bind(authenticationService), async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        await Song.destroy({
            where: {
                album_id: album_id
            }
        });
        await album.destroy();
        res.status(200).json({message: "Album id: " + album_id + " deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;