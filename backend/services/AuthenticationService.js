const jwt = require("jsonwebtoken");
const secret_key = "secret_key";
const bcrypt = require('bcryptjs');
const {sequelize} = require("./../models");
const {initModels} = require("../models/init-models");

const { User } = initModels(sequelize);

class AuthenticationService {

    constructor() {
    }

    generate_token(data) {
        return jwt.sign(data, secret_key)
    }

    async authenticate_token(req, res, next) {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({error: "Unauthorized"});
        if (!token.startsWith('Bearer')) return res.status(401).json({error: "Wrong method: use bearer"});
        const is_authorize = this.verify_token(token);
        if (!is_authorize) return res.status(403).json({error: "Forbidden"});
        req.user = await User.findByPk(is_authorize.user_id);
        next();
    }

    verify_token(token) {
        try {
            return jwt.verify(token.split(" ")[1], secret_key);
        } catch (error) {
            return null;
        }
    }

    async generate_hashed_password(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async compare_password(password, form_password) {
        return await bcrypt.compare(password, form_password)
    }
}

module.exports = AuthenticationService