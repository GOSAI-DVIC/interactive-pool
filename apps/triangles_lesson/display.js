import {
    testShow
} from "./states/test.js"
import {
    Balls
} from "./components/balls.js";
import {
    startShow
} from "./states/start.js"
import {
    curtainShow
} from "./states/curtain.js";
import {
    mediatriceLessonSegmentShow
} from "./states/mediatriceLessonSegment.js"
import {
    mediatriceLessonTriangleShow
} from "./states/mediatriceLessonTriangle.js"
import {
    mediatricePracticeSegmentShow
} from "./states/mediatricePracticeSegment.js"
import {
    mediatricePracticeTriangleShow
} from "./states/mediatricePracticeTriangle.js"
import {
    hauteurLessonInsideShow
} from "./states/hauteurLessonInside.js"
import {
    hauteurLessonOutsideShow
} from "./states/hauteurLessonOutside.js"
import {
    hauteurPracticeBShow
} from "./states/hauteurPracticeB.js"
import {
    hauteurPracticeCShow
} from "./states/hauteurPracticeC.js"
import {
    rappelTrianglesIsocelesEquilaterauxShow
} from "./states/rappelTrianglesIsocelesEquilateraux.js"
import {
    doMediatriceOnIsoceleShow
} from "./states/doMediatriceOnIsocele.js"
import {
    doHauteurOnIsoceleShow
} from "./states/doHauteurOnIsocele.js"
import {
    mediatriceHauteurEquilateralShow
} from "./states/mediatriceHauteurEquilateral.js"
import {
    recapitulatifShow
} from "./states/recapitulatif.js"
import {
    challengeIntroductionShow
} from "./states/challengeIntroduction.js"

let audio
let bgAudio = new Audio("./platform/home/apps/triangles_lesson/assets/bg_music.wav");
let balls = new Balls();
let refreshCircleTrigger = 0;
let audioEnded = false;
// let bgAudioFirstTrigger = true;

export const triangles_lesson = new p5((sketch) => {
    sketch.name = "triangles_lesson";
    sketch.activated = false;

    let f;
    let state = "start";

    sketch.preload = () => {
        f = loadFont("/gosai/pool/core/server/assets/FallingSky-JKwK.otf");
    };

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch
            .createCanvas(width, height, sketch.WEBGL)
            .position(0, 0);

        socket.on("applications_balls_positions", (data) => balls.update_data(data));
        sketch.emit = (name, data = undefined) => {
            if (data == undefined) socket.emit(name);
            else socket.emit(name, data);
        };
        sketch.activated = true;
    };

    sketch.resume = () => {};
    sketch.pause = () => {};
    sketch.update = () => {
        balls.update();
    };

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
        sketch.fill(0);

        sketch.push();

        sketch.translate(width, height)
        sketch.rotate(sketch.PI);

        //debug: show table boundaries
        sketch.stroke(255)
        sketch.line(0, 0, sketch.width, 0)
        sketch.line(0, 0, 0, sketch.height)
        sketch.line(0, sketch.height, sketch.width, sketch.height)
        sketch.line(sketch.width, 0, sketch.width, sketch.height)

        // Background Audio
        bgAudio.loop = true;

        // state machine
        switch (state) {
            case "test":
                state = testShow(sketch, f, balls);
                break;
            case "start":
                state = startShow(sketch, f, balls);
                bgAudio.volume = 0.2;
                bgAudio.play();
                break;
            case "introduction":
                audioSlowlyDecreaseToPause();
                state = curtainShow(sketch, f, true);
                break;
            case "mediatriceLessonSegment":
                state = mediatriceLessonSegmentShow(sketch, f);
                break;
            case "mediatriceLessonTriangle":
                state = mediatriceLessonTriangleShow(sketch, f);
                break;
            case "mediatricePracticeSegment":
                state = mediatricePracticeSegmentShow(sketch, f, balls);
                break;
            case "mediatricePracticeTriangle":
                state = mediatricePracticeTriangleShow(sketch, f, balls);
                break;
            case "hauteurLessonInside":
                state = hauteurLessonInsideShow(sketch, f);
                break;
            case "hauteurLessonOutside":
                state = hauteurLessonOutsideShow(sketch, f, balls);
                break;
            case "hauteurPracticeB":
                state = hauteurPracticeBShow(sketch, f, balls);
                break;
            case "hauteurPracticeC":
                state = hauteurPracticeCShow(sketch, f, balls);
                break;
            case "rappelTrianglesIsocelesEquilateraux":
                state = rappelTrianglesIsocelesEquilaterauxShow(sketch, f, balls);
                break;
            case "doMediatriceOnIsocele":
                state = doMediatriceOnIsoceleShow(sketch, f, balls);
                break;
            case "doHauteurOnIsocele":
                state = doHauteurOnIsoceleShow(sketch, f, balls);
                break;
            case "mediatriceHauteurEquilateral":
                state = mediatriceHauteurEquilateralShow(sketch, f);
                break;
            case "recapitulatif":
                state = recapitulatifShow(sketch, f);
                break;
            case "challengeIntroduction":
                state = challengeIntroductionShow(sketch, f, balls);
                break;
            case "countdown":
                state = countdownShow(sketch, f);
                break;
            case "challenge":
                state = challengeShow(sketch, f, balls);
                break;
            case "challengeResult":
                state = challengeResultShow(sketch, f, balls);
                break;
            case "outro":
                state = curtainShow(sketch, f, false);
                bgAudio.play();
                break;
            case "end":
                audioSlowlyDecreaseToPause();
            default:
                break;
        }
        sketch.pop();
    };
});

