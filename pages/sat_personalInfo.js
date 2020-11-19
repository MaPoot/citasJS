const {Builder, By, Key, until} = require('selenium-webdriver');
var Page = require('../pages/base_page');

class sat_PersonalInfo extends Page{
    constructor (driver) {
        super(driver);
        this.nameInput = "//input[@id='TXTNombreContribuyente']";
        this.rfcInput = "//input[@id='TXTRFC']";
        this.emailInput = "//input[@id='TXTCorreoElectronico']";
        this.telephoneInput = "//input[@id='TXTTelefono']";
        this.calendar = "//div[@id='calendarwrapper']";
        this.datosCita = "//div[@class='DatosDeLaCita']";
    }

    nameInputSendKeys = async function (name) {
        await this.waitPageLoad();
        await this.waitAndSendKeys(this.nameInput, name);
    }

    rfcInputSendKeys = async function (rfc){
        await this.waitPageLoad();
        await this.waitAndSendKeys(this.rfcInput, rfc);
    }

    emailInputSendKeys = async function (email) {
        await this.waitPageLoad();
        await this.waitAndSendKeys(this.emailInput, email);
    }

    telephoneInputSendKeys =  async function (phone) {
        await this.waitPageLoad();
        await this.waitAndClick(this.telephoneInput);
        await this.waitAndSendKeys(this.telephoneInput, phone);
    }

    focusDatosCalendar = async function () {
        await this.waitPageLoad();
        await this.waitLocated(this.calendar);
        await this.focusElement("calendarwrapper");
    }
}

module.exports = sat_PersonalInfo;
