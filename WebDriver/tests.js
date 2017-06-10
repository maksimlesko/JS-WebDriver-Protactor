var webdriver = require('selenium-webdriver'); 
var driver = new webdriver.Builder().forBrowser('chrome').build(); 

function deleteCookies() {
	console.log('Deleting cookies...')
	return driver.manage().deleteAllCookies(); 
}

function maximizeWindow() {
	console.log('Switching to full screen...')
	return driver.manage().window().maximize(); 
}

function getTitle() {
	let promise = driver.getTitle().then ( function(title) {
		assert(title === 'CCH AnswerConnect', 'Assertion failed');
	})
	return promise;
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function goBack(){
	return driver.navigate().back(); 
}


function closeBrowser() {
    driver.quit();
}

deleteCookies();
maximizeWindow();
driver.get('http://www.answerconnect.stg.cch.com/?forcestandardlogin#/home');
driver.wait(webdriver.until.elementLocated({ xpath: '//*[@id="username"]'}))
	.then (function() {
		console.log('Typing login...');
		return driver.findElement(webdriver.By.id('username')).sendKeys('ac2cl.all109@cch.com');
	});

driver.findElement({ xpath:'//*[@id="password"]'})
	.then (function() {
		console.log('Typing password..');
		return driver.findElement({ xpath:'//*[@id="password"]'}).sendKeys('password');
	})

driver.findElement(webdriver.By.className('wk-button-primary wk-button-full')).sendKeys(webdriver.Key.ENTER)
	.then(getTitle);

driver.wait(webdriver.until.elementLocated({ xpath: '//*[@id="body"]/ui-view/div[2]/ng-transclude/ui-view/div/div[1]/div[1]/div/div/form/div/div/div/input'}));
driver.findElement(webdriver.By.name('searchInputElement')).sendKeys('test')
	.then(function(){
		console.log('Running search..');
		return driver.findElement(webdriver.By.className('wk-icon-search')).click(); 
	});
driver.wait(webdriver.until.elementLocated(webdriver.By.className('document-action favorite-star popover-target ng-binding ng-scope')))
	.then(goBack)
	.then(driver.wait(webdriver.until.titleIs('CCH AnswerConnect'), 1000))
driver.findElement(webdriver.By.css('.home-page-box'));
driver.quit();