function audioSlowlyDecreaseToPause() {
    if (bgAudio.volume > 0.01) {
        bgAudio.volume -= 0.005;
    } else {
        bgAudio.pause();
    }
}

export let navBar = {
    showPlayPauseButton: function (sketch, pause) {
        sketch.push()
        sketch.translate(145, 900)

        sketch.stroke(255)
        sketch.strokeWeight(3)

        if (pause == true) {
            sketch.noFill()
            sketch.triangle(2, 0, 2, 30, 32, 15)
            sketch.fill(255, 200, 0);
        } else {
            sketch.fill(255)
            sketch.rect(0, 0, 11, 30)
            sketch.rect(19, 0, 11, 30)
            sketch.noFill()
        }
        sketch.circle(15, 15, 70)
        sketch.pop()
    },
    showRepeatButton: function (sketch, repeat) {
        sketch.push()
        sketch.translate(275, 900)
        sketch.scale(-1, 1)

        sketch.stroke(255)
        sketch.strokeWeight(3)
        sketch.noFill()
        sketch.circle(15, 15, 70)

        if (repeat == true && refreshCircleTrigger >= 0) {
            sketch.fill(255, 200, 0); // yellow
            sketch.circle(15, 15, 70 + refreshCircleTrigger)
            refreshCircleTrigger += 1
        }
        if (refreshCircleTrigger > 50) {
            refreshCircleTrigger = -1
        }
        if (repeat == false) {
            refreshCircleTrigger = 0
        }
        sketch.noFill()
        sketch.arc(15, 15, 33, 33, 0, radians(295))

        sketch.strokeWeight(0)
        sketch.fill(255)
        sketch.push()
        sketch.translate(15, 10)
        sketch.rotate(radians(-15))
        sketch.triangle(0, 0, 15, -15, 15, 0)
        sketch.pop()
        sketch.pop()
    },
    checkPauseButtons: function () {
        for (let i = 0; i < balls.balls.length; i++) {
            if (balls.balls[i].x < (width - 125) && balls.balls[i].x > (width - 195) && balls.balls[i].y < (height - 890) && balls.balls[i].y > (height - 960)) {
                return true
            }
        }
        return false
    },
    checkRepeatButtons: function () {
        for (let i = 0; i < balls.balls.length; i++) {
            if (balls.balls[i].x < (width - 220) && balls.balls[i].x > (width - 270) && balls.balls[i].y < (height - 890) && balls.balls[i].y > (height - 960)) {
                return true
            }
        }
        return false
    }
}

export let audioMedia = {
    playSound: function (sound) {
        audio = new Audio(sound);
        audio.play();
    },
    pauseSound: function () {
        audio.pause();
    },
    stopSound: function () {
        audio.pause();
        audio.currentTime = 0;
    },
    resumeSound: function () {
        audio.play();
    },
    restartSound: function () {
        audio.currentTime = 0;
        audio.play();
    },
    checkIfAudioEnded: function () {
        audio.onended = function () {
            audioEnded = true;
        }
        if (audioEnded == true) {
            audioEnded = false;
            return true
        }
        return false
    },
    getAudioTime: function () {
        return audio.currentTime
    }
}