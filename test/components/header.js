const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const ActionSequence = webdriver.ActionSequence;
const expect = require('chai').expect;

describe('Header', function(done) {

    it('Should resolve to /warehouse-coupon-offers.html', function(done) {
        this.driver.call(() => {
            this.driver.findElement(By.id('warehouse-coupons')).click();
            this.driver.getCurrentUrl().then(url => {
                expect(url).to.contain('warehouse-coupon-offers.html');
                done();
            })
        }).catch(error => done(error));
    });

    it('Should resolve to customerservice.costco.com', function(done) {
        this.driver.call(() => {
            this.driver.findElement(By.id('customer-service-link')).click();
            this.driver.getCurrentUrl().then(url => {
                expect(url).to.contain('customerservice.costco.com');
                done();
            })
        }).catch(error => done(error))
    });

    it('Should resolve to /warehouse-locations', function(done) {
        this.driver.call(() => {
            new ActionSequence(this.driver)
                .mouseMove(this.driver.findElement(By.id('warehouse-locations-t')))
                .perform();
            this.driver.findElement(By.id('warehouse-search-field')).sendKeys('98075');
            this.driver.findElement(By.id('warehouse_locator_search')).submit();
            this.driver.getCurrentUrl().then(url => {
                expect(url).to.contain('/warehouse-locations?location=98075');
                done();
            })
        }).catch(error => done(error))
    });

});