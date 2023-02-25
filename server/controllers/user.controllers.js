const BcryptJS = require('bcryptjs');
const JWT = require('jsonwebtoken');

const UserServices = require('../services/user.services');
const HttpError = require('http-errors');
const ValidateUser = require('../common/user.validator');

module.exports = class UserControllers {
    static register = async (req, res, next) => {
        try {
            const validationResponse = ValidateUser({
                fullName: req.body.fullName,
                email: req.body.email,
                PAN: req.body.PAN,
                bankName: req.body.bankName,
                bankAccountNumber: req.body.bankAccountNumber,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });
            if (validationResponse.error) return next(HttpError.Conflict(validationResponse.error.details));
            if (await UserServices.getUserByEmailAsync(req.body.email)) return next(HttpError.BadRequest('User Already Exists!'));

            let passwordSalt = BcryptJS.genSaltSync(10);
            let passwordHash = BcryptJS.hashSync(req.body.password, passwordSalt);
            let isAdmin, role, isApprover;

            if (req.body.email === 'super.admin@example.com') {
                isAdmin = true;
                role = -1;
                isApprover = true;
            }

            const newUser = await UserServices.createUserAsync({
                fullName: req.body.fullName,
                email: req.body.email,
                PAN: req.body.PAN,
                bankName: req.body.bankName,
                bankAccountNumber: req.body.bankAccountNumber,
                isAdmin: isAdmin,
                role: role,
                isApprover: isApprover,
                passwordHash: passwordHash
            });

            return res.status(201).json({
                status: 201,
                message: 'User Created Successfully!'
            });
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static login = async (req, res, next) => {
        try {
            let user = await UserServices.getUserByEmailAsync(req.body.email);

            if (!user) return next(HttpError.NotFound('User Does Not Exist!'));
            if (!BcryptJS.compareSync(req.body.password, user.passwordHash)) return next(HttpError.Unauthorized('Invalid Credentials!'));

            let userId = user.id;
            let userRole = user.role;
            let isUserApprover = user.isApprover;
            let jwtToken = JWT.sign({
                id: userId,
                role: userRole,
                email: req.body.email,
                approver: isUserApprover
            }, process.env.SECRET_KEY);

            return res.status(200).json({ jwtToken: jwtToken });
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessAllUsers = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let users = await UserServices.getAllUsersAsync();
            return res.status(200).json(users);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessUser = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let user = await UserServices.getUserByIdAsync(req.params.userId);
            return res.status(200).json(user);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static grantAdminPrivilege = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let isGranted = await UserServices.makeUserAdminAsync(req.params.userId);
            if (isGranted) {
                return res.status(200).json({
                    status: 200,
                    message: 'User Granted Admin Privileges!'
                });
            }
            else return next(HttpError.ExpectationFailed('Cannot Grant User Admin Privileges Due To An Unknown Error!'));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static revokeAdminPrivilege = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let isRevoked = await UserServices.removeUserAsAdminAsync(req.params.userId);
            if (isRevoked) {
                return res.status(200).json({
                    status: 200,
                    message: "User's Admin Privileges Revoked!"
                });
            }
            else return next(HttpError.ExpectationFailed("Cannot Revoke User's Admin Privileges Due To An Unknown Error!"))
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        } 
    };

    static makeUserApprover = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let isMade = await UserServices.makeUserApproverAsync(req.params.userId);
            if (isMade) {
                return res.status(200).json({
                    status: 200,
                    message: 'User Is Now An Approver!'
                });
            }
            else return next(HttpError.ExpectationFailed('User Cannot Be Made An Approver Due To An Unknown Error!'));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static removeUserAsApprover = async (req, res, next) => {
        try {
            if (req.user.role !== -1) return next(HttpError.Unauthorized('You Are Not Authorized For The Action!'));

            let isRemoved = await UserServices.removeUserAsApproverAsync(req.params.userId);
            if (isRemoved) {
                return res.status(200).json({
                    status: 200,
                    message: 'User Is No Longer An Approver!'
                });
            }
            else return next(HttpError.ExpectationFailed("Can Change User's Approver Status Due To An Unknown Error!"));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };
};