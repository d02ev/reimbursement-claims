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

    static accessAllClaims = async (req, res, next) => {
        try {
            if (req.user.role === 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.getAllReimbursementsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessPendingClaims = async (req, res, next) => {
        try {
            if (req.user.role === 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.getAllPendingReimbursementsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessApprovedClaims = async (req, res, next) => {
        try {
            if (req.user.role === 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.getAllApprovedReimbursementsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessDeclinedClaims = async (req, res, next) => {
        try {
            if (req.user.role === 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.getAllDeclinedReimbursementsAsync();
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessClaim = async (req, res, next) => {
        try {
            let reimbursement = await ReimbursementServices.getReimbursementByIdAsync(req.params.reimbursementId);
            let userId = reimbursement.userId;

            if (req.user.id !== userId) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.getReimbursementByIdAsync(req.params.reimbursementId);
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static accessUserClaims = async (req, res, next) => {
        try {
            const response = await ReimbursementServices.getReimbursementsByUserAsync(req.user.id);
            return res.status(200).json(response);
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static approveClaim = async (req, res, next) => {
        try {
            if (req.user.role === 0 || req.user.isApprover) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const approvingData = {
                approvedValue: req.body.approvedValue,
                internalNotes: req.body.internalNotes,
                approvedBy: req.body.approvedBy
            };
            const response = await ReimbursementServices.approveReimbursementAsync(req.params.reimbursementId, approvingData);
            if (response) {
                return res.status(204).json({
                    status: 204,
                    message: 'Claim Approved!'
                });
            }
            else return next(HttpError.ExpectationFailed("Claim Cannot Be Approved Due To An Unknown Error!"));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static declineClaim = async (req, res, next) => {
        try {
            if (req.user.role === 0 || req.user.isApprover) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.declineReimbursementAsync(req.params.reimbursementId, req.body.internalNotes);
            if (response) {
                return res.status(204).json({
                    status: 204,
                    message: 'Claim Declined!'
                });
            }
            else return next(HttpError.ExpectationFailed("Claim Cannot Be Approved Due To An Unknown Error!"));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static editClaim = async (req, res, next) => {
        try {
            if (req.user.role !== 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));
            
            let reimbursement = await ReimbursementServices.getReimbursementByIdAsync(req.params.reimbursementId);
            let userId = reimbursement.userId;

            if (req.user.id !== userId) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            let currency;
            if (req.body.currency === 'INR') currency = 0;
            else if (req.body.currency === 'USD') currency = 1;
            else currency = 2;

            await ReimbursementServices.editReimbursementAsync(req.params.reimbursementId, {
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
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };

    static deleteClaim = async (req, res, next) => {
        try {
            if (req.user.role !== 0) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            let reimbursement = await ReimbursementServices.getReimbursementByIdAsync(req.params.reimbursementId);
            let userId = reimbursement.userId;

            if (req.user.id !== userId) return next(HttpError.Forbidden("You Don't Have Rights To Access The Resources!"));

            const response = await ReimbursementServices.deleteReimbursementAsync(req.params.reimbursementId);
            if (response) {
                return res.status(204).json({
                    status: 204,
                    message: 'Claim Deleted!'
                });
            }
            else return next(HttpError.ExpectationFailed("Claim Cannot Be Deleted Due To An Unknown Error!"));
        }
        catch (err) {
            return next(HttpError.InternalServerError);
        }
    };
};