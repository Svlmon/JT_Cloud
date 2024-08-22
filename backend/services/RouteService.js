const userRoutes = require('./../routes/app-user');
const genderRoutes = require('../routes/app-gender');
const artistRoutes = require('./../routes/app-artist');
const albumRoutes = require('./../routes/app-album');

class RouteService{

    constructor(app) {
        this.app = app;
    }

    init_routes(){
        this.app.use('/users', userRoutes);
        this.app.use('/genders', genderRoutes);
        this.app.use('/artists', artistRoutes);
        this.app.use('/albums', albumRoutes);
    }
}

module.exports = RouteService;