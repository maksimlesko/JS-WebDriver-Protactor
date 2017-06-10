//browser.ignoreSynchronization = true - to use protractor on non-angular pages ( it makes protractor not wait for Angular promises

describe('test AC application', function(){
	it ('to login to AC app and check the page title', function(){
		browser.get('http://www.answerconnect.stg.cch.com/?forcestandardlogin#/home');
		element(by.id('username')).sendKeys('ac2cl.all108@cch.com');
		element(by.model('password')).sendKeys('password');
		element(by.className('wk-button-primary wk-button-full')).click();
		
		let ptitle = 'CCH AnswerConnect';
		
		browser.getTitle().then(function(title){
			expect(ptitle).toEqual("CCH AnswerConnect");
		})
	})
	it ('to execute the main search', function(){
		element(by.model('query')).sendKeys('Minsk');

		let stext = 'Minsk';

		element(by.model('query')).getText().then(function(text){
			expect(stext).toEqual('Minsk');
		})

		element(by.model('query')).sendKeys(protractor.Key.ENTER);

		let EC = protractor.ExpectedConditions;
		browser.wait(EC.visibilityOf(element(by.className('document-action favorite-star popover-target ng-binding ng-scope'))), 5000);
		
})

	it ('to check history elements', function(){
		element(by.xpath('//*[@id="body"]/ui-view/div[2]/ng-transclude/div/csn-header/header/div/div/ul[2]/li[1]/a')).click();
		element(by.xpath('//*[@id="body"]/ui-view/div[2]/ng-transclude/div/csn-header/header/div/div/ul[2]/li[1]/csn-header-history/div/rs-recent-history/div/a')).click()
		let EC = protractor.ExpectedConditions;
		browser.wait(EC.visibilityOf(element(by.className('wk-button-group-left'))), 5000);
		element(by.linkText('Minsk')).click();

		let stext = 'Minsk';

		element(by.model('query')).getText().then(function(text){
			expect(stext).toEqual('Minsk');
		})
		browser.wait(EC.visibilityOf(element(by.className('document-action favorite-star popover-target ng-binding ng-scope'))), 5000);

		});
	it ('to return to the homepage using browser navigation button', function(){
		let EC = protractor.ExpectedConditions;
		browser.navigate().back();
		browser.wait(EC.visibilityOf(element(by.className('wk-button-group-left'))), 5000);
	})

})