exports.config = {
  specs: ['ui/**/*.spec.js'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:3000',
  browser: 'chrome'
};
