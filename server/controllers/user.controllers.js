const BcryptJS = require('bcryptjs');
const JWT = require('jsonwebtoken');

const UserServices = require('../services/user.services');
const CreateError = require('http-errors');
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
            if (validationResponse.error) return next(CreateError.Conflict(validationResponse.error.details));
            if (await UserServices.getUserByEmailAsync(req.body.email)) return next(CreateError.BadRequest('User Already Exists!'));

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
            return next(CreateError.InternalServerError);
        }
    };

    static login = async (req, res, next) => {
        try {
            let user = await UserServices.getUserByEmailAsync(req.body.email);

            if (!user) return next(CreateError.NotFound('User Does Not Exist!'));
            if (!BcryptJS.compareSync(req.body.password, user.passwordHash)) return next(CreateError.Unauthorized('Invalid Credentials!'));

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
            return next(CreateError.InternalServerError);
        }
    };
};