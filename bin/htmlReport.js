// Generates HTML report
const mustache = require('mustache')
const fs = require('fs')
const { join } = require('path')

//template to generate report
const template = fs.readFileSync(join(__dirname, 'resource/template.html'), 'utf8')
const localDir = '' //Target directory for report generation.

const generateHtmlReport = licenseList => {
  let licenseDetails = new Object()
  licenseDetails.license = licenseList
  htmlReport(licenseDetails)
}

//generate html file.
const htmlReport = reportData => {
  const reportFile = join(localDir, 'licenses-report.html')
  fs.writeFileSync(reportFile, parse(reportData));
  console.log('========================Generated Report file: ' + reportFile)
}

//Parse a license report json and generate html report based on template.
const parse = (reportJson) => {
  return mustache.render(template, reportJson).trim();
}

module.exports.generateHtmlReport = generateHtmlReport
