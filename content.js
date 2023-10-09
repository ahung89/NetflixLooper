let MILLIS_IN_TEN_SEC = 1000 * 10;

console.log("in content.js now WUZGOOD")

// let video = document.querySelector('video');
// let end = video.currentTime;
// let start = end - 10;

// video.currentTime = start;

let videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
let end = videoPlayer.getCurrentTime() + MILLIS_IN_TEN_SEC;
let start = end - MILLIS_IN_TEN_SEC;

videoPlayer.seek(start);


video.addEventListener('timeupdate', function() {
    if (video.currentTime >= end) {
        video.currentTime = start;
    }
});

chrome.storage.local.get(['loops'], function(result) {
    let loops = result.loops || [];
    loops.push({start: start, end: end});
    chrome.storage.local.set({loops: loops});

    // Return the new loop details
    return {start: start, end: end};
});

"Content script ran!";