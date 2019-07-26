const licenseChecker = require('./bin/licenseChecker.js')
module.exports.generateReport = reportOptions => {
    licenseChecker.genReport(reportOptions)
}