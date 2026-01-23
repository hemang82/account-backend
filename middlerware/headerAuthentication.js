const Validator = require('Validator');
const { HEADERS_KEY, API_CODE } = require("../config/constant");

const bypassToken = new Array("/")

const bypassAPIKey = new Array("encryption", "decryption");

const headerAuthentication = {

    checkAPIKeys: async (req, res, next) => {
        try {

            console.log(' 🔐 Middleware CheckAPIKeys ');

            const apiKey = req.headers[HEADERS_KEY?.API_KEY] !== undefined && req.headers[HEADERS_KEY?.API_KEY] !== "" ? req.headers[HEADERS_KEY?.API_KEY] : '';
            const pathData = req.path.split("/");
            if (bypassAPIKey.indexOf(pathData[3]) === -1) {
                if (apiKey === "cyber123") {
                    next();
                } else {
                    return await headerAuthentication.sendResponse(res, API_CODE.UNAUTHORIZED, "Invalid API key", null);
                }
            } else {
                next()
            }
        } catch (error) {
            return await headerAuthentication.sendResponse(res, API_CODE.UNAUTHORIZED, "Something went wrong", null);
        }
    },

    sendResponse: async (res, resCode, message, resData) => {
        try {
            const responsejson = {
                code: resCode,
                message: message
            }
            if (resData != null) {
                responsejson.data = resData;
            }
            res.status(200).send(responsejson);
        } catch (error) {
            console.log('error', error);
            return error.message;
        }
    },

    // check Validation Rules
    checkValidationRules: async (request, rules) => {
        try {
            const v = Validator.make(request, rules);
            const validator = {
                status: true,
            }

            if (v.fails()) {
                const ValidatorErrors = v.getErrors();
                validator.status = false
                for (const key in ValidatorErrors) {
                    validator.error = ValidatorErrors[key][0];
                    break;
                }
            }
            return validator;
        } catch (error) {
            console.log(error);

            // logger.error(error.message);
            console?.log(error.message)
            // return error.message;
        }
        return false;
    },

}

module.exports = headerAuthentication