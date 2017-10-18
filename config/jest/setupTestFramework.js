/* global jasmine:false */
/* eslint-disable global-require */

if (process.env.CI) {
  const jasmineReporters = require('jasmine-reporters');
  const junitReporter = new jasmineReporters.JUnitXmlReporter({
    savePath: 'testresults',
    consolidateAll: false,
  });

  jasmine.getEnv().addReporter(junitReporter);
}
