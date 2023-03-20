var dformat = require("date-fns/format");
var dateAdd = require("date-fns/add");

const TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";

const generateRTExpiry = async (expiryInSeconds) => {
    return dformat(
        dateAdd(new Date(), { seconds: expiryInSeconds }),
        TIMESTAMP_FORMAT
    );
};

module.exports = generateRTExpiry;
