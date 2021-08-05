// import { AppPage } from './app.po';
// import { browser, by, element } from 'protractor';
// describe('workspace-project App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getParagraphText()).toEqual('HOME');
//   });
//   // it('should display 15 FC button', () => {
//   //   page.navigateTo();
//   //   expect(page.get15FCButton().getText()).toEqual('15th FC Grants');
//   // });
//   it('route 15fc page', () => {
//     page.get15FCButton().click();
//     browser.sleep(2000)
//   });
//   it('route login page', () => {
//     page.getLogin().click();
//     browser.sleep(2000)

//   });
//   it('route Ulb login page', () => {
//     page.getUlbLogin().click();
//     element.all(by.css('#mat-input-0')).sendKeys('802811');
//     element.all(by.css('#mat-input-1')).sendKeys('ulb@123');
//     browser.sleep(3000);
//     element.all(by.css('.login-btn')).click();
//     browser.sleep(2000);
//   });
//   it('route Ulb overview page', () => {
//     page.getUlbPage().click();
//     browser.sleep(5000);
//   });
// });
