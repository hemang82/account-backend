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

    addPartiesyModel: async (req, res) => {
        try {
            let { name, phone_number, email, gst_number, address, pan_number } = req;

            // SQL Request
            let request = {
                name: name,
                phone_number: phone_number,
                email: email,
                gst_number: gst_number,
                address: address,
                pan_number: pan_number,
            }

            // Query
            const result = await new Promise((resolve, reject) => {
                connection.query('INSERT INTO tbl_parties SET ?', request, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
                );
            });

            // SQL error check
            if (!result || result.affectedRows === 0) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Party not added", null);
            }

            // SQL Success
            const partyDetails = await salesModels.getPartiesDetails(result.insertId);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Party added successfully", partyDetails);

        } catch (error) {

            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    editPartyModel: async (req, res) => {
        try {
            let { party_id, name, phone_number, email, gst_number, address, pan_number, is_active, is_delete } = req;

            console.log("party_id", party_id);

            const partyDetailsForCheck = await salesModels.getPartiesDetails(party_id);

            console.log('partyDetailsForCheck', partyDetailsForCheck);

            if (!partyDetailsForCheck || isEmptyObject(partyDetailsForCheck)) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Party details not found", null);
            }

            // 🧾 Update object
            let request = {
                name: name ? name : partyDetailsForCheck.name,
                phone_number: phone_number ? phone_number : partyDetailsForCheck?.phone_number,
                email: email ? email : partyDetailsForCheck.email,
                gst_number: gst_number ? gst_number : partyDetailsForCheck.gst_number,
                address: address ? address : partyDetailsForCheck.address,
                pan_number: pan_number ? pan_number : partyDetailsForCheck.pan_number,
            };

            // 🛠 Update Query
            const result = await new Promise((resolve, reject) => {
                connection.query('UPDATE tbl_parties SET ? WHERE id = ?', [request, party_id], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
                );
            });

            // ❌ No row updated
            if (!result || result.affectedRows === 0) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Party not updated or party not found", null);
            }

            // ✅ Fetch updated data
            const partyDetails = await salesModels.getPartiesDetails(party_id);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Party updated successfully", partyDetails);

        } catch (error) {

            console.error("editPartyModel error:", error.message);
            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    detailsPartyModel: async (req, res) => {
        try {
            let { party_id } = req;

            console.log("party_id", party_id);

            const partyDetailsForCheck = await salesModels.getPartiesDetails(party_id);

            console.log('partyDetailsForCheck', partyDetailsForCheck);

            if (!partyDetailsForCheck || isEmptyObject(partyDetailsForCheck)) {
                return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Party details not found", null);
            }

            // ✅ Fetch updated data
            const partyDetails = await salesModels.getPartiesDetails(party_id);

            return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Party details fetch successfully", partyDetails);

        } catch (error) {

            console.error("editPartyModel error:", error.message);
            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Internal server error", null);
        }
    },

    listPartyModel: async (req, res) => {
        try {
            let { search, page, perPage } = req;

            let sql = `SELECT * FROM tbl_parties`
            let params = [];

            // 🔍 search
            if (search) {
                sql += ` WHERE name LIKE ? OR email LIKE ? OR pan_number LIKE ?`;
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

                return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Party list successfully", result);
            } else {

                return headerAuthentication.sendResponse(res, API_CODE.SUCCESS, "Party list not found", result);
            }

        } catch (error) {
            console.log("error listPartyModel", error);

            return headerAuthentication.sendResponse(res, API_CODE.ERROR, "Something went wrong", null);
        }
    },

    getPartiesDetails: async (party_id) => {
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM tbl_parties WHERE id = ? LIMIT 1", [party_id], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
            });

            if (result && result.length > 0) {
                return result[0];
            }

            return {}; // ✅ no data found

        } catch (error) {
            console.error("getPartiesDetails error:", error.message);
            return {};
        }
    },

    // addSales: (req, res) => {
    //     try {
    //         console.log('req', req);
    //         connection.query('INSERT INTO tbl_sales SET ? ', [{
    //             invoice_number: req.invoice_number,
    //             date: req.date,
    //             name: req.name,
    //             address: req.address,
    //             information: req.information,
    //             sub_total: req.sub_total,
    //             additional_charge: req.additional_charge,
    //             total_amount: req.total_amount
    //         }], (error, result) => {

    //             console.log("result", result);

    //             if (result?.length > 0) {

    //             } else {

    //             }

    //         })
    //     } catch (error) {
    //         console.log("error", error);
    //     }

    // }
}

module.exports = salesModels;