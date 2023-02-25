const Router = require('express').Router();
const UserControllers = require('../controllers/user.controllers');

Router.route('/register').post(UserControllers.register);
Router.route('/login').post(UserControllers.login);

module.exports = Router;