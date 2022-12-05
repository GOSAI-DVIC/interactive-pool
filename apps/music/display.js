import {
    Balls
} from "./components/balls.js";

export const music = new p5((sketch) => {
    sketch.name = "music";
    sketch.activated = false;

    let balls = new Balls();
    let fps = "30.00";
    let f;

    var pianoA4 = new Audio("./platform/home/apps/music/components/A4_piano.mp3");
    var pianoC4 = new Audio("./platform/home/apps/music/components/C4_piano.mp3");

    sketch.preload = () => {
        f = loadFont("/gosai/pool/core/server/assets/FallingSky-JKwK.otf")
    };
    
    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch
        .createCanvas(width, height, sketch.WEBGL)
        .position(0, 0);
        sketch.activated = true;
        
        socket.on("ball", (data) => balls.update_data(data));
        socket.on("fps", (data) => (fps = data));
        // sketch.emit = (name, data = undefined) => {
            //     if (data == undefined) socket.emit(name);
            //     else socket.emit(name, data);
            // };
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
        balls.show(sketch, pianoA4, pianoC4);
         
        sketch.push();
        sketch.textFont(f);
        sketch.textSize(32);
        sketch.fill(255, 255, 255);
        sketch.text(`Ball Detection: ${fps} FPS`, -150, -150);
        sketch.pop();
    };
});
