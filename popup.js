document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loopLast10').addEventListener('click', function() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentTab = tabs[0];  // There will be only one active tab in the current window
            chrome.scripting.executeScript({
                target: {tabId: currentTab.id},
                files: ['content.js']
            }, function(results) {
                console.log("CALLBACK BABY")
                // Assuming the content script returns the new loop details
                const newLoop = results[0].result;
                console.log("newLoop: " + newLoop);
    
                const ul = document.getElementById('savedLoops');
                const li = document.createElement('li');
                li.textContent = `${newLoop.start} - ${newLoop.end}`;
                ul.appendChild(li);
            });
        });
    });
    
    chrome.storage.local.get(['loops'], function(result) {
        if (result.loops) {
            const ul = document.getElementById('savedLoops');
            result.loops.forEach(loop => {
                const li = document.createElement('li');
                li.textContent = `${loop.start} - ${loop.end}`;
                ul.appendChild(li);
            });
        }
    });
    });
