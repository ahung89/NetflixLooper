document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loop').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentTab = tabs[0];  // There will be only one active tab in the current window
            
            chrome.storage.local.set({loopTime: document.getElementById('loopTime').value}, function() {
                chrome.scripting.executeScript({
                    target: {tabId: currentTab.id},
                    files: ['addLoop.js']
                });
            });
        });
    });

    document.getElementById('clearLoop').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentTab = tabs[0]; 
                chrome.scripting.executeScript({
                    target: {tabId: currentTab.id},
                    files: ['clearLoop.js']
                }, function(results) {
            });
        });
    });
    
    // chrome.storage.local.get(['loops'], function(result) {
    //     if (result.loops) {
    //         const ul = document.getElementById('savedLoops');
    //         result.loops.forEach(loop => {
    //             const li = document.createElement('li');
    //             li.textContent = `${loop.start} - ${loop.end}`;
    //             ul.appendChild(li);
    //         });
    //     }
    // });
});
