const assert = require('assert').strict;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder().forBrowser('chrome').build();
const By = webdriver.By; // describes query selector
const until = webdriver.until // wait for something to happen

// ask browser to open a page
// driver.navigate().to('https://localhost:3000/#');
// driver.wait(until.elementLocated(By.css('.App')))
// driver.wait(until.elementLocated(By.css('.main-header')));
// driver.findElement(By.css('.main-header')).click();

chai.use(chaiAsPromised);

// do not use an arrow function here
// otherwise "this" cannot be used
describe('App', async function() {

    this.timeout(10_000);

    // eslint-disable-next-line no-undef
    before(() => driver.navigate().to('localhost:3000'))

    it('loads without crashing', async() => {
        driver.wait(until.elementLocated(By.css('.App')), 1000);
        return driver.findElement(By.css('.App'));
    });

    it('correctly gets app title', () => {
        return driver.getTitle()
            .then(title => {
                assert.strictEqual(title, 'React App')
            })
            .catch(e => Promise.reject(e))
    })

    // eslint-disable-next-line no-undef
    after(() => {
        return driver.quit();
    });
});