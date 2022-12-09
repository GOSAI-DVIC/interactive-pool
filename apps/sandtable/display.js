import {Crab} from "./components/crab.js"
import {Bubble} from "./components/boule.js"
// import {Ball} from "./components/ball.js"
// import {Grain} from "./components/grain.js"
// import {Can} from "./components/can.js"

export const sandtable = new p5(sketch => {
    sketch.name = "sandtable"
    sketch.activated = false

    let crabs = [];
    let balls = [];
    let deaths = [];
    let max_ball = 20;
    let ball_nb;
    let previous_ball_nb = max_ball;

    //let count = 0;
    //let delta = millis();


    sketch.preload = () => {
        //sable = loadImage('./platform/home/apps/sandtable/components/sable.jpg');
    }

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch.createCanvas(width, height, sketch.WEBGL).position(0, 0);

        for(let i=0; i<max_ball; i++)
        {
            let b=new Bubble(-500,- 500)
            balls.push(b)
        }

        socket.on("ball", data => sketch.update_data(data));
        sketch.activated = true
        
        
        for (var a = 0; a<6; a++) {
            let x = 0;
            let y = random(height);
            let r = random(40, 60);
            let state = true;
            let crab = new Crab(x, y, r,state);
            crabs.push(crab);
           
        }
        

    }

    sketch.update_data = (data) => {
        if (data == undefined)  return;
        ball_nb = 0

        for (let b of data){
            if (ball_nb >= max_ball) break
                balls[ball_nb].x = b[0]
                balls[ball_nb].y = b[1]
                ball_nb += 1
        }
        for (let i = ball_nb; i< previous_ball_nb; i++)
        {
            balls[i].x = -500;
            balls[i].y = -500;
        }
        previous_ball_nb = ball_nb
    }

    sketch.resume = () => {};
    sketch.pause  = () => {};
    sketch.update = () => {
        sketch.update_data();
    };

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
        //sketch.fill(221,186,138);
        //sketch.rect(0,0,1920,1080);
        sketch.push();
        sketch.push();
        sketch.pop();

        for (let d of deaths) {
            d.show(sketch);
        }
        
        for (let ball of balls) {
            ball.show(sketch);
        }
    

        for (var i = 0; i<crabs.length; i++) {

            for (let ball of balls) {
                if (dist(ball.x, ball.y, crabs[i].x, crabs[i].y)<(crabs[i].getR()/2) + (ball.getR()/2)) {
                    
                    crabs[i].stateLife = false;
                    crabs[i].deathTime = millis();
                }  
            } 
            //if(i==1){
            //    console.log(crabs[i].xspeed1);
            //    console.log(crabs[i].stateLife);
            //    
            //}   
            if(crabs[i].stateLife == false && millis()-crabs[i].deathTime >= 3000){
                crabs[i].x = 0;
                crabs[i].y = random(height);
                crabs[i].stateLife = true;
                crabs[i].alpha = 255;
            }
        } 
        
        //if(count >= 6){
        //    for (var i = 0; i<crabs.length; i++){
        //        crabs[i].stateLife = true;
        //    }
        //    count = 0;
        //}
        
        for(let i=0; i<crabs.length; i++){
            crabs[i].move();
            crabs[i].show(sketch);
        }
        
        
        sketch.pop();
    };
});