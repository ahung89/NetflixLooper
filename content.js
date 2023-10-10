console.log("Content script running!");

let init = setInterval(() => {
    if (netflix != undefined) {
        clearInterval(init);
        document.addEventListener('addLoop', (e) => {
            console.log("adding loop - loop time is " + e.detail.loopTime)
            let loopTime = e.detail.loopTime;
            if (document.func) clearInterval(document.func);

            let MILLIS_IN_SEC = 1000;

            let videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
            let playerId = videoPlayer.getAllPlayerSessionIds()[0];
            let player = videoPlayer.getVideoPlayerBySessionId(playerId);
            
            let start = videoPlayer.getCurrentTimeBySessionId(playerId) - MILLIS_IN_SEC * loopTime;
            player.seek(start);
            
            document.func = setInterval(function() {
                console.log("rewinding")
                console.log(new Date().getTime() / 1000);
                player.seek(start);
            }, MILLIS_IN_SEC * loopTime);
        })
        document.addEventListener('clearLoop', () => {
            if (document.func) {
                clearInterval(document.func);
                console.log("loop cleared")
            }
        })
    }
})
