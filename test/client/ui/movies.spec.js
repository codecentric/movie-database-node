// function ChatAppPage() {
//   this.messageList = element.all(by.repeater('message in messages'));
//   this.userName = element(by.css('input'));
//   this.message = element(by.css('textarea'));
//   this.send = element(by.css('button'));
//
//   this.open = function() {
//     browser.get('http://localhost:3000');
//   };
//
//   this.setUserName = function(name) {
//     this.userName.clear();
//     this.userName.sendKeys(name);
//   };
//
//   this.sendMessage = function(message) {
//     this.message.sendKeys(message);
//     this.send.click();
//   };
// }


describe('Movies', function() {
    'use strict';
  // var page;

    beforeEach(function() {
        // page = new ChatAppPage();
        // page.open();
        browser.get('/');
    });

    it('should send a message', function() {
    //   var userName = 'Sheldon Cooper';
    //   var message = 'Bazinga!'
    //   page.setUserName(userName);
    //   page.sendMessage(message);
    //
    //   expect(page.messageList.count()).toEqual(1);
    //
    //   var messageItem = page.messageList.get(0);
    //   expect(messageItem.findElement(by.binding('message.user')).getText())
    //     .toEqual(userName);
    //   expect(messageItem.findElement(by.binding('message.message')).getText())
    //     .toEqual(message);
    });
});
