const {Builder, By, Key, until} = require('selenium-webdriver');
var Page = require('../pages/base_page');
const resolveCatpchaImage = require('../anticaptcha/imageCaptcha')

class sat_homePage extends Page{
    constructor (driver) {
        super(driver);
        this.yucatanAdmins = '//div[@id="ArbolAdministraciones"]//a[contains(text(), "Yucatán")]';
        this.yucatanADSC = '//div[@id="ArbolAdministraciones"]//a[contains(text(), "ADSC Yucatán")]';
        this.eFirmaXpath = '//input[@id="RBLServicios_4"]';
        this.aviso = '//div[@id="ModalMensajeServicio"]//button[text() = "Cerrar"]';
        this.captchaError = '//span[@id="LabelErrorCaptcha"]';
        this.capchaImage = '//img[@id="captcha"]';
        this.captchaInput = '//input[@id="txtUserInput"]';
        this.refreshCapthca = '//a[@id="ButtonRefresh"]';
        this.buttonNext = '//input[@id="cmdSiguiente"]';
    }

    yucatanAdminsClick = async function () {
        await this.waitAndClick(this.yucatanAdmins);
    }

    yucatanADSClick = async function (){
        await this.waitAndClick(this.yucatanADSC);
    }

    efirmaClick = async function () {
        await this.waitAndClick(this.eFirmaXpath);
    }

    closeAviso =  async function () {
        await this.waitAndClick(this.aviso);
    }

    solveCaptcha = async function () {
        var src = await this.driver.findElement(By.xpath(this.capchaImage)).getAttribute('src');
        var img = src.split(',')[1];
        var solution = await resolveCatpchaImage(img); 
        await this.waitAndSendKeys(this.captchaInput, solution + Key.SHIFT);
    }
    
    clickNext = async function () {
       await this.waitAndClick(this.buttonNext); 
    }

    focusCaptcha = async function (){
        await this.focusElement("CaptchasContainer");
    }

    avisoDisplayed = async function () {
        await this.waitPageLoad();
        var displayed = false;
        
        try{
            displayed = await this.driver.findElement(By.xpath(this.aviso)).isDisplayed();
        }catch{
            displayed = false;
        }

        return displayed;
    }
}

module.exports = sat_homePage;
