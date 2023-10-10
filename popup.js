document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loopLast10').addEventListener('click', function() {
        console.log("line 1");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("line 2");
            let currentTab = tabs[0];  // There will be only one active tab in the current window
            console.log("line 3");
            chrome.scripting.executeScript({
                target: {tabId: currentTab.id},
                files: ['addLoop.js']
            }, function(results) {
                // const li = document.createElement('li');
                // const ul = document.getElementById('savedLoops');
                // li.textContent = results;
                // ul.appendChild(li)
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
