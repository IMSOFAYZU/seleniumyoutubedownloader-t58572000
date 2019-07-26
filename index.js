const DRIVER = "chromedriver"; //chromedriver
const BROWSER = "chrome"; //chrome

var webdriver = require("selenium-webdriver");
require(DRIVER);

async function getElement(driver, locator, timeout){
    await driver.wait(webdriver.until.elementLocated(locator), timeout);
    return await driver.findElement(locator);
}

async function execute() {
    var builder = new webdriver.Builder();
    builder.forBrowser(BROWSER);
    var driver = builder.build();

    await driver.get("https://www.youtube.com/?gl=TW&hl=zh-TW");
    var searchBox=await getElement(driver, webdriver.By.name("search_query"), 3000);
    await searchBox.sendKeys("我的英雄學院第一季ED");
    var searchButton=await getElement(driver, webdriver.By.id("search-icon-legacy"), 3000);
    await searchButton.click();
    
    let c=await getElement(driver,
        webdriver.By.className("ytd-video-renderer"),3000);
       // console.log("c"+c);
    let a=await c.findElement(webdriver.By.tagName("a"));
    let href=await a.getAttribute("href");
    //driver.get(href);
    
    await driver.get("https://www.safetoconvert.com/");
    let s=await getElement(driver,webdriver.By.name("s"),3000);
    await s.sendKeys(href);
    let b=await getElement(driver,webdriver.By.className("fa-search"),3000);
    await b.click();

    /*let bt=await getElement(driver,webdriver.By("btn-success"),3000);
    await bt.click();//只能按第一個按鈕
    driver.close;*/

    let list=await driver.findElements(webdriver.By.className("btn-success"));
    for(let h of list){
        if(h.getAttribute("href").indexOf("720p")!=-1){//indexOf=字串比對
            let href=h.getAttribute("href");
            driver.get(href);
   
        }
    }   
    
}

execute();
