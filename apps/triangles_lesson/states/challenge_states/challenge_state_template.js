import {
    audioMedia,
    navBar
} from "../../display.js";
import {
    addPoint
} from "../challenge.js";
import {
    Ball
} from "../components/ball.js";
import{
    Triangle
} from "../components/triangle.js";

let goDefaultNextStep = false;
let firstRun = true;

let pause = false;
let repeat = false;
let pauseTrigger = false;
let repeatTrigger = false;

export function __challengeState__Show(sketch, f, balls, round) {
    if (firstRun) {
        onEnter()
    }
    showAudioButtons(sketch)

    // WRITE CHALLENGE CODE HERE


    if (goDefaultNextStep == true) {
        onExit()
        return "__nextChallengeState__"
    }
    return "__challengeState__"
}

function onEnter() {
    firstRun = false;
    // audioMedia.playSound("./platform/home/apps/triangles_lesson/assets/challenge/29_defi_trace_isocele.wav")
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