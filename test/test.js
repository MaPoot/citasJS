const { Driver } = require('selenium-webdriver/chrome');
var sat_page = require ('../pages/sat_homePage');
var sat_personal = require('../pages/sat_personalInfo');
const driverManager = require ('../driverManager/driverManager')

const chai = require('chai'),
assert = chai.assert,
expect = chai.expect;

describe ('Automated CitasSAT', function(){
    this.timeout(500000);
    let name = 'Manuel';
    var driver;

    beforeEach( async function(){
        driver = await driverManager.lunchBrowser();
    });

    afterEach(async function(){
        await driverManager.quit();
    });

    it('Getting screenshot of the calendar', async function(){
        await driverManager.visit ('https://citas.sat.gob.mx/citasat/agregarcita.aspx');
        var sat = new sat_page(driver);
        await sat.waitPageLoad();
        await sat.yucatanAdminsClick();
        await sat.yucatanADSClick();
        await sat.efirmaClick();

        while(await sat.avisoDisplayed()){
            await sat.closeAviso();
            await sat.focusCaptcha();
            await sat.solveCaptcha();
            await sat.clickNext();
        }

        var personal = new sat_personal(driver);
        await personal.nameInputSendKeys("Manuel Poot");
        await personal.rfcInputSendKeys("POAM911227DE7");
        await personal.emailInputSendKeys("manuel.poot753@gmail.com");
        await personal.focusDatosCalendar();
        await sat.takeScreenshot("cap.png");
    }); 

});








