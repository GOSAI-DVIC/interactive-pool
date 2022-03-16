import {Balls} from "./components/balls.js"

export const menu = new p5(sketch => {
    sketch.name = "menu"
    sketch.activated = false

    let balls = new Balls();
    let fps = "30.00";

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch.createCanvas(width, height).position(0, 0);
        socket.on("ball", data => balls.update_data(data));
        // socket.on("cue", (data) => l.update_data(data));
        socket.on("fps",  data => fps = data);
        sketch.emit = (name, data) => socket.emit(name, data);
        sketch.activated = true
    };

    sketch.resume = () => {};
    sketch.pause  = () => {};
    sketch.update = () => {};

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
        
        balls.show(sketch);
                
        sketch.textSize(32);
        sketch.fill(255, 255, 255);
        sketch.text(`DETECTION: ${fps} FPS`, 50, 50);
    };
});