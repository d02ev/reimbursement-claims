const ReimbursementServices = require('../services/reimbursement.services');
const HttpError = require('http-errors');

module.exports = class ReimbursementControllers {
    static generateClaim = async (req, res, next) => {
        try {
            if (req.user.role !== 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            let currency;
            if (req.body.currency === 'INR') currency = 0
            else if (req.body.currency === 'USD') currency = 1
            else currency = 2

            const response = await ReimbursementServices.createReimbursementAsync({
                date: req.body.date,
                reimbursementType: req.body.reimbursementType,
                requestedValue: req.body.requestedValue,
                requestedBy: req.user.email,
                currency: currency,
                receiptAttached: req.file.path,
                receiptName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                userId: req.user.id
            });

            return res.status(201).json({
                status: 201,
                message: 'Claim Created and Submitted Successfully!'
            });
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };
};