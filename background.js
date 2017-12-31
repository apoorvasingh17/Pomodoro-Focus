console.log("bgscript init");
var blockState = false;
var expiryTime = 3000;
var timeleft = 0;
function startTimer() {
    console.log('timerStart');
    blockState = true;
    timeleft = expiryTime/1000;
    var timerDeduct = setInterval(function () {
        timeleft--;
    }, 1000);
    setTimeout(function () {
        blockState = false;
        console.log('timerExp');
        clearInterval(timeleft);
    }, expiryTime);
}
function forceEndSession() {
    blockState = false;  
    clearInterval(timeleft);
}
function getTimeLeft(){
    return timeleft;
}
chrome.webRequest.onBeforeRequest.addListener(
    function () {
        console.log('called',blockState);
        return {
            cancel: (blockState)
        };
    }, {
        urls: ["*://*.facebook.com/*", "*://*.youtube.com/*",  "*://*.instagram.com/*"]//edit here to load urls from localstorage as an array of strings like "*://*.facebook.*/*" also refresh background script whenever list is updated
    }, ["blocking"]
);
