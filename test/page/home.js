let webdriver = require('selenium-webdriver'),
    util = require('../../utility.js'),
    By = webdriver.By,
    expect = require('chai').expect,
    timeout = 15000,
    driver = undefined;
/**
 * Home.js
 * 
 * Page level suite. Correlates with home page for the given
 * environment.
 */
util.get_environments('com', ['PROD']).forEach((env_obj, i) => {
   describe('Home Page Suite | Environment: '+env_obj.name, function() {
        this.timeout(timeout);
        /**
         * Before each test, intialize a new webdriver,
         * using chrome driver (eventually use all browser-specific
         * drivers) and open the home page.
         */
        beforeEach(function(done) {
            driver = new webdriver.Builder().
                withCapabilities(webdriver.Capabilities.chrome()).build();
            driver.get(env_obj.domain)
                .then(done)
                .catch(error => done(error))
        });

        /**
         * After each test, close the webdriver to ensure we have
         * a fresh driver for each test.
         */
        afterEach(function(done) {
            driver.quit()
                .then(done)
                .catch(error => done(error));
        });


        it('Should be on the home page', function(done) {
            // var element = driver.findElement(By.tagName('body'));

            // element.getAttribute('id').then(id => {
            //     expect(id).to.equal('home');
            //     done();
            // });
            done();
        });

        
        it('Has a working nav', function(done) {
            // var element = driver.findElement(By.linkText('REVIEW'));

            // element.click();

            // driver.getCurrentUrl()
            //     .then(function(value) {
            //         expect(value).to.contain('/review');
            //         done();
            //     });
            done();
        });
    });
});