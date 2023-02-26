const ReimbursementRepository = require('../repository/reimbursement.repository');

module.exports = class ReimbursementServices {
    static createReimbursementAsync = async (creationData) => {
        try {
            const response = await ReimbursementRepository.createReimbursement({
                date: creationData.date,
                reimbursementType: creationData.reimbursementType,
                requestedValue: creationData.requestedValue,
                requestedBy: creationData.requestedBy,
                currency: creationData.currency,
                receiptAttached: creationData.receiptAttached,
                receiptName: creationData.receiptName,
                mimeType: creationData.mimeType,
                size: creationData.size,
                userId: creationData.userId
            });
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllReimbursementsAsync = async () => {
        try {
            const response = await ReimbursementRepository.getAllReimbusements();
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllPendingReimbursementsAsync = async () => {
        try {
            const response = await ReimbursementRepository.getAllPendingReimbursements();
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllApprovedReimbursementsAsync = async () => {
        try {
            const response = await ReimbursementRepository.getAllApprovedReimbursements();
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getAllDeclinedReimbursementsAsync = async () => {
        try {
            const response = await ReimbursementRepository.getAllDeclinedReimbursements();
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getReimbursementByIdAsync = async (reimbursementId) => {
        try {
            const response = await ReimbursementRepository.getReimbursementById(reimbursementId);
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static getReimbursementsByUserAsync = async (userId) => {
        try {
            const response = await ReimbursementRepository.getReimbursementsByUser(userId);
            return response;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static approveReimbursementAsync = async (reimbursementId, approvedValue, internalNotes, approvedBy) => {
        try {
            const response = await ReimbursementRepository.approveReimbursement(reimbursementId, approvedValue, internalNotes, approvedBy);
            if (response) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static declineReimbursementAsync = async(reimbursementId, internalNotes) => {
        try {
            const response = await ReimbursementRepository.declineReimbursement(reimbursementId, internalNotes);
            if (response) return true;
            else false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }    
    };

    static editReimbursementAsync = async (reimbursementId, modifiedData) => {
        try {
            const response = await ReimbursementRepository.editReimbursement(reimbursementId, {
                date: modifiedData.date,
                reimbursementType: modifiedData.reimbursementType,
                requestedValue: modifiedData.reimbursementType,
                requestedBy: modifiedData.requestedBy,
                currency: modifiedData.currency,
                receiptAttached: modifiedData.receiptAttached,
                receiptAttached: modifiedData.receiptAttached,
                receiptName: modifiedData.receiptName,
                mimeType: modifiedData.mimeType,
                size: modifiedData.size,
                userId: modifiedData.userId,
                hasReceipt: modifiedData.hasReceipt
            });
            if (response) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };

    static deleteReimbursementAsync = async (reimbursementId) => {
        try {
            const response = await ReimbursementRepository.deleteReimbursement(reimbursementId);
            if (response) return true;
            return false;
        }
        catch (err) {
            console.error('Service Error: ' + err);
        }
    };
};