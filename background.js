var PREFS = loadPrefs(),
BADGE_BACKGROUND_COLORS = {
  work: [192, 0, 0, 255],
  break: [0, 192, 0, 255]
}, RING = new Audio("ring.ogg"),
ringLoaded = false;

loadRingIfNecessary();

function defaultPrefs() {
  return {
    siteList: [
      'facebook.com',
      'youtube.com',
      'twitter.com',
      'tumblr.com',
      'pinterest.com',
      'myspace.com',
      'livejournal.com',
      'digg.com',
      'stumbleupon.com',
      'reddit.com',
      'kongregate.com',
      'newgrounds.com',
      'addictinggames.com',
      'hulu.com'
    ],
    durations: { // in seconds
      work: 25 * 60,
      break: 5 * 60
    },
    shouldRing: true,
    clickRestarts: false,
    whitelist: false
  }
}

function loadPrefs() {
  if(typeof localStorage['prefs'] !== 'undefined') {
    return updatePrefsFormat(JSON.parse(localStorage['prefs']));
  } else {
    return savePrefs(defaultPrefs());
  }
}
