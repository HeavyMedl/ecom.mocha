let webdriver = require('selenium-webdriver'),
    util = require('../../utility.js'),
    By = webdriver.By,
    expect = require('chai').expect,
    timeout = 15000,
    environments = util.get_environments('com', ['PROD']);
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

        it('Header: "View Warehouse Coupons" hyperlink should resolve to warehouse-coupon-offers.html', function(done) {
            this.driver.findElement(By.id('warehouse-coupons')).click();
            this.driver.getCurrentUrl()
                .then(url => {
                    expect(url).to.contain('warehouse-coupon-offers.html');
                    done();
                })
        });
        it('Header: "Customer Service" hyperlink should resolve to customerservice.costco.com', function(done) {
            this.driver.findElement(By.id('customer-service-link')).click();
            this.driver.getCurrentUrl()
                .then(url => {
                    expect(url).to.contain('customerservice.costco.com');
                    done();
                })
        });
    });
});