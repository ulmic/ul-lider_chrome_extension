var settings = {
  host: 'http://new.ul-lider.ru/api/'
};

var error_response = function(request, exception) {
  alert(exception);
  chrome.browserAction.setBadgeText({text: 'ERR'});
}

function api_url(object, func) {
  return settings.host + '/' + object + '/' + func;
}

function updateNewsCount() {
  $.ajax({
    dataType: "text",
    type: "GET",
    url: api_url('news', 'last_news'),
    success: function(data) {
      array = JSON.parse(data);
      chrome.storage.sync.get('last_news', function(obj) {
        var store_last_news_id = parseInt(obj['last_news']);
        var index = $.inArray(store_last_news_id, array);
        chrome.browserAction.setBadgeText({
          text: (array.length - index - 1).toString()
        });
      });
    },
    error: error_response
  });
}

updateNewsCount();
var updateNewsCountWithInterval = setInterval(updateNewsCount(), 1800000);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': "http://ul-lider.ru"}, function(tab) {});
  $.ajax({
    dataType: "text",
    type: "GET",
    url: api_url('news', 'last_news_id'),
    success: function(data) {
      chrome.storage.sync.set({ 'last_news': data.toString() }, function(){})
    },
    error: error_response
  });
});
