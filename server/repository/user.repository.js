const Model = require('../database/models');

module.exports = class UserRepository {
    static createUser = async (creationData) => {
        try {
            const newUserData = {
                fullName: creationData.fullName,
                email: creationData.email,
                PAN: creationData.PAN,
                bankName: creationData.bankName,
                bankAccountNumber: creationData.bankAccountNumber,
                isAdmin: creationData.isAdmin,
                role: creationData.role,
                isApprover: creationData.isApprover,
                passwordHash: creationData.passwordHash
            };
            const newUser = await Model.Users.create(newUserData);

            return newUser;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllUsers = async () => {
        try {
            const users = await Model.Users.findAll();
            return users;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getUserById = async (userId) => {
        try {
            const user = await Model.Users.findOne({ where: { id: userId } });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getUserByEmail = async (userEmail) => {
        try {
            const user = await Model.Users.findOne({ where: { email: userEmail } });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static makeUserAdmin = async (userId) => {
        try {
            const user = await Model.Users.update({ isAdmin: true }, {
                where: { id: userId },
                returning: true,
                plain: true
            });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static makeUserApprover = async (userId) => {
        try {
            const user = await Model.Users.update({ isApprover: true }, {
                where: { id: userId },
                returning: true,
                plain: true
            });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static removeUserAsAdmin = async (userId) => {
        try {
            const user = await Model.Users.update({ isAdmin: false }, {
                where: { id: userId },
                returning: true,
                plain: true
            });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static removeUserAsApprover = async (userId) => {
        try {
            const user = await Model.Users.update({ isApprover: false }, {
                where: { id: userId },
                returning: true,
                plain: true
            });
            return user;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };
};