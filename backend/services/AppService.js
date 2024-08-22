const express = require('express');
const RouteService = require("./RouteService");

class AppService{

    constructor(app, sequelize, PORT) {
        this.app = app;
        this.sequelize = sequelize;
        this.PORT = PORT;
        this.routeService = new RouteService(app);
    }

    init_app(){
        this.setup_express();
        this.start_listening();
        this.routeService.init_routes();
    }

    setup_express(){
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.app.use(express.json())
    }

    start_listening(){
        this.app.listen(this.PORT, () => {
            console.debug('Express server listening on port ' + this.PORT);
        });

        this.app.on('error', this.on_error);
        this.app.on('listening', this.on_listening);
    }

    on_error(){
        console.log("Error");
    }

    on_listening(){
        console.log("Listening");
    }
}

module.exports = AppService;