const { validationResult } = require("express-validator");


function logError(err, data) {
    console.log("ERROR: " + err.message);
}

async function errorWrapper(req, res, f) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({errors: errors.array()});}
        await f();
    } catch (err) {
        errorHandle(err, req, res);
        return res;
    }
}

function errorHandle(err, req, res) {
    logError(err, {req, res});
    res.status(500).json({message:'Internal Server Error'});
}


exports.logError = logError;
exports.errorWrapper = errorWrapper;
exports.errorHandle = errorHandle