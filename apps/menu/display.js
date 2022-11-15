// import {className} from "./components/file.js";

export const menu = new p5((sketch) => {
    sketch.name = "menu";
    sketch.activated = false;

    let f;
    let count = 0;
    let menu_translate_y = 80;
    let count_for_opening_menu = 0;
    let menu_larger = 700;
    let app_button_height = 200;
    let app_button_width = 250;
    let rounded_corners_size = 40; //radius
    let menu_state = false;
    let menu_is_opening = false;
    let menu_is_closing = false;
    let apps;

    let hands_position = [];
    // let hands_handedness = [];
    let hands_sign = [];
    let counter_menu_trigger = 0;
    let trigger_menu = false;
    let current_hand_sign = "";

    sketch.preload = () => {
        f = loadFont("/gosai/pool/core/server/assets/FallingSky-JKwK.otf");
    };

    sketch.set = (width, height, socket) => {
        sketch.selfCanvas = sketch
            .createCanvas(width, height, sketch.WEBGL)
            .position(0, 0);
        sketch.activated = true;

        socket.on(sketch.name, (data) => {
            // console.log(data);
            if (data == undefined || data.length == 0) return;
            hands_position = data["hands_landmarks"];
            // console.log(hands_position);
            // hands_handedness = data["hands_handedness"];
            hands_sign = data["hands_sign"];
            // console.log(hands_sign);
        });
        // Set up your app here
        // socket.on("ball", (data) => balls.update_data(data));

        // socket.on("core-app_manager-available_applications", (data) => {
        //     apps = data["applications"];
        //     console.log(apps.length); // 7
        //     console.log(apps[0]["name"]); // affine
        //     // let app_names = Object.keys(apps);
        //     // let app_names_length = app_names.length;
        //     // let app_names_length_half = app_names_length / 2;
        //     // let app_names_length_half_rounded = Math.round(app_names_length_half);
        //     // console.log(app_names);
        //     // console.log(apps);
        // });

        // socket.emit("core-app_manager-get_available_applications")

        // socket.on("core-app_manager-started_applications", (data) => {
        //     let started_apps = data["applications"];
        //     console.log(started_apps);
        // });

        // socket.emit("core-app_manager-get_started_applications")
    };

    sketch.resume = () => {};
    sketch.pause = () => {};
    sketch.update = () => {};

    sketch.windowResized = () => resizeCanvas(windowWidth, windowHeight);

    sketch.show = () => {
        sketch.clear();
    
        //SETUP
        sketch.stroke(255);
        sketch.fill(255);
        sketch.textFont(f);
        sketch.textSize(40);

        //DEBUG : Pool borders
        sketch.line(0, 0, 1920, 0);
        sketch.line(0, 0, 0, 1080);
        sketch.line(0, 1080, 1920, 1080);
        sketch.line(1920, 0, 1920, 1080);
        
        //WRITE "MENU"
        sketch.push();
        sketch.translate(960, menu_translate_y);
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(PI);
        sketch.text("Menu", 0, 0);
        sketch.pop();

        if (hands_sign != undefined && hands_sign.length != 0) {
            current_hand_sign = hands_sign[0][0];
            // sketch.text(current_hand_sign, 100, 100);
            // if (hands_sign.length > 1) {
            //     sketch.text(hands_sign[1][0], 100, 200);
            // }

            if (menu_state == false) {
                if (current_hand_sign == "FIST" || current_hand_sign == "THUMB_UP" || current_hand_sign == "PINCH") {
                    trigger_menu = true;
                    counter_menu_trigger = 0;
                }
                if (trigger_menu == true) {
                    counter_menu_trigger++;
                    if (counter_menu_trigger > 15) {
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
                    if (counter_menu_trigger > 15) {
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
        
        //Rounded rectangle for menu
        //sketch.rect(960, 540, 400, 400, 20); //x, y, width, height, radius //DOESN'T WORK with projection.js
        sketch.noFill();
        sketch.translate(960, 0);
        sketch.line(-menu_larger/2, menu_translate_y + rounded_corners_size, menu_larger/2, menu_translate_y + rounded_corners_size);
        
        //Big arcs
        sketch.push();
        sketch.translate(-menu_larger/2, menu_translate_y);
        sketch.rotate(HALF_PI)
        sketch.arc(0,0, rounded_corners_size*2, rounded_corners_size*2, 0, HALF_PI);
        sketch.pop()
        sketch.arc(menu_larger/2, menu_translate_y, rounded_corners_size*2, rounded_corners_size*2, 0, HALF_PI);

        sketch.line(-menu_larger/2 - rounded_corners_size, 0, -menu_larger/2 - rounded_corners_size, menu_translate_y);
        sketch.line(menu_larger/2 + rounded_corners_size, 0, menu_larger/2 + rounded_corners_size, menu_translate_y);

        sketch.rect(-120, menu_translate_y + rounded_corners_size, 240, 40);
        sketch.push();
        sketch.fill(255);
        sketch.translate(0, menu_translate_y + rounded_corners_size +10);
        sketch.triangle(-10, 0, 10, 0, 0, 20);
        sketch.pop();

        //BUTTON activation
        sketch.push();
        sketch.fill(100)
        sketch.noStroke();
        count+=2;
        if(count>=240) count = 0;
        // sketch.rect(845, menu_translate_y + rounded_corners_size, count, 40);
        // sketch.rect(-120, menu_translate_y + rounded_corners_size, count, 40);
        sketch.pop();

        open_close_menu();
        display_apps_on_menu();
        check_index_position(sketch);
        // sketch.circle(960, menu_translate_y, 60);
    };

    function check_index_position(sketch) {
        if (hands_position.length == 0) return;
        let index_position = hands_position[0][8];
        // console.log(index_position);
        let index_x = index_position[0]*width - width/2;
        let index_y = index_position[1]*height;
        // let index_z = index_position[2];
        // console.log(index_x, index_y, index_z);
        if (index_x > 0 && index_x < 1920 && index_y > 0 && index_y < 1080) { //&& index_z > 0 && index_z < 1000) {
            // console.log("index is in the pool");
            sketch.fill(255, 0, 0);
            sketch.circle(index_x, index_y, 40);
            // sketch.line(0,menu_translate_y-30,0, menu_translate_y+30)
            
            // sketch.rect(-120, menu_translate_y + rounded_corners_size, count, 40);
            // -120 < x < 120
            // menu_translate_y + rounded_corners_size < y < menu_translate_y + rounded_corners_size + 40
            if (index_y > menu_translate_y + rounded_corners_size && index_y < menu_translate_y + rounded_corners_size + 40) {
                // console.log("index is in the menu");
                if (index_x > -120 && index_x < 120) {
                    // console.log("index is in the menu");
                    if (menu_state == false) {
                        menu_is_opening = true;
                        menu_is_closing = false;
                    }
                    if (menu_state == true) {
                        menu_is_opening = false;
                        menu_is_closing = true;
                    }
                }
            }
        }
    }
        // console.log(hands_position[0]);

    function display_apps_on_menu() {
        if(menu_state && menu_is_closing == false) {
            sketch.push();
            sketch.translate(-menu_larger/2 - rounded_corners_size/2, menu_translate_y / 2 + 10);
            sketch.rectMode(CENTER);
            for (let i = 0; i < 3; i++) {
                sketch.rect(i * app_button_width + app_button_width/2, 0, app_button_height, app_button_width);
            }

            sketch.pop();
        }
    };

    function open_close_menu() {
        if (sketch.mouseIsPressed && menu_state == false) {
            count_for_opening_menu = 0;
            menu_is_opening = true;
        }
        if (sketch.mouseIsPressed && menu_state == true) {
            count_for_opening_menu = 300;
            menu_is_closing = true;
        }
        if (menu_is_opening) { //OPEN MENU
            menu_translate_y = 80 + count_for_opening_menu;
            count_for_opening_menu += 5;
            if (count_for_opening_menu >= 300) {
                menu_state = true;
                menu_is_opening = false;
            }
        }
        if (menu_is_closing) { //CLOSE MENU
            menu_translate_y = 80 + count_for_opening_menu;
            count_for_opening_menu -= 5;
            if (count_for_opening_menu <= 0) {
                menu_state = false;
                menu_is_closing = false;
            }
        }
    };
});
