function writeTimeLeft(val) {
  document.getElementById('timeLeft').innerText = val;
}

var myTime = chrome.extension.getBackgroundPage().getTimeLeft();
console.log(myTime);
var decTimer = setInterval(function () {
  checkTimeout();

  var num = myTime/60;
  var n = num.toFixed(2);

  document.getElementById('timeLeft').innerText = n +" minutes left.";
  if(myTime==0){
    clearInterval(decTimer);
    return;
  }
  myTime--;
}, 1000);
function checkTimeout() {
  if(myTime==0||myTime<0){
    document.getElementById("startTimer").style.display = 'block';
    document.getElementById("timeLeft").style.display = 'none';

    var blacklist = document.getElementById('blacklist').value;
    document.getElementById('blacklist').disabled = false;
    localStorage["blacklist"] = blacklist;
  }
  else if (myTime != 0){
    document.getElementById("startTimer").style.display = 'none';
    document.getElementById("timeLeft").style.display = 'block';
    var blacklist = document.getElementById('blacklist').value;
    document.getElementById('blacklist').disabled = true;
    localStorage["blacklist"] = blacklist;

  }
}
document.addEventListener('DOMContentLoaded',
  function () {
    
    document.getElementById('startTimer').addEventListener("click", function(){

       var blacklist = document.getElementById('blacklist').value;
       document.getElementById('blacklist').disabled = true;
       localStorage["blacklist"] = blacklist;

      chrome.extension.getBackgroundPage().startTimer();
      myTime = chrome.extension.getBackgroundPage().getTimeLeft();
      checkTimeout();
    });

  
    if (localStorage["enabled"] !== "false") {
      document.getElementById('enabled').checked = true;
    } else {
      var checked = !document.getElementById('enabled').checked;
      document.getElementById('blacklist').disabled = checked;
    }

    var bl = localStorage["blacklist"];
    document.getElementById('blacklist').value = bl ? bl : "";

    
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
