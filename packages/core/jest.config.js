/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
  ...base,
  name: packageJson.name,
  displayName: packageJson.name,
};
