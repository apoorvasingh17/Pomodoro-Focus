function writeTimeLeft(val) {
  document.getElementById('timeLeft').innerText = val;
}
var myTime = chrome.extension.getBackgroundPage().getTimeLeft();
console.log(myTime);
var decTimer = setInterval(function () {
  checkTimeout();
  document.getElementById('timeLeft').innerText = myTime +" seconds left.";
  if(myTime==0){
    clearInterval(decTimer);
    return;
  }
  myTime--;
}, 1000);
function checkTimeout() {
  if(myTime==0){
    document.getElementById("startTimer").style.display = 'block';
    document.getElementById("timeLeft").style.display = 'none';
  }
  else if (myTime != 0){
    document.getElementById("startTimer").style.display = 'none';
    document.getElementById("timeLeft").style.display = 'block';
  }
}
document.addEventListener('DOMContentLoaded',
  function () {
    // console.log(window.location);
    document.getElementById('startTimer').addEventListener("click", function(){//hide this button when timer has started 
      chrome.extension.getBackgroundPage().startTimer();
      myTime = chrome.extension.getBackgroundPage().getTimeLeft();
      checkTimeout();
    });

    //start timer here to show it deducting every second; init time can be fetched from  chrome.extension.getBackgroundPage().getTimeLeft()
    // Initialize things
    if (localStorage["enabled"] !== "false") {
      document.getElementById('enabled').checked = true;
    } else {
      var checked = !document.getElementById('enabled').checked;
      document.getElementById('blacklist').disabled = checked;
    }

    var bl = localStorage["blacklist"];
    document.getElementById('blacklist').value = bl ? bl : "";

    // And attach signals
    document.getElementById('blacklist').addEventListener('keyup',
      function () {
        var blacklist = document.getElementById('blacklist').value;
        localStorage["blacklist"] = blacklist;
      });

    document.getElementById('enabled').addEventListener('click',
      function() {
        var checked = document.getElementById('enabled').checked;
        document.getElementById('blacklist').disabled = !checked;
        localStorage["enabled"] = checked;
      });
  });
