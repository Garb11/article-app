function logError(err, data) {
    console.log("ERROR: " + err.message);
}

exports.errorHandle = function(err, req, res) {
    logError(err, {req, res});
    res.status(500).json({message: 'Internal Server Error'});
}
  
  
exports.logError = logError;