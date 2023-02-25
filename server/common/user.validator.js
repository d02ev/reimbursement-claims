const JOI = require('joi');

const validateUserRequest = (userData) => {
    const joiSchema = JOI.object({
        fullName: JOI.string().min(5).max(255).required(),
        email: JOI.string().email().required(),
        PAN: JOI.string().alphanum().regex(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/).length(10).required(),
        bankName: JOI.string().required(),
        bankAccountNumber: JOI.string().regex(/([0-9]{12})$/).length(12).required(),
        password: JOI.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required(),
        confirmPassword: JOI.ref('password')
    }).options({ abortEarly: false });

    return joiSchema.validate(userData);
};

module.exports = validateUserRequest;