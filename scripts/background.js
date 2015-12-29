var settings = {
  host: 'http://ulmic.ru/api/'
};

var error_response = function(request, exception) {
  chrome.browserAction.setBadgeText({text: 'ERR'});
}

function api_url(object, func) {
  return settings.host + object + '?' + func;
}

function updateNewsCount() {
  $.ajax({
    dataType: "text",
    type: "GET",
    url: api_url('news', 'data=id'),
    success: function(data) {
      array = $.parseJSON(data);
      chrome.storage.sync.get('news_id', function(obj) {
        if(obj['news_id'] == undefined)
          obj['news_id'] = "[]";
        var news = $.parseJSON(obj['news_id']);
        chrome.browserAction.setBadgeText({
          text: (array.length - news.length).toString()
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
    url: api_url('news', 'data=id'),
    success: function(data) {
      chrome.storage.sync.set({ 'news_id': data }, function(){})
      updateNewsCount();
    },
    error: error_response
  });
});
