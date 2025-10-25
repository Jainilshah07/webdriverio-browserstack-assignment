const { config: baseConfig } = require('./base.conf.js');

exports.config = {
  ...baseConfig, // inherit base settings

  outputDir: 'all-logs',

  //
  // ✅ Use local ChromeDriver service
  //
  services: ['chromedriver'],

  //
  // ✅ Point to your local test file
  //
  specs: ['./tests/specs/local_test.js'],

  //
  // ✅ Local Chrome configuration
  //
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--start-maximized',
          // '--headless', '--disable-gpu', // uncomment for headless mode
        ],
      },
    },
  ],

  //
  // ✅ No need to set hostname/port/path
  // The chromedriver service handles that automatically
  //

  //
  // Optional: shorter waits for local testing
  //
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
};
