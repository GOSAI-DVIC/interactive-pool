let goDefaultNextStep = false;
let firstRun= true;

var audio_mediatrice_practice_consignes = new Audio("./platform/home/apps/triangles_lesson/assets/2_mediatrice_consignes.mp3");
var audio_mediatrice_practice_aide = new Audio("./platform/home/apps/triangles_lesson/assets/3_petite_aide.mp3");
var audio_mediatrice_practice_new_consignes = new Audio("./platform/home/apps/triangles_lesson/assets/4_mediatrice_new_consignes.mp3");
var audio_mediatrice_practice_bravo = new Audio("./platform/home/apps/triangles_lesson/assets/5_Bravo.mp3");

audio_mediatrice_practice_bravo.onended = function() {
    goDefaultNextStep = true;
};

let Ax = width/2
let Ay = height/8
let Bx = width/2-100
let By = 7*height/8

export function mediatricePracticeShow(sketch, f, balls) {
    if(firstRun) { onEnter() }

    //DRAWING SETUP
    sketch.stroke(255);
    sketch.fill(255);
    sketch.textFont(f, 48);

    sketch.text("Mediatrice - Pratique :", 425, 85); 

    sketch.push()
    // sketch.translate(width/2, -height/2)
    // sketch.rotate(PI/3)
    //Drawing the mediatrice
    sketch.translate(width,height)
        sketch.rotate(sketch.PI)
    draw_segment(sketch, f)
    place_mediatrice(sketch, balls)
    sketch.pop()

    if (goDefaultNextStep == true) {
        return "mediatricePractice"
    }
    return "start"
}

function onEnter() {
    audio_mediatrice_practice_consignes.play();
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
    sketch.line(Ax, Ay, Bx, By)
    // sketch.line(2*width/3, height/2+18, 2*width/3, height/2-18)
    // sketch.line(width/3, height/2+18, width/3, height/2-18)
    sketch.text("A",Ax-45-5, Ay+8)
    sketch.text("B", Bx+15, By+8)
    sketch.circle(Ax, Ay, 10)
    sketch.circle(Bx, By, 10)
}

function place_mediatrice(sketch, balls){
    //check balls length > 2
    if(balls.length>2){
        
        sketch.stroke(255,0,0);
        sketch.line(balls[0].x, balls[0].y, balls[1].x, balls[1].y)

        //check if the mediatrice is correct
        let mAB = (By-Ay)/(Bx-Ax)
        let nAB = Ay - mAB*Ax

        let x_middle_AB = (Ax+Bx)/2
        let y_middle_AB = (Ay+By)/2
        // sketch.circle(x_middle_AB, y_middle_AB, 10)

        let mMediatrice_correct = -1/mAB
        let nMediatrice_correct = y_middle_AB - mMediatrice_correct*x_middle_AB

        //check if balls[0] and balls[1] are on the mediatrice
        
        if(Math.abs(mMediatrice_correct - (balls[1].y-balls[0].y)/(balls[1].x-balls[0].x))<0.1){
            
            //Check if balls intersect AB on the middle
            if(Math.abs((balls[1].y-balls[0].y)/(balls[1].x-balls[0].x) - (By-Ay)/(Bx-Ax))<0.1){
                sketch.text("Bravo !", 150, 250);
            }

            audio_mediatrice_practice_bravo.play();
            
            let point1_x = 300
            let point1_y = mMediatrice_correct*point1_x + nMediatrice_correct

            let point2_x = 1800
            let point2_y = mMediatrice_correct*point2_x + nMediatrice_correct
            //purple
            sketch.stroke(255,0,255);
            sketch.line(point1_x, point1_y, point2_x, point2_y)
        }
            

        // if(Math.abs(mMediatrice_correct - (balls[1].y-balls[0].y)/(balls[1].x-balls[0].x))<0.1){
        //     if(firstRun == 1) {
        //         audio_mediatrice_practice_aide.play();
        //         firstRun = 2;
        //     }
        //     sketch.stroke(0,255,0);
        //     sketch.line(balls[0].x, balls[0].y, balls[1].x, balls[1].y)
        //     // sketch.line(point1_x, point1_y, point2_x, point2_y)
        // }
        
    }

    //Suite TODO:
    // if (médiatrice):
    //     //Exercice réussi : mettre un booleean à true ou incrémenter qqc
    //     //Afficher un message de réussite
    //     //Afficher la médiatrice dans en vert
    //     Compteur de qq instant pour pas que ça passe instantanément à l'exercice suivant direct
    }