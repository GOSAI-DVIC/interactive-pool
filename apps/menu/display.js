import {Ball} from "./components/ball.js"
import {Balls} from "./components/balls.js"

export const menu = new p5(( sketch ) => {
    sketch.name = "menu"
    sketch.activated = false

    let l = [];

    sketch.set = (width, height, socket) => {

        l = new Balls()

        sketch.selfCanvas = sketch.createCanvas(width, height).position(0, 0);

        socket.on("ball", (data) => {
            //console.log(data)
            l.update_data(data)
        });

        // socket.on("cue", (data) => {
        //     //l.update_data(data)
        // });

        sketch.emit = (name, data) => {
            socket.emit(name, data);
        }

        sketch.activated = true
    }

    sketch.windowResized = () => {
        resizeCanvas(windowWidth, windowHeight);
    }

    sketch.pause = () => {
    }

    sketch.resume = () => {
    }

    sketch.update = () => {
    }

    sketch.show = () => {
        sketch.clear();
        l.show(sketch);
    }
});