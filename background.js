console.log("bgscript init");
var blockState = false;
var expiryTime = 1500000;
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
/*function forceEndSession() {
    blockState = false;  
    clearInterval(timeleft);
} */

function getTimeLeft(){
    return timeleft;
}
chrome.webRequest.onBeforeRequest.addListener(
    function (info) {
        var blacklist = localStorage["blacklist"].split('\n');
        console.log('called',blockState);

        for (var match in blacklist) {
            var str = blacklist[match];
            if (blockState && str !== "" && info.url.match(new RegExp(str))) {
                return {cancel: blockState};
            }
            else return {cancel: blockState};
        }

        return;


    }, 

    {
        urls: ["http://*/*", "https://*/*"]
    }, ["blocking"]
);
