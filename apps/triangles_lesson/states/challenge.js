let goDefaultNextStep = false;
let firstRun = true;

let numberOfPoint = 0;

let timeLeft = 60; // 60 seconds
let lastSecond = 0;

let challengeState = "1TracerIsocele";
let round = true;

export function challengeShow(sketch, f) {
    if (firstRun) {
        onEnter()
    }
    sketch.push()
    sketch.translate(-300,0)
    showTimerIcon(sketch, f)
    sketch.pop()
    sketch.textFont(f, 70);
    sketch.textAlign(sketch.CENTER)
    sketch.fill(255);
    sketch.text(`Score : ${numberOfPoint}`, width / 2 + 300, 177)
    
    // challenge state machine
    switch (challengeState) {
        case "c1TracerIsocele":
            challengeState = c1TracerIsocele(sketch, f, balls, round);
            break;
        case "c2TracerHauteurB":
            challengeState = c2TracerHauteurB(sketch, f, balls, round);
            break;
        case "c3QCMmediatriceIsocele":
            challengeState = c3QCMmediatriceIsocele(sketch, f, balls, round);
            break;
        case "c4TracerMediatricesTriangle":
            challengeState = c4TracerMediatricesTriangle(sketch, f, balls, round);
            break;
        case "c5TracerEquilateral":
            challengeState = c5TracerEquilateral(sketch, f, balls, round);
            break;
        case "c6TracerMediatriceSegmentAB":
            challengeState = c6TracerMediatriceSegmentAB(sketch, f, balls, round);
            break;
        case "c7QCMhauteurEquilateral":
            challengeState = c7QCMhauteurEquilateral(sketch, f, balls, round);
            break;
        case "c8TracerHauteursTriangle":
            challengeState = c8TracerHauteursTriangle(sketch, f, balls, round);
            break;
        default:
            break;
    }

    if (goDefaultNextStep == true) {
        onExit()
        return "challengeResult"
    }
    return "challenge"
}

function onEnter() {
    firstRun = false;
    numberOfPoint = 0;
    lastSecond = millis();
    // audioMedia.playSound("./platform/home/apps/triangles_lesson/assets/8_Tres_bien_maintenant.wav")
}

function onExit() {
    firstRun = true;
    goDefaultNextStep = false;
    audioMedia.stopSound()
}

export function getNumberOfPoint() {
    return numberOfPoint;
}

export function addPoint(toAdd) {
    numberOfPoint += toAdd;
}

function showTimerIcon(sketch, f) {
    sketch.push()
    sketch.translate(width / 2 - 180, 150)
    sketch.strokeWeight(5)
    sketch.stroke(255, 255, 0)
    sketch.line(0, 0, 0, -40)
    sketch.strokeWeight(12)
    sketch.line(-15, -55, 15, -55)
    sketch.strokeWeight(5)
    sketch.circle(40, -40, 10)
    sketch.stroke(255)
    sketch.noFill()
    sketch.circle(0, 0, 100)
    sketch.pop()
    sketch.stroke(255)
    sketch.fill(255);
    sketch.textFont(f, 70);
    sketch.textAlign(sketch.CENTER)
    if (timeLeft < 10) {
        sketch.text(`0:0${timeLeft} s`, width / 2, 177);
    } else {
        sketch.text(`0:${timeLeft} s`, width / 2, 177);
    }

    if (millis() - lastSecond >= 1000) {
        timeLeft -= 1;
        lastSecond = millis();
    }

    if (timeLeft < 0) {
        goDefaultNextStep = true;
    }
}