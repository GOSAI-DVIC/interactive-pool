// let goPreviousStep = false; 
// let pause = false; 
let goDefaultNextStep = false;
let firstRun= true;

export function __state__Show(sketch, f) {
    if(firstRun) {onEnter()}
    
    //WRITE YOUR CODE HERE

    if (goDefaultNextStep == true) {
        onExit()
        return "__nextState__"
    }
    return "__state__"
}

function onEnter() {
    firstRun = false;
}

function onExit() {
    firstRun = true;
    goDefaultNextStep = false;
}