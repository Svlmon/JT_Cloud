const express = require('express');
const router = express.Router();
const { initModels } = require('../models/init-models');
const {sequelize} = require("./../models");

const { Gender } = initModels(sequelize);

router.get('/', async (req, res) => {
    try {
        const genders = await Gender.findAll();
        res.status(201).json(genders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    const gender_id = req.params.id;
    try {
        const gender = await Gender.findByPk(gender_id);
        if (!gender){
            res.status(409).json({ error: 'Unknow genre id: ' + gender_id });
            return;
        }
        await gender.update(req.body);
        res.status(201).json(gender);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;