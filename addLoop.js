//console.log("adding loop. looptime be " + loopTime)
console.log("line 4");

e = new CustomEvent("addLoop", {
    detail: {
        loopTime: 10
    }
})
document.dispatchEvent(e)