const UserRepository = require('../repository/user.repository');

module.exports = class UserServices {
    static createUserAsync = async (creationData) => {
        try {
            const newUser = await UserRepository.createUser({
                fullName: creationData.fullName,
                email: creationData.email,
                PAN: creationData.PAN,
                bankName: creationData.bankName,
                bankAccountNumber: creationData.bankAccountNumber,
                isAdmin: creationData.isAdmin,
                role: creationData.role,
                isApprover: creationData.isApprover,
                passwordHash: creationData.passwordHash
            });
            return newUser;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllUsersAsync = async () => {
        try {
            const users = await UserRepository.getAllUsers();
            return users;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllApproversAsync = async () => {
        try {
            const users = await UserRepository.getAllApprovers();
            return users;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllAdminsAsync = async () => {
        try {
            const users = await UserRepository.getAllAdmins();
            return users;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getUserByIdAsync = async (userId) => {
        try {
            const user = await UserRepository.getUserById(userId);
            return user;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getUserByEmailAsync = async (userEmail) => {
        try {
            const user = await UserRepository.getUserByEmail(userEmail);
            return user;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static makeUserAdminAsync = async (userId) => {
        try {
            const user = await UserRepository.makeUserAdmin(userId);

            if (user) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static removeUserAsAdminAsync = async (userId) => {
        try {
            const user = await UserRepository.removeUserAsAdmin(userId);

            if (user) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static makeUserApproverAsync = async (userId) => {
        try {
            const user = await UserRepository.makeUserApprover(userId);

            if (user) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static removeUserAsApproverAsync = async (userId) => {
        try {
            const user = await UserRepository.removeUserAsApprover(userId);

            if (user) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };
};