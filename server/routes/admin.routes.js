const Router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth/auth.middleware');
const UserControllers = require('../controllers/user.controllers');

Router.route('/').get(AuthMiddleware, UserControllers.accessAllUsers);
Router.route('/:userId').get(AuthMiddleware, UserControllers.accessUser);
Router.route('/grant/:userId').patch(AuthMiddleware, UserControllers.grantAdminPrivilege);
Router.route('/revoke/:userId').patch(AuthMiddleware, UserControllers.revokeAdminPrivilege);
Router.route('/approver/:userId').patch(AuthMiddleware, UserControllers.makeUserApprover);
Router.route('/approver/revoke/:userId').patch(AuthMiddleware, UserControllers.removeUserAsApprover);

module.exports = Router;