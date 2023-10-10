chrome.storage.local.get('loopTime', function(result) {
    console.log('loopTime value currently is ' + result.loopTime);
    e = new CustomEvent("addLoop", {
        detail: {
            loopTime: result.loopTime
        }
    })
    document.dispatchEvent(e)
});

if (!document.loopAddedRegistered) {
    document.addEventListener('loopAdded', function(e) {
        let startTime = e.detail.startTime;
        console.log("RESPONDING TO THE loopAdded EVENT! START TIME IS " + startTime)
    
        // Send this data back to the extension.
        chrome.runtime.sendMessage({ type: 'loopAdded', startTime: startTime });
    });
    document.loopAddedRegistered = true;
}