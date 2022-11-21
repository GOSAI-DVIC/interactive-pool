// import {className} from "./components/file.js";

export const menu = new p5((sketch) => {
    sketch.name = "menu";
    sketch.activated = false;

    let font;
    let menu_state = false;
    let menu_is_opening = false;
    let menu_is_closing = false;
    let menu_app = 0;
    let number_of_apps = 2;
    
    let index_x = 0;
    let index_y = 0;
    let menu_position_x = 0;
    let menu_position_y = height/2;
    let set_menu_position = true;
    let menu_width = 300;
    let menu_height = 600;
    let opening_menu_percentage = 0;
    let actual_width = 0;
    let actual_height = 0;
    let left_arrow_button_fill = 0
    let right_arrow_button_fill = 0
    let app_button_fill = 0
    let app_control_menu = []
    let started_apps = []

    let hands_position = [];
    let hands_sign = [];

    let counter_menu_trigger = 0;
    let trigger_menu = false;
    let current_hand_sign = "";
    let first_run = true;

    sketch.preload = () => {
        font = loadFont("/gosai/pool/core/server/assets/FallingSky-JKwK.otf");
        
        let url = getURLPath();
        url.splice(-1);
        url = url.join("/");
        config = loadJSON("/" + url + "/platform/home/config.json",
            (data) => {
                if (data.applications.menu_control) {
                    app_control_menu = data.applications.menu_control;
                    number_of_apps = app_control_menu.length;
                }
        });
    };

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch
            .createCanvas(width, height, sketch.WEBGL)
            .position(0, 0);
        sketch.activated = true;

        socket.on(sketch.name, (data) => {
            if (data == undefined || data.length == 0) return;
            hands_position = data["hands_landmarks"];
            hands_sign = data["hands_sign"];
        });

        sketch.emit = (name, data) => {
            socket.emit(name, data);
        };

        socket.on("core-app_manager-started_applications", async (data) => {
            started_apps = [];
            data.applications.forEach(app => {
                started_apps.push(app["name"])
            });
        });

        sketch.reload_started_apps = () => {
            sketch.emit("core-app_manager-started_applications")
        }
    };

    sketch.resume = () => {};
    sketch.pause = () => {};
    sketch.update = () => {};

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        //First run
        if(first_run)
        {
            first_run = false
            sketch.reload_started_apps()
        }
        sketch.clear();

        //DRAWING SETUP
        sketch.stroke(255);
        sketch.fill(255);
        sketch.textFont(font);

        //DEBUG : Draw Pool borders
        sketch.line(0, 0, 1920, 0);
        sketch.line(0, 0, 0, 1080);
        sketch.line(0, 1080, 1920, 1080);
        sketch.line(1920, 0, 1920, 1080);
        // sketch.rect(50,50 , 1820, 980);

        //PROCESSING
        if (hands_position.length != 0)
        {
            index_x = hands_position[0][8][0]*width;
            index_y = hands_position[0][8][1]*height;
            sketch.circle(index_x, index_y, 20);
        }
        else
        {
            index_x = 0;
            index_y = 0;
        }
        check_menu_trigger();
        draw_menu(sketch);
        sketch.push()
        // sketch.translate(width/2 - 200, -150)
        sketch.translate(width/2 - 200, height + 10)
        sketch.rotate(PI)
        sketch.textSize(60)
        sketch.text("Interactive Pool Project", 0,0)
        sketch.pop()
        sketch.push()
        sketch.translate(width/2 + 800, height + 10)
        sketch.rotate(PI)
        sketch.textSize(32)
        sketch.text(`Display : ${Math.round(frameRate())} FPS`, 0, 0);
        sketch.pop()
    };

    function check_menu_trigger() {
        current_hand_sign =""
        if (hands_sign != undefined && hands_sign.length != 0) {
            current_hand_sign = hands_sign[0][0];

            if (menu_state == false) {
                if (current_hand_sign == "FIST" || current_hand_sign == "THUMB_UP" || current_hand_sign == "PINCH") {
                    trigger_menu = true;
                    counter_menu_trigger = 0;
                }
                if (trigger_menu == true) {
                    counter_menu_trigger++;
                    if (counter_menu_trigger > 25) {
                        trigger_menu = false;
                        counter_menu_trigger = 0;
                    }
                    if (current_hand_sign == "OPEN_HAND") {
                        menu_is_opening = true;
                        menu_is_closing = false;
                        menu_state = true;
                        trigger_menu = false;
                        counter_menu_trigger = 0;
                    }
                }   
            }
            else
            {
                if (current_hand_sign == "OPEN_HAND") {
                    trigger_menu = true;
                    counter_menu_trigger = 0;
                }
                if (trigger_menu == true) {
                    counter_menu_trigger++;
                    if (counter_menu_trigger > 25) {
                        trigger_menu = false;
                        counter_menu_trigger = 0;
                    }
                    if (current_hand_sign == "FIST" || current_hand_sign == "THUMB_UP" || current_hand_sign == "THUMB_UP") {
                        menu_is_opening = false;
                        menu_is_closing = true;
                        menu_state = false;
                        trigger_menu = false;
                        counter_menu_trigger = 0;
                    }
                }   
            }
        }
    }

    function draw_menu(sketch) {
        if (menu_is_opening) { //OPEN MENU
            if(set_menu_position) {
                menu_position_x = index_x;
                set_menu_position = false;
                // menu_position_y = index_y;
                if(menu_position_x < menu_width/2 + 50)
                {
                    menu_position_x = menu_width/2 + 50;
                }
                if(menu_position_x > width - menu_width/2 - 50)
                {
                    menu_position_x = width - menu_width/2 - 50;
                }
            }
            opening_menu_percentage += 5;
            actual_width = opening_menu_percentage * menu_width/100;
            actual_height = opening_menu_percentage * menu_height/100;
            if (opening_menu_percentage == 100) {
                menu_is_opening = false;
                menu_state = true;
            }
        }
        if (menu_is_closing) { //CLOSE MENU
            opening_menu_percentage -= 5;
            actual_width = opening_menu_percentage * menu_width/100;
            actual_height = opening_menu_percentage * menu_height/100;
            if (opening_menu_percentage == 0) {
                menu_state = false;
                menu_is_closing = false;
                set_menu_position = true;
            }
        }

        sketch.push()
        sketch.translate(menu_position_x, menu_position_y)
        sketch.rotate(PI)
        sketch.rectMode(CENTER);
        sketch.noFill()
        sketch.rect(0, 0, actual_width, actual_height);
        
        if (menu_state) {
            sketch.stroke(255);
            sketch.fill(255)
            sketch.textAlign(CENTER, CENTER);
            sketch.textSize(40);
            sketch.text("- MENU -", 0, -(menu_height/2)*0.8);
            sketch.textSize(28);
            sketch.text("Keep your index on\nan app to launch it", 0, -(menu_height/2)*0.6);
            
            drawApp(sketch)
            
            // Draw arrow buttons
            sketch.noFill()
            sketch.push()
            sketch.translate(0, (menu_height/2)*0.75)
            sketch.rectMode(CORNER)
            sketch.rect(-menu_width*0.35, -menu_height*0.05, menu_width*0.35, menu_height*0.1)
            sketch.rect(0, -menu_height*0.05, menu_width*0.35, menu_height*0.1)
            sketch.fill(255)
            sketch.triangle(-menu_width*0.150, -menu_height*0.03, -menu_width*0.150, menu_height*0.03, -menu_width*0.225, 0)
            sketch.triangle(menu_width*0.150, -menu_height*0.03, menu_width*0.150, menu_height*0.03, menu_width*0.225, 0)
            
            // Fill arrow buttons on selection
            sketch.fill(125)
            if (index_x > menu_position_x - menu_width*0.35 && index_x < menu_position_x 
                && index_y < menu_position_y - menu_height*0.325 
                && index_y > menu_position_y - menu_height*0.425) 
            {
                right_arrow_button_fill += 1.5;
            }
            else
            {
                right_arrow_button_fill = 0;
            }
            sketch.rect(-menu_width*0.35, -menu_height*0.05, left_arrow_button_fill, menu_height*0.1)
            if (index_x > menu_position_x && index_x < menu_position_x + menu_width*0.35 
                && index_y < menu_position_y - menu_height*0.325 
                && index_y > menu_position_y - menu_height*0.425) 
            {
                left_arrow_button_fill += 1.5;
            }
            else
            {
                left_arrow_button_fill = 0;
            }
            sketch.rect(0, -menu_height*0.05, right_arrow_button_fill, menu_height*0.1)

            // Trigger if arrow buttons are selected
            if(left_arrow_button_fill > menu_width*0.35) {
                left_arrow_button_fill = 0;
                menu_app += 1;
            }
            if(right_arrow_button_fill > menu_width*0.35) {
                right_arrow_button_fill = 0;
                menu_app -= 1;
            }
            if(menu_app == number_of_apps) {
                menu_app = 0;
            }
            else if(menu_app == -1) {
                menu_app = number_of_apps - 1;
            }
            sketch.pop()
        }
        sketch.pop()
        // sketch.circle(menu_position_x - menu_width*0.35, menu_position_y - menu_height*0.25, 50)
        // sketch.circle(menu_position_x + menu_width*0.35, menu_position_y + menu_height*0.15, 50)
    };

    function drawApp(sketch) {
        //App rectangle
        sketch.rectMode(CORNER);
        sketch.noFill()
        sketch.strokeWeight(5)
        sketch.stroke(216, 191, 216)

        // console.log(started_apps)
        // console.log(app_control_menu[menu_app])
        if(started_apps.includes(app_control_menu[menu_app])) {
            sketch.stroke(0, 255, 127)
        }

        sketch.rect(-menu_width*0.35, -menu_height*0.15, menu_width*0.7, menu_height*0.4)

        sketch.fill(125)
        sketch.noStroke()
        //Fill app button on selection
        if(index_x > menu_position_x - menu_width*0.35 && index_x < menu_position_x + menu_width*0.35   
            && index_y > menu_position_y - menu_height*0.25
            && index_y < menu_position_y + menu_height*0.15)
            {
            app_button_fill += 2.5;
            sketch.rect(-menu_width*0.35, -menu_height*0.15, app_button_fill, menu_height*0.4)
        }
        else
        {
            app_button_fill = 0;
        }
        
        sketch.stroke(255)
        sketch.strokeWeight(1)
        //Draw app icon
        sketch.fill(255)
        sketch.textSize(20);
        sketch.text(app_control_menu[menu_app].charAt(0).toUpperCase() + app_control_menu[menu_app].slice(1), -menu_width*0.35, -menu_height*0.15, menu_width*0.7, menu_height*0.4)
        
        
        //Trigger if app button is selected
        if(app_button_fill > menu_width*0.7) {
            app_button_fill = 0;

            if(started_apps.includes(app_control_menu[menu_app])) {
                //stop app
                sketch.emit("core-app_manager-stop_application", {
                    application_name: app_control_menu[menu_app],
                });
            }
            else {
                // Launch app
                sketch.emit("core-app_manager-start_application", {
                    application_name: app_control_menu[menu_app],
                });           
            }
            sketch.reload_started_apps()
        }
    }
});
