import {Balls} from "./components/balls.js"

export const triangles = new p5(sketch => {
    sketch.name = "triangles"
    sketch.activated = false

    let balls = new Balls();
    let fps = "30.00";
    let calibration_file = sketch.loadJSON('./core/calibration/calibration_data.json', data => {
        // let x_offset = data.pool_coords[0]
        // let y_offset = 100
        // balls.button_coords = [
        //     [data.pool_coords[0] + 100]
        // ]
    });

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch.createCanvas(width, height).position(0, 0);
        socket.on("ball", data => balls.update_data(data));
        // socket.on("cue", (data) => l.update_data(data));
        socket.on("fps",  data => fps = data);
        sketch.emit = (name, data = undefined) =>  {
            if (data == undefined) socket.emit(name);
            else socket.emit(name, data)
        }
        sketch.activated = true
    };

    sketch.resume = () => {};
    sketch.pause  = () => {};
    sketch.update = () => { balls.update()};

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
        
        balls.show(sketch);
                
        sketch.textSize(32);
        sketch.fill(255, 255, 255);
        sketch.text(`DETECTION: ${fps} FPS`, 50, 50);
    };
});