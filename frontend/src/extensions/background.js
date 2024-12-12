chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "block") {
      chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          return { cancel: true };
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
      );
    } else if (request.command === "unblock") {
      chrome.webRequest.onBeforeRequest.removeListener(
        function(details) {
          return { cancel: true };
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
      );
    }
  });
  