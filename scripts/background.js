chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': "http://ul-lider.ru"}, function(tab) {
  });
});
