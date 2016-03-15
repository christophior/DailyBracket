var webdriver = require('selenium-webdriver'),
    Chance = require('chance'),
    chance = new Chance(),
    async = require('async'),
    _ = require('underscore'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;


var SIGNUP_URL = 'https://www.dailybracket.com/',
    EMAIL_URL = 'https://www.guerrillamail.com',
    REFERAL_CODE = '3SFY';

console.log("--- begin signup ---");

_.times(7, function(i) {
    var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();

    driver.get(SIGNUP_URL);

    driver.wait(until.elementLocated(By.className('sidebar-icon')), 5000);
    driver.findElement(By.className('sidebar-icon')).click();

    driver.wait(until.elementLocated(By.className('signupBtn')), 5000);
    driver.wait(until.elementIsVisible(driver.findElement(By.className('signupBtn'))), 5000);
    driver.findElement(By.className('signupBtn')).click();

    var user_email = chance.email({length: 10, domain: 'grr.la'}),
        emailWithoutDomain = user_email.split('@grr.la')[0];

    console.log('\tsigning up using: ' + user_email);

    driver.wait(until.elementLocated(By.name('email')), 5000);
    driver.wait(until.elementIsVisible(driver.findElement(By.name('email'))), 5000);
    driver.findElement(By.name('email')).sendKeys(user_email);
    driver.findElement(By.name('phone')).sendKeys(chance.phone());
    driver.findElement(By.name('user')).sendKeys(user_email);
    driver.findElement(By.name('password')).sendKeys('P@s$w0rD1');
    driver.findElement(By.name('state')).sendKeys('Texas');
    driver.findElement(By.name('referal')).sendKeys(REFERAL_CODE);

    driver.wait(until.elementLocated(By.className('connect-btn')), 5000);
    driver.wait(until.elementIsVisible(driver.findElement(By.className('connect-btn'))), 5000);
    driver.findElement(By.className('connect-btn')).click();

    // verify email
    driver.get(EMAIL_URL);
    driver.findElement(By.css('#gm-host-select > option:nth-child(3)')).click();
    driver.findElement(By.css('span#inbox-id.editable.button')).click();
    driver.findElement(By.xpath("/html/body/div[@id='guerrilla_mail']/div[@class='main-panel']/div[@class='show_address']/div[@class='col2']/span[@class='strong']/span[@id='inbox-id']/input")).sendKeys(emailWithoutDomain);
    driver.findElement(By.css('button.save.button.small')).click();

    // driver.quit();
});