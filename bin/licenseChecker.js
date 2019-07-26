const loadWhiteListedLicense = require('./loadWhiteListedLicense')
const htmlReport = require('./htmlReport.js')
const checker = require('license-checker')
const path = require('path')
const whiteListedLicense = loadWhiteListedLicense.whiteListedLicenses()

const options = {
  start: '.',
  relativeLicensePath: true, //Show path of license file
  excludePrivatePackages: true, //Exclude packages marked as private
  json: true
}

//Convert the Map containing licenses to list of licenses - Needed for generating html report
const getLicenseList = licenseAsMap => {
  let licenselist = []
  for (const key in licenseAsMap) {
    if (licenseAsMap.hasOwnProperty(key)) {
      let licenseDetail = licenseAsMap[key]
      licenseDetail.module = key
      licenseDetail.path = path.relative(process.cwd(), licenseDetail.path)
      licenselist.push(licenseDetail);
    }
  }
  return licenselist
}

// License Check
module.exports.genReport = (props) => {
  console.log('===================================================================')
  console.log('===========Verify Licenses for Non-WhiteListed Licenses============')
  console.log('White Listed Licenses: ' + whiteListedLicense)
  if (props) {
    if (props.onlyProduction === true || props.onlyProduction === 'true') {
      options.production = true
    }
    if (props.genHtmlReport === true || props.genHtmlReport === 'true') {
      options.genHtmlReport = true
    }
    if (props.failOnLicenseIssue === true || props.failOnLicenseIssue === 'true') {
      options.failOnLicenseIssue = true
    }
  }
  //Add white listed licenses to exclude 
  options.exclude = whiteListedLicense
  checker.init(options,
    (error, res) => {
      if (error) {
        console.error("Error:", error)
      } else if (res) {
        let licenses = getLicenseList(res)
        if (licenses.length > 0) {
          console.log("Number of Packages with license issues: " + licenses.length)
          if (options.genHtmlReport) {
            htmlReport.generateHtmlReport(licenses)
          }
          console.log('===========Summary============')
          console.log(checker.asSummary(res))
          //If non white listed licenses are found, then exit
          if (options.failOnLicenseIssue) {
            console.log('====Non WhiteListed Licenses present. Stoping the process====')
            process.exit(1)
          }
        } else {
          console.log('====No License Issues====')
        }
      }
      else {
        console.log('==============No Licenses Retrieved==============')
      }
    }
  )
}
