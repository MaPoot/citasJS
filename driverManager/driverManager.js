const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const firefox = require('selenium-webdriver/firefox');
const geckodriver = require('geckodriver');

var options = new firefox.Options();
options.addArguments("-headless");

class DriverManager {
    static lunchBrowser = async function () {
        this.driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        await this.driver.manage().deleteAllCookies();
        await this.driver.manage().window().maximize();
        return this.driver;
    }

    static visit = async function (url) {
        await this.driver.get(url);
    }

    static quit = async function () {
        await this.driver.quit();
    }

}

module.exports = DriverManager;