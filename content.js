console.log("Content script running!");

let init = setInterval(() => {
    if (netflix != undefined) {
        clearInterval(init);
        document.addEventListener('addLoop', (e) => {
            console.log("adding loop - loop time is " + e.detail.loopTime)
            if (!e.loopTime) 
                e.loopTime = 10;
            if (document.func) clearInterval(document.func);

            let MILLIS_IN_SEC = 1000;

            let videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
            let playerId = videoPlayer.getAllPlayerSessionIds()[0];
            let player = videoPlayer.getVideoPlayerBySessionId(playerId);
            
            let start = videoPlayer.getCurrentTimeBySessionId(playerId) - MILLIS_IN_SEC * e.loopTime;
            player.seek(start);
            
            document.func = setInterval(function() {
                console.log("rewinding")
                player.seek(start);
            }, MILLIS_IN_SEC * e.loopTime);
        })
        document.addEventListener('clearLoop', () => {
            if (document.func) {
                clearInterval(document.func);
                console.log("loop cleared")
            }
        })
    }
})
