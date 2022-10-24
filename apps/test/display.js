import {Balls} from "./components/balls.js"
import {ProjectionMatrix} from "/gosai/pool/platform/src/libs/projection.js"
import * as calibration_json from '/gosai/pool/core/calibration/calibration_data.json' assert {type: "json"};

let mat
var f

export const test = new p5(sketch => {
    sketch.name = "triangle"
    sketch.activated = false

    let balls = new Balls();
    let fps = "30.00";
    const calib = JSON.parse(JSON.stringify(calibration_json))
    
    sketch.preload = () => {
        f = loadFont(
            '/gosai/pool/core/server/assets/FallingSky-JKwK.otf'
        );
    }

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch.createCanvas(width, height, WEBGL).position(0, 0);
        // console.log(calib) //Object
        // console.log(calib.default.projection_matrix) //Array[3]

    mat = new ProjectionMatrix(calib.default.outpts, calib.default.screen_coords)
        mat.edit = true;

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
        mat.apply(2);
        fill(0);
        balls.show(sketch,f);

        push();
        textFont(f);
        textSize(32);
        fill(255, 255, 255);
        text(`Ball Detection: ${fps} FPS`, -150, -150);
        pop();
    };
});