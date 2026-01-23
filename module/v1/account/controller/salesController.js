const { API_CODE, VALIDATION_RULES } = require("../../../../config/constant");

const headerAuthentication = require("../../../../middlerware/headerAuthentication");
const salesModels = require("../models/salesModels");

exports.addSales = async (req, res) => {

    const request = req.body;

    const validationRules = {
        invoice_number: VALIDATION_RULES?.REQUIRED,
        date: VALIDATION_RULES?.REQUIRED,
        vc_type: VALIDATION_RULES?.REQUIRED,
        vc_number: VALIDATION_RULES?.REQUIRED,
        document_number: VALIDATION_RULES?.REQUIRED,
        document_date: VALIDATION_RULES?.REQUIRED,
        taxable: VALIDATION_RULES?.NOT_REQUIRED,
        IGST: VALIDATION_RULES?.NOT_REQUIRED,
        CGST: VALIDATION_RULES?.NOT_REQUIRED,
        SGST: VALIDATION_RULES?.NOT_REQUIRED,
        TAX: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.addSalesModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.editSales = async (req, res) => {

    const request = req.body;

    const validationRules = {
        sales_id: VALIDATION_RULES?.ID,
        invoice_number: VALIDATION_RULES?.NOT_REQUIRED,
        date: VALIDATION_RULES?.NOT_REQUIRED,
        vc_type: VALIDATION_RULES?.NOT_REQUIRED,
        vc_number: VALIDATION_RULES?.NOT_REQUIRED,
        document_number: VALIDATION_RULES?.NOT_REQUIRED,
        document_date: VALIDATION_RULES?.NOT_REQUIRED,
        taxable: VALIDATION_RULES?.NOT_REQUIRED,
        IGST: VALIDATION_RULES?.NOT_REQUIRED,
        CGST: VALIDATION_RULES?.NOT_REQUIRED,
        SGST: VALIDATION_RULES?.NOT_REQUIRED,
        TAX: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.editSalesModel(request, res);
    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.detailSales = async (req, res) => {

    const request = req.body;

    const validationRules = {
        sales_id: VALIDATION_RULES?.ID,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.detailsPartyModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}

exports.listSales = async (req, res) => {

    const request = req.body;

    const validationRules = {
        search: VALIDATION_RULES?.NOT_REQUIRED,
        page: VALIDATION_RULES?.NOT_REQUIRED,
        perPage: VALIDATION_RULES?.NOT_REQUIRED,
    }

    const valid = await headerAuthentication.checkValidationRules(request, validationRules)

    if (valid.status) {

        return salesModels.listSalesModel(request, res);

    } else {
        return headerAuthentication.sendResponse(res, API_CODE.ERROR, `${valid?.error || "Validation error"} `, null);
    }
}
