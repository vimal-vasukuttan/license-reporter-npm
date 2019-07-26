LICENSE-REPORTER/CRAWLER
 =================================

License crawler generate license report of all node packages in a project, based on [license-checker](https://github.com/davglass/license-checker). This will verify if there is any package which is having license not in the whitelisted license list. Based on the options specified, it can exit the process and will generate a report containing packages having non white listed licenses.
Note : White listed licenses are present in bin/resource/whitelisted-license.yaml

Global installation for command line operation
-------------------------------------------------------
`npm i license-reporter-node -g`

Installation in your project
-------------------------------
`npm i license-reporter-node -D`

Options
---------
- onlyProduction : If set to true, will verify only the licenses of packages used in production. 
- genHtmlReport: If set to true, a html report is generated. Default behaviour will not generate report
- failOnLicenseIssue: Set to true, will break the process, if package are found having licenses not among the whitelisted list.

Example
----------

`license-reporter-node --onlyProduction true --genHtmlReport true --failOnLicenseIssue true`

Usage as API
----------------
```
const reporter = require('license-reporter-node')
  reporter.generateReport({
	onlyProduction: false,
	genHtmlReport: false,
	failOnLicenseIssue: true
  });
```
