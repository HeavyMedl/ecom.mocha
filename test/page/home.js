const util = require('../../utility');
const webdriver = require('selenium-webdriver');
const expect = require('chai').expect;
const timeout = 25000;
const environments = util.get_environments('com', ['DEV','PROD']);
        // .concat(util.get_environments('ca', ['PROD']))
/**
 * Home.js
 * 
 * Page level suite. Correlates with home page for the given
 * environment.
 */
environments.forEach((env_obj, i) => {
   describe(`Home Page Suite | ${env_obj.name} | ${env_obj.domain}`, function() {
        this.timeout(timeout);
        /**
         * Before each test, intialize a new webdriver,
         * using chrome driver (eventually use all browser-specific
         * drivers) and open the home page.
         */
        beforeEach(function(done) {
            this.driver = new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .build();
            this.driver.get(env_obj.domain)
                .then(done)
                .catch(error => done(error))
        });
        /**
         * After each test, close the webdriver to ensure we have
         * a fresh driver for each test.
         */
        afterEach(function(done) {
            this.driver.quit()
                .then(done)
                .catch(error => done(error));
        });

        // Header component tests
        util.import('test/components/header.js');
    });
});