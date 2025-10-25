const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: 10,
  commonCapabilities: {
    "bstack:options": {
      buildName: "browserstack build",
      source: "webdriverio:sample-master:v1.2",
      projectName: "project_1",
    },
  },
  services: [["browserstack", { buildIdentifier: "#${BUILD_NUMBER}" }]],
  capabilities: [
    {
      browserName: "chrome",
      browserVersion: "latest",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
      },
    },
    // {
    //   browserName: 'safari',
    //   browserVersion: '15.6',
    //   'bstack:options': {
    //     os: 'OS X',
    //     osVersion: 'Monterey',
    //   },
    // },
    {
      browserName: "firefox",
      browserVersion: "143", // Using a stable, slightly older version
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
      },
    },
    {
      browserName: "firefox",
      browserVersion: "144",
      "bstack:options": {
        os: "Windows",
        osVersion: "11",
      },
    },
    {
      browserName: "chrome",
      "bstack:options": {
        deviceName: "Samsung Galaxy S20",
      },
    },
    {
      browserName: "chrome",
      "bstack:options": {
        deviceName: "Google Pixel 5",
      },
    },
  ],
};

exports.config = { ...baseConfig, ...parallelConfig };

exports.config.capabilities.forEach(function (caps) {
  // 1. Ensure the 'bstack:options' property exists
  caps["bstack:options"] = caps["bstack:options"] || {};

  // 2. Perform a shallow merge of the common 'bstack:options' properties
  Object.assign(
    caps["bstack:options"],
    exports.config.commonCapabilities["bstack:options"]
  );
});
