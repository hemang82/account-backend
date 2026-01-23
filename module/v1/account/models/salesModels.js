const { API_CODE } = require('../../../../config/constant');
const connection = require('../../../../config/database');
const headerAuthentication = require('../../../../middlerware/headerAuthentication');

const isEmptyObject = (obj) => {
    return obj &&
        typeof obj === "object" &&
        !Array.isArray(obj) &&
        Object.keys(obj).length === 0;
};


const salesModels = {

    addSalesModel: async (req, res) => {
        try {

            let { invoice_number, date, vc_type, vc_number, document_number, document_date, taxable, IGST, CGST, SGST, TAX } = req;

            // SQL Request
            let request = {
                invoice_number: invoice_number,
                date: date,
                vc_type: vc_type,
                vc_number: vc_number,
                document_number: document_number,
                document_date: document_date,
                taxable: taxable,
                IGST: IGST,
                CGST: CGST,
                SGST: SGST,
                TAX: TAX
            }

            // Query
            const result = await new Promise((resolve, reject) => {
                connection.query('INSERT INTO tbl_sales SET ?', request, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
                );
            });

            // SQL error check
            if (!result || result.affectedRows === 0) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Sales not added", null);
            }

            // SQL Success
            const partyDetails = await salesModels.getSalesDetails(result.insertId);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Sales added successfully", partyDetails);

        } catch (error) {

            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    editSalesModel: async (req, res) => {
        try {
            let { sales_id, invoice_number, date, vc_type, vc_number, document_number, document_date, taxable, IGST, CGST, SGST, TAX } = req;

            const salesDetailsForCheck = await salesModels.getSalesDetails(sales_id);

            if (!salesDetailsForCheck || isEmptyObject(salesDetailsForCheck)) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Party details not found", null);
            }

            // 🧾 Update object
            let request = {
                invoice_number: invoice_number ? invoice_number : salesDetailsForCheck?.invoice_number,
                date: date ? date : salesDetailsForCheck?.date,
                vc_type: vc_type ? vc_type : salesDetailsForCheck.salesDetailsForCheck,
                vc_number: vc_number ? vc_number : salesDetailsForCheck.vc_number,
                document_number: document_number ? document_number : salesDetailsForCheck.document_number,
                document_date: document_date ? document_date : salesDetailsForCheck.document_date,
                taxable: taxable ? taxable : salesDetailsForCheck.taxable,
                IGST: IGST ? IGST : salesDetailsForCheck.IGST,
                CGST: CGST ? CGST : salesDetailsForCheck.CGST,
                SGST: SGST ? SGST : salesDetailsForCheck.SGST,
                TAX: TAX ? TAX : salesDetailsForCheck.TAX
            }

            // 🛠 Update Query
            const result = await new Promise((resolve, reject) => {
                connection.query('UPDATE tbl_sales SET ? WHERE id = ?', [request, sales_id], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
                );
            });

            // ❌ No row updated
            if (!result || result.affectedRows === 0) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Sales not updated or Sales not found", null);
            }

            // ✅ Fetch updated data
            const partyDetails = await salesModels.getSalesDetails(sales_id);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Sales updated successfully", partyDetails);

        } catch (error) {

            console.error("editPartyModel error:", error.message);
            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    detailsPartyModel: async (req, res) => {
        try {

            let { sales_id } = req;

            const salesDetailsForCheck = await salesModels.getSalesDetails(sales_id);

            if (!salesDetailsForCheck || isEmptyObject(salesDetailsForCheck)) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "details not found", null);
            }

            // ✅ Fetch updated data
            const partyDetails = await salesModels.getSalesDetails(sales_id);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Sales details fetch successfully", partyDetails);

        } catch (error) {

            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    listSalesModel: async (req, res) => {
        try {
            let { search, page, perPage } = req;

            let sql = `SELECT * FROM tbl_sales`
            let params = [];

            // 🔍 search
            if (search) {
                sql += ` WHERE invoice_number LIKE ? OR date LIKE ? OR vc_number LIKE ?`;
                params.push(`%${search}%`, `%${search}%`, `%${search}%`);
            }

            // 📄 Pagination
            if (page && perPage) {
                const limit = parseInt(perPage);
                const offset = (parseInt(page) - 1) * limit;
                sql += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
                params.push(limit, offset);
            } else {
                sql += ` ORDER BY id DESC`
            }

            console.log("sql", sql);

            // Query
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, params, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
            });

            // SQL error check
            if (!result || result.affectedRows === 0) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Something went wrong", null);
            }

            if (result?.length > 0) {

                return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Sales list successfully", result);
            } else {

                return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Sales list not found", result);
            }

        } catch (error) {
            console.log("error listSalesModel", error);

            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Something went wrong", null);
        }
    },

    getSalesDetails: async (sales_id) => {
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM tbl_sales WHERE id = ? LIMIT 1", [sales_id], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
            });

            if (result && result.length > 0) {
                return result[0];
            }

            return {}; // ✅ no data found

        } catch (error) {
            console.error("getSalesDetails error:", error.message);
            return {};
        }
    },

}

module.exports = salesModels;