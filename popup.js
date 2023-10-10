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
    
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log("message received by runtime!")
        if (message.type === 'loopAdded') {
            console.log("'loopAdded' message received by runtime!")
            let startTime = message.startTime;
            addToSavedLoops(startTime);
        }
    });

    // Fetch and display the saved loops when the popup is loaded
    //loadSavedLoops();
    let savedLoopsList = document.getElementById('savedLoops');

    // Utility function to add a loop to the saved loops list and store it
    function addToSavedLoops(startTime) {
        const li = document.createElement('li');
        li.className = 'loop-item';

        const timeSpan = document.createElement('span');
        timeSpan.innerText = `Loop starting at ${startTime}`;
        timeSpan.className = 'loop-time';
        
        const jumpButton = document.createElement('button');
        jumpButton.innerText = 'Jump to time';
        jumpButton.onclick = () => {
            // Implement functionality to jump to this loop in Netflix tab.
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => {
            // Implement functionality to delete this loop from saved list and chrome.storage.
        };

        li.appendChild(timeSpan);
        li.appendChild(jumpButton);
        li.appendChild(deleteButton);
        savedLoopsList.appendChild(li);
    }

    // Utility function to load and display the saved loops
    // function loadSavedLoops() {
    //     chrome.storage.local.get('loops', ({loops}) => {
    //         loops = loops || [];
    //         loops.forEach(loop => {
    //             const li = document.createElement('li');
    //             li.innerText = `Loop starting at ${loop.startTime}`;
    //             savedLoopsList.appendChild(li);
    //         });
    //     });
    // }
});
