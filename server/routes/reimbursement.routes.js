const Router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth/auth.middleware');
const UploadImage = require('../common/image-uploader');
const ReimbursementControllers = require('../controllers/reimbursement.controllers');

Router.route('/').post(AuthMiddleware, UploadImage.single('receipt'), ReimbursementControllers.generateClaim);

module.exports = Router;