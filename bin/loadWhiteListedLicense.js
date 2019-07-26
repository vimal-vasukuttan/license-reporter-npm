const readYaml = require('js-yaml')
const fs = require('fs')
const { join } = require('path')

//Read whitelisted liencenses
const whiteListedLicenses = () => {
  try {
    let whiteListedLicense = readYaml.safeLoad(fs.readFileSync(join(__dirname, 'resource/whitelisted-license.yaml'), 'utf8'))
    if (whiteListedLicense) {
      return whiteListedLicense.join();
    }
  }
  catch (e) {
    console.log('Unable to load white listed licenses', e)
    throw e
  }
}

module.exports.whiteListedLicenses = whiteListedLicenses
