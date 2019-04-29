const sdk = require('mbaas-js-sdk-alipay');

App({
  onLaunch() {
    console.log('onLaunch', performance.now());
    sdk.init({
      "appId": '',
      "secret": '',
      "envId": ''
    });
  },

  globalData: {
    inited: false,
  }
});
