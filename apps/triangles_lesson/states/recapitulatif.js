import {
    audioMedia,
    navBar
} from "../display.js"
import {
    Ball
} from "../components/ball.js"
import {
    Triangle
} from "../components/triangle.js"

let goDefaultNextStep = false;
let firstRun = true;

let triangleMediatrice;
let triangleHauteur;

let showMediatricesTime = 1;
let showHauteurTime = 4;

let pause = false;
let repeat = false;
let pauseTrigger = false;
let repeatTrigger = false;

export function recapitulatifShow(sketch, f) {
    if (firstRun) {
        onEnter()
    }
    showAudioButtons(sketch)

    sketch.stroke(255)
    sketch.fill(255);
    sketch.textFont(f, 70);
    sketch.textAlign(sketch.CENTER)
    sketch.text("Récapitulatif", width / 2, 150);

    if (audioMedia.getAudioTime() > showMediatricesTime) {
        sketch.push()
        sketch.translate(-90, 100)
        sketch.scale(0.7)
        triangleMediatrice.show(sketch, f)
        triangleMediatrice.showAllMediatrice(sketch)
        sketch.pop()
    }
    if (audioMedia.getAudioTime() > showHauteurTime) {
        sketch.push()
        sketch.translate(700, 150)
        sketch.scale(0.7)
        triangleHauteur.show(sketch)
        triangleHauteur.showAllAltitudes(sketch)
        sketch.pop()
    }

    if (goDefaultNextStep == true) {
        onExit()
        return "challengeIntroduction"
    }
    return "recapitulatif"
}

function onEnter() {
    firstRun = false;
    audioMedia.playSound("./platform/home/apps/triangles_lesson/assets/24_bis_recapitulatif.wav")
    let b1 = new Ball(width / 3 - 80, 3 * height / 4 + 70)
    let b2 = new Ball(2 * width / 3 - 40, 3 * height / 4)
    let b3 = new Ball(width / 2 + 80, height / 4)
    triangleMediatrice = new Triangle(b1, b2, b3)

    b1 = new Ball(831, 666)
    b2 = new Ball(1273, 539)
    b3 = new Ball(566, 470)
    triangleHauteur = new Triangle(b1, b2, b3)
}

function onExit() {
    firstRun = true;
    goDefaultNextStep = false;
    audioMedia.stopSound()
}

function showAudioButtons(sketch) {
    pause = navBar.checkPauseButtons()
    repeat = navBar.checkRepeatButtons()
    navBar.showPlayPauseButton(sketch, pause)
    navBar.showRepeatButton(sketch, repeat)
    if (audioMedia.checkIfAudioEnded()) {
        goDefaultNextStep = true;
    }
    if (pause == true && pauseTrigger == false) {
        audioMedia.pauseSound()
        pauseTrigger = true;
    }
    if (pause == false && pauseTrigger == true) {
        audioMedia.resumeSound()
        pauseTrigger = false;
    }
    if (repeat == true && repeatTrigger == false) {
        audioMedia.restartSound()
        repeatTrigger = true;
    }
    if (repeat == false) {
        repeatTrigger = false;
    }
}