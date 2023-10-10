chrome.storage.local.get('loopTime', function(result) {
    console.log('loopTime value currently is ' + result.loopTime);
    e = new CustomEvent("addLoop", {
        detail: {
            loopTime: result.loopTime
        }
    })
    document.dispatchEvent(e)
});

