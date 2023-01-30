let goDefaultNextStep = false;
let firstRun= true;

var audio_def_mediatrice = new Audio("./platform/home/apps/triangles_lesson/assets/1_mediatrices_segment_def.wav");

audio_def_mediatrice.onended = function() {
    goDefaultNextStep = true;
};

export function mediatriceLessonSegmentShow(sketch, f) {
    if(firstRun) {onEnter()}

    //DRAWING SETUP
    sketch.stroke(255);
    sketch.fill(255);
    sketch.textFont(f, 48);

    sketch.text("Mediatrice - définition :", 425, 85); 

    //Drawing the mediatrice
    draw_segment(sketch, f)
    draw_mediatrice(sketch, f)

    if (goDefaultNextStep == true) {
        onExit()
        return "mediatriceLessonTriangle"
    }
    return "mediatriceLessonSegment"
}

function onEnter() {
    audio_def_mediatrice.play();
    firstRun = false;
}

function onExit() {
    firstRun = true;
    goDefaultNextStep = false;
}

function draw_segment(sketch, f) {
    sketch.textFont(f, 60);
    sketch.stroke(255);
    sketch.strokeWeight(5);
    sketch.line(width/3, height/2, 2*width/3, height/2)
    sketch.line(2*width/3, height/2+18, 2*width/3, height/2-18)
    sketch.line(width/3, height/2+18, width/3, height/2-18)
    sketch.text("A", width/3-45-5, height/2+8)
    sketch.text("B", 2*width/3+15, height/2+8)
}

function draw_mediatrice(sketch, f){
    sketch.textFont(f, 60);
    sketch.stroke(255,0,255);
    sketch.fill(255,0,255);
    sketch.line(width/2, height/8, width/2, 7*height/8)
    sketch.text("(D)", width/2+15, 1.5*height/8)

    // sketch.line(7*width/12, height/2 + 20, 7*width/12, height/2-20)
    sketch.line(7*width/12-8, height/2 + 20, 7*width/12-8, height/2-20)
    sketch.line(7*width/12+8, height/2 + 20, 7*width/12+8, height/2-20)

    // sketch.line(5*width/12, height/2 + 20, 5*width/12, height/2-20)
    sketch.line(5*width/12-8, height/2 + 20, 5*width/12-8, height/2-20)
    sketch.line(5*width/12+8, height/2 + 20, 5*width/12+8, height/2-20)

    //right angle symbol
    sketch.line(width/2, height/2 - 30, width/2 + 30, height/2 - 30)
    sketch.line(width/2 + 30, height/2 - 30, width/2 + 30, height/2)
}
