const Router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth/auth.middleware');
const UploadImage = require('../common/image-uploader');
const ReimbursementControllers = require('../controllers/reimbursement.controllers');

Router.route('/').post(AuthMiddleware, UploadImage.single('receipt'), ReimbursementControllers.generateClaim);
Router.route('/').get(AuthMiddleware, ReimbursementControllers.accessAllClaims);
Router.route('/pending').get(AuthMiddleware, ReimbursementControllers.accessPendingClaims);
Router.route('/approved').get(AuthMiddleware, ReimbursementControllers.accessApprovedClaims);
Router.route('/declined').get(AuthMiddleware, ReimbursementControllers.accessDeclinedClaims);
Router.route('/:reimbursementId').get(AuthMiddleware, ReimbursementControllers.accessClaim);
Router.route('/user').get(AuthMiddleware, ReimbursementControllers.accessUserClaims);
Router.route('/approve/:reimbursementId').patch(AuthMiddleware, ReimbursementControllers.approveClaim);
Router.route('/decline/:reimbursementId').patch(AuthMiddleware, ReimbursementControllers.declineClaim);
Router.route('/edit/:reimbursementId').patch(AuthMiddleware, UploadImage.single('receipt'), ReimbursementControllers.editClaim);
Router.route('/delete/:reimbursementId').delete(AuthMiddleware, ReimbursementControllers.deleteClaim);

module.exports = Router;