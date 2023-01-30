import {Balls} from "./components/balls.js";
import {startShow} from "./states/start.js"
import {introductionShow} from "./states/introduction.js";
import {mediatriceLessonSegmentShow} from "./states/mediatriceLessonSegment.js"
import {mediatriceLessonTriangleShow} from "./states/mediatriceLessonTriangle.js"
import {mediatricePracticeShow} from "./states/mediatricePractice.js"

let audio
let balls = new Balls();
let refreshCircleTrigger = 0;
let audioEnded = false;

export const triangles_lesson = new p5((sketch) => {
    sketch.name = "triangles_lesson";
    sketch.activated = false;

    
    let f;
    // let fps = "30.00";
    let state="start" //"start"

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

        sketch.translate(width,height)
        sketch.rotate(sketch.PI);
    
        //debug: show table boundaries
        sketch.stroke(255)
        sketch.line(0, 0, sketch.width, 0)
        sketch.line(0, 0, 0, sketch.height)
        sketch.line(0, sketch.height, sketch.width, sketch.height)
        sketch.line(sketch.width, 0, sketch.width, sketch.height)

        // state machine
        
        switch(state) {
            case "start":
                state = startShow(sketch, f, balls);
                break;
            case "introduction":
                state = introductionShow(sketch, f);
                break;
            case "mediatriceLessonSegment":
                state = mediatriceLessonSegmentShow(sketch, f);
                break;
            case "mediatriceLessonTriangle":
                state = mediatriceLessonTriangleShow(sketch, f);
                break;
            case "mediatricePractice":
                state = mediatricePracticeShow(sketch, f, balls);
                break;
            default:
                break;
        }
        sketch.pop();
    };
});

export let navBar = {
    showPlayPauseButton: function(sketch, pause){
        sketch.push()
        sketch.translate(115, 80)

        sketch.stroke(255)
        sketch.strokeWeight(3)
        
        if(pause == true)
        {
            sketch.noFill()
            sketch.triangle(2, 0, 2, 30, 32, 15)
            sketch.fill(255, 200, 0);
        }
        else
        {
            sketch.fill(255)
            sketch.rect(0, 0, 11, 30)
            sketch.rect(19, 0, 11, 30)
            sketch.noFill()
        }
        sketch.circle(15,15,70)
        sketch.pop()
    },
    showRepeatButton: function(sketch, repeat){
        sketch.push()
        sketch.translate(245, 80)
        sketch.scale(-1, 1)

        sketch.stroke(255)
        sketch.strokeWeight(3)
        sketch.noFill()
        sketch.circle(15,15,70)

        if(repeat == true && refreshCircleTrigger >= 0) {
            sketch.fill(255, 200, 0);
            sketch.circle(15,15,70+refreshCircleTrigger)
            refreshCircleTrigger += 1
        }
        if (refreshCircleTrigger > 50) {
            refreshCircleTrigger = -1
        }
        if(repeat == false) {
            refreshCircleTrigger = 0
        }
        sketch.noFill()
        sketch.arc(15,15,33,33,0, radians(295))
        
        sketch.strokeWeight(0)
        sketch.fill(255)
        sketch.push()
        sketch.translate(15,10)
        sketch.rotate(radians(-15))
        sketch.triangle(0,0, 15,-15, 15, 0)
        sketch.pop()
        sketch.pop()
    },
    checkPauseButtons: function(){
        for (let i = 0; i < balls.balls.length; i++) {
            if (balls.balls[i].x < (width - 115) && balls.balls[i].x > (width- 185) && balls.balls[i].y < (height - 70) && balls.balls[i].y > (height-140)) {
                    return true
            }
        }
        return false
    },
    checkRepeatButtons: function(){
        for (let i = 0; i < balls.balls.length; i++) {
            if (balls.balls[i].x < (width - 205) && balls.balls[i].x > (width- 255) && balls.balls[i].y < (height - 70) && balls.balls[i].y > (height-140)) {
                return true    
            }
        }
        return false
    }
}

export let audioMedia = {
    playSound: function(sound) {
        audio = new Audio(sound);
        audio.play();
    },
    pauseSound: function() {
        audio.pause();
    },
    stopSound: function() {
        audio.pause();
        audio.currentTime = 0;
    },
    resumeSound: function() {
        audio.play();
    },
    restartSound: function() {
        audio.currentTime = 0;
        audio.play();
    },
    checkIfAudioEnded: function() {
        audio.onended = function() {
            audioEnded = true;
        }
        if (audioEnded == true) {
            audioEnded = false;
            return true
        }
    }
}
