// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process() {
    return `
      const idObj = require('identity-obj-proxy');
      module.exports = idObj;
    `;
  },
  // eslint-disable-next-line no-unused-vars
  getCacheKey(fileData, filename) {
    // The output is always the same.
    return 'cssTransform';
  },
};
