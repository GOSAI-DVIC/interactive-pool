import {Ball} from "../components/ball.js"
import {Triangle} from "../components/triangle.js"

let goDefaultNextStep = false;
let firstRun= true;

var audio_def_mediatrice = new Audio("./platform/home/apps/triangles_lesson/assets/1_def_mediatrices_triangle.mp3");

audio_def_mediatrice.onended = function() {
    goDefaultNextStep = true;
};

export function mediatriceLessonTriangleShow(sketch, f) {
    if(firstRun == 0) {onEnter()}

    //DRAWING SETUP
    sketch.stroke(255);
    sketch.fill(255);
    sketch.textFont(f, 48);

    sketch.text("Mediatrice - définition :",425, 85); 

    //Drawing the mediatrice
    // draw_triangle(sketch, f)
    // draw_mediatrice(sketch, f)
    draw_triangle_with_mediatrice(sketch, f)


    if (goDefaultNextStep == true) {
        onExit()
        return "mediatricePractice"
    }
    return "mediatriceLessonTriangle"
}

function onEnter() {
    audio_def_mediatrice.play();
    firstRun = false;
}

function onExit() {
    firstRun = true;
    goDefaultNextStep = false;
}

function draw_triangle_with_mediatrice(sketch, f) {
    let b1 = new Ball(width/3-80, 3*height/4+70)
    let b2 = new Ball(2*width/3-40, 3*height/4)
    let b3 = new Ball(width/2+80, height/4)
    let t = new Triangle(b1, b2, b3)
    t.show(sketch, f)
    t.showPerpendicularBisector(sketch, f)
    // t.showCircumCircle(sketch, f)

}

// function draw_triangle(sketch, f) {
//     sketch.textFont(f, 60);
//     sketch.stroke(255);
//     sketch.strokeWeight(3);
//     sketch.noFill();
//     sketch.triangle(width/3, 3*height/4, 2*width/3, 3*height/4, width/2, height/4)
//     // sketch.line(width/3, height/2, 2*width/3, height/2)
//     // sketch.line(2*width/3, height/2+18, 2*width/3, height/2-18)
//     // sketch.line(width/3, height/2+18, width/3, height/2-18)
//     sketch.fill(255);
//     sketch.text("A", width/3-45-5, (3*height/4)+8)
//     sketch.text("B", 2*width/3+15, (3*height/4)+8)
//     sketch.text("C", width/2-15, height/4-15)
// }

// function draw_mediatrice(sketch, f){
//     sketch.textFont(f, 60);
//     sketch.stroke(255,0,255);
//     sketch.fill(255,0,255);
    
//     sketch.line(width/2, 5*height/8, width/2, 7*height/8)
//     // sketch.line(7*width/12, height/2 + 20, 7*width/12, height/2-20)
//     sketch.line(7*width/12-8, (3*height/4) + 20, 7*width/12-8, (3*height/4)-20)
//     sketch.line(7*width/12+8, (3*height/4) + 20, 7*width/12+8, (3*height/4)-20)

//     // sketch.line(5*width/12, height/2 + 20, 5*width/12, height/2-20)
//     sketch.line(5*width/12-8, (3*height/4) + 20, 5*width/12-8, (3*height/4)-20)
//     sketch.line(5*width/12+8, (3*height/4) + 20, 5*width/12+8, (3*height/4)-20)

//     //right angle symbol
//     sketch.line(width/2, (3*height/4) - 30, width/2 + 30, (3*height/4) - 30)
//     sketch.line(width/2 + 30, (3*height/4) - 30, width/2 + 30, (3*height/4))


// }

function activity_1(sketch,f){
        //DRAWING SETUP
        sketch.stroke(255);
        sketch.fill(255);
        sketch.textFont(f);
        sketch.textSize(60)


        sketch.line(width/3, height/2, 2*width/3, height/2)
        sketch.line(2*width/3, height/2+18, 2*width/3, height/2-18)
        sketch.line(width/3, height/2+18, width/3, height/2-18)
        sketch.text("A", width/3-45-5, height/2+8)
        sketch.text("B", 2*width/3+15, height/2+8)

        sketch.stroke(255,0,0);
        sketch.line(this.balls[0].x, this.balls[0].y, this.balls[1].x, this.balls[1].y)

        //Suite TODO:
        // if (médiatrice):
        //     //Exercice réussi : mettre un booleean à true ou incrémenter qqc
        //     //Afficher un message de réussite
        //     //Afficher la médiatrice dans en vert
        //     Compteur de qq instant pour pas que ça passe instantanément à l'exercice suivant direct
    }