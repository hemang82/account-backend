const { API_CODE, VALIDATION_RULES } = require("../../../../config/constant");

const headerAuthentication = require("../../../../middlerware/headerAuthentication");
const salesModels = require("../models/partyModels");

exports.addParty = async (req, res) => {

    const request = req.body;

    const validationRules = {
        name: VALIDATION_RULES?.REQUIRED,
        phone_number: VALIDATION_RULES?.PHONE,
        email: VALIDATION_RULES?.NOT_REQUIRED,
        gst_number: VALIDATION_RULES?.NOT_REQUIRED,
        address: VALIDATION_RULES?.NOT_REQUIRED,
        pan_number: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.addPartiesyModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.editParty = async (req, res) => {

    const request = req.body;

    const validationRules = {
        party_id: VALIDATION_RULES?.ID,
        name: VALIDATION_RULES?.NOT_REQUIRED,
        phone_number: VALIDATION_RULES?.NULLABLE_MOBILE,
        email: VALIDATION_RULES?.NULLABLE_EMAIL,
        gst_number: VALIDATION_RULES?.NOT_REQUIRED,
        address: VALIDATION_RULES?.NOT_REQUIRED,
        pan_number: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.editPartyModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.detailsParty = async (req, res) => {

    const request = req.body;

    const validationRules = {
        party_id: VALIDATION_RULES?.ID,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.detailsPartyModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.listParty = async (req, res) => {

    const request = req.body;

    const validationRules = {
        search: VALIDATION_RULES?.NOT_REQUIRED,
        page: VALIDATION_RULES?.NOT_REQUIRED,
        perPage: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.listPartyModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}
