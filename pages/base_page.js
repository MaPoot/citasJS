const { resolve } = require('path');
const {By, Key, until} = require('selenium-webdriver');


class Page {
  constructor(driver) {
    this.driver = driver;
  }

  waitAndClick = async function (element) {
    var webElement = await this.driver.findElement(By.xpath(element));
    await this.driver.wait(until.elementIsVisible(webElement), 5000).click();
  }

  waitAndSendKeys = async function (element, keys) {
    var webElement = await this.driver.findElement(By.xpath(element));
    await this.driver.wait(until.elementIsVisible(webElement), 5000).sendKeys(keys);
  }

  waitLocated = async function (element) {
    await this.driver.wait(until.elementLocated(By.xpath(element)), 50000);
  }

  takeScreenshot = async function (name) {
    await this.driver.takeScreenshot().then(
      async function(image) {
          require('fs').writeFile(name, image, 'base64', function(err) {
              if(err == null){
                console.log("image_saved")
              }else{
                console.log(err);
              }
        });
      }
    );
  }

  waitPageLoad = async function () {
    var ready;

    await this.driver.wait(async function (driver) {
      await driver.executeScript(function () {
        return document.readyState;
      }).then(function (returnedValue) {
        ready = returnedValue;
      });

      if (ready == "complete") {
        return true
      }
    }, 10000);
  }
 
  focusElement = async function (element) {
    await this.waitPageLoad();
    await this.driver.executeScript(function (name) {
        document.getElementById(name).scrollIntoView({block: "center"});
    }, element);
  }

  sleep = async function () {
    await this.driver.sleep(5000);
  }

}

module.exports = Page;
