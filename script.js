console.log("Content script running!");

let MILLIS_IN_TEN_SEC = 1000 * 10;

let videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
let playerId = videoPlayer.getAllPlayerSessionIds()[0];
let player = videoPlayer.getVideoPlayerBySessionId(playerId);

let start = videoPlayer.getCurrentTimeBySessionId(playerId);
player.seek(start);

chrome.storage.local.get(['loops'], function(result) {
    let loops = result.loops || [];
    loops.push({start: start, end: end});
    chrome.storage.local.set({loops: loops});

    // Return the new loop details
    return {start: start, end: end};
});

let func = setInterval(function() {
    player.seek(start);
}, MILLIS_IN_TEN_SEC);

"Content script ran!";