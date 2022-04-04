export const yawa = new p5(( sketch ) => {
    sketch.name = "yawa"
    sketch.activated = false

    let input, button, greeting;
    
    sketch.set = (width, height, socket) => {
        

        sketch.selfCanvas = sketch.createCanvas(width, height).position(0, 0);
        input = sketch.createInput()
        input.position(20, 65);

        button = sketch.createButton('submit');
        button.position(input.x + input.width, 65);
        button.mousePressed(greet);

        greeting = createElement('h2', 'what is your name?');
        greeting.position(20, 5);
        greeting.style("background-color", 'white');

        textAlign(CENTER);
        textSize(50);
        socket.on("ball", (data) => {
        });

        sketch.emit = (name, data) => {
            // socket.emit(name, data);
        }

        sketch.activated = false
    }

    sketch.windowResized = () => {
        // resizeCanvas(windowWidth, windowHeight);
    }

    sketch.pause = () => {
    }

    sketch.resume = () => {
    }

    sketch.update = () => {
    }

    sketch.show = () => {

    }

    function greet() {
        const name = input.value();
        greeting.html('hello ' + name + '!');
        input.value('');
      
        for (let i = 0; i < 200; i++) {
          push();
          fill(random(255), 255, 255);
          translate(random(width), random(height));
          rotate(random(2 * PI));
          text(name, 0, 0);
          pop();
        }

        socket.emit("sound", true);
      }
});