const Model = require('../database/models');

module.exports = class ReimbursementRepository {
    static createReimbursement = async (creationData) => {
        try {
            const newReimbursementData = {
                date: creationData.date,
                reimbursementType: creationData.reimbursementType,
                requestedValue: creationData.requestedValue,
                requestedBy: creationData.requestedBy,
                currency: creationData.currency,
                receiptAttached: creationData.receiptAttached,
                receiptName: creationData.receiptName,
                mimeType: creationData.mimeType,
                size: creationData.size,
                userId: creationData.userId,
            };
            const response = await Model.Reimbursements.create(newReimbursementData);

            return response;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllReimbusements = async () => {
        try {
            const reimbursements = await Model.Reimbursements.findAll({
                include: [{
                    model: Model.Users,
                    as: 'requestedBy'
                }]
            });
            return reimbursements;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllPendingReimbursements = async () => {
        try {
            const pendingReimbursements = await Model.Reimbursements.findAll({
                where: { requestPhase: 'In Process' },
                include: [{
                    model: Model.Users,
                    as: 'requestedBy'
                }]
            });
            return pendingReimbursements;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllApprovedReimbursements = async () => {
        try {
            const approvedReimbursements = await Model.Reimbursements.findAll({
                where: { isApproved: true },
                include: [{
                    model: Model.Users,
                    as: 'requestedBy'
                }]
            });
            return approvedReimbursements;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getAllDeclinedReimbursements = async () => {
        try {
            const declinedReimbursements = await Model.Reimbursements.findAll({
                where: { isApproved: false },
                include: [{
                    model: Model.Users,
                    as: 'requestedBy'
                }]
            });
            return declinedReimbursements;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getReimbursementById = async (reimbursementId) => {
        try {
            const reimbursement = await Model.Reimbursements.findOne({ where: { id: reimbursementId }});
            return reimbursement;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static getReimbursementsByUser = async (userId) => {
        try {
            const reimbursement = await Model.Reimbursements.findAll({ where: { userId: userId }});
            return reimbursement;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static approveReimbursement = async (reimbursementId, approvedValue, internalNotes, approvedBy) => {
        try {
            const reimbursement = await Model.Reimbursements.update({
                requestPhase: 'Approved',
                isApproved: true,
                approvedValue: approvedValue,
                internalNotes: internalNotes,
                approvedBy: approvedBy
            }, {
                where: { id: reimbursementId },
                returning: true,
                plain: true
            });
            return reimbursement;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static declineReimbursement = async (reimbursementId, internalNotes) => {
        try {
            const reimbursement = await Model.Reimbursements.update({
                requestPhase: 'Declined',
                isApproved: false,
                internalNotes: internalNotes
            }, {
                where: { id: reimbursementId },
                returning: true,
                plain: true
            });
            return reimbursement;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static editReimbursement = async (reimbursementId, modifiedData) => {
        try {
            const updatedData = {
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
                hasReceipt: modifiedData.hasReceipt,
            };
            const response = await Model.Reimbursements.update(updatedData, {
                where: { id: reimbursementId },
                returning: true,
                plain: true
            });

            return response;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };

    static deleteReimbursement = async (reimbursementId) => {
        try {
            const reimbursementResponse = await Model.Reimbursements.destroy({ where: { id: reimbursementId } });
            return reimbursementResponse;
        }
        catch (err) {
            console.error('DB Error: ' + err);
        }
    };
};