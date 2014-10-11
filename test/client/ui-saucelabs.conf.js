exports.config = {
    specs: ['ui/**/*.spec.js'],
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    baseUrl: 'http://localhost:3000',
    capabilities: {
      'browserName': 'firefox',
      'platform': 'Linux',
      'version': '32',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'AgileJS Training Repo'
    }
};
