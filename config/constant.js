const CONSTANT = {

    // --------------------------------- HEADERS_KEY -----------------------------------

    HEADERS_KEY: {
        API_KEY: "api-key",
        LANGUAGE_KEY: "accept-language"  // Fixed spelling
    },

    // --------------------------------- API_CODE -----------------------------------

    API_CODE: {
        SUCCESS: 1,
        INTERNAL_ERROR: 0,
        VALIDATION_ERROR: 0,
        UNAUTHORIZED: -1,
        INACTIVE: 3,
        NOT_FOUND: 2,
        ERROR: 0,
        PROFILE_SCREEN: 11,
        ABOUT_SCREEN: 12,
        PROFILE_TYPE_SCREEN: 13
    },

    // --------------------------------- API_VALIDATION_RULES -----------------------------------

    VALIDATION_RULES: {

        NOT_REQUIRED: "",
        REQUIRED: "required",

        // Common REQUIRED field rules
        EMAIL: "required|email",
        NULLABLE_EMAIL: "nullable|email",

        PASSWORD: "required|min:6|max:20",

        PHONE: "required|numeric|digits:10",

        MOBILE: "required|mobile|digits:10",
        NULLABLE_MOBILE: "nullable|digits:10",

        NAME: "required|min:2|max:50",
        FULL_NAME: "required|min:3|max:100",
        USERNAME: "required|min:3|max:30",
        TITLE: "required|min:5|max:200",
        DESCRIPTION: "max:1000",
        STATUS: "required|in:active,inactive,pending",
        ID: "required|integer",
        PINCODE: "required|digits:6",
        AGE: "required|integer|min:18|max:100",
        PRICE: "required|numeric|min:0",
        AMOUNT: "required|numeric|min:1",
        URL: "required|url",
        WEBSITE: "url",

        // ========== IDENTIFICATION ==========
        BANK_ACCOUNT_NUMBER: "required|numeric|min:9|max:18",
        IFSC_CODE: "required|alpha_num|size:11",
        AADHAAR_NUMBER: "required|numeric|digits:12",
        PAN_NUMBER: "size:10",

        // ========== DATE & TIME FORMATS ==========
        DATE: "required|date|date_format:DD-MM-YYYY",
        TIME: "required|date_format:HH:mm:ss",
        EXPIRY_DATE: "required|date|after:today|date_format:YYYY-MM-DD",

        // ========== AUTHENTICATION & SECURITY ==========
        TOKEN: "required|min:32",
        API_KEY: "required|min:20",
        REFRESH_TOKEN: "required|min:32",
        OTP: "required|numeric|digits:6",

        // ========== STATUS & TYPES ==========
        STATUS: "required|in:active,inactive,pending,blocked,deleted",
        GENDER: "in:male,female,other",

    },
}

module.exports = CONSTANT;