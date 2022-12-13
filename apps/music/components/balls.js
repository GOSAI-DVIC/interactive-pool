import {Ball} from "./ball.js"

let max_ball = 20; //Min 9


export class Balls {
    constructor()
    {
        this.balls = []
        this.ball_nb = 0
        this.previous_ball_nb = max_ball;
        this.ballmoving = []
        this.XBallFrameBefore = []
        this.YBallFrameBefore = []
        this.frame = 0;

        for(let i=0; i<max_ball; i++)
        {
            let ball=new Ball(-500,-500)
            this.balls.push(ball)
        }
    }

    show(sketch, pianoA4, pianoC4) {
        this.isstopped()
        this.impactDetection(sketch, pianoA4)
        this.impactmur(sketch, pianoC4)
        
        sketch.push();
        for (let ball of this.balls)
        {
            ball.show(sketch)
        }
        this.show_menu(sketch)
        sketch.pop();
    }

    show_menu(sketch) {
        sketch.fullscreen()
        sketch.push();
        sketch.pop();
    }

    update_data(data) {
        if (data == undefined)  return;
        this.data = data; //[[100,200], [900,876]]
    }

    update(){
        if (this.data == undefined) return;
        this.ball_nb = 0
        for (let ball of this.data){
            if (this.ball_nb >= max_ball) break
            this.balls[this.ball_nb].x = ball[0]
            this.balls[this.ball_nb].y = ball[1]
            this.ball_nb += 1
        }
        for (let i = this.ball_nb; i<this.previous_ball_nb; i++)
        {
            this.balls[i].x = -500;
            this.balls[i].y = -500;
        }
        this.previous_ball_nb = this.ball_nb
    }

    isstopped(){
        if(this.frame > 10){
            for(let a = 0; a < this.ball_nb; a++){
                if(this.balls[a].x == this.XBallFrameBefore[a] && this.balls[a].y == this.YBallFrameBefore[a]){
                    this.ballmoving[a] = 'false';
                }
                else{
                    this.ballmoving[a] = 'true';
                }
            }

        }
        for(let a = 0; a < this.ball_nb; a++){
            this.XBallFrameBefore[a] = this.balls[a].x
            this.YBallFrameBefore[a] = this.balls[a].y
        }
        this.frame++
    }


    impactDetection(sketch, pianoA4){
        for(let i = 0; i < this.ball_nb; i++){
            for(let j = 0; j < this.ball_nb; j++){
                if(i!=j){
                    if(this.ballmoving[i] == "true" && this.ballmoving[j] == "true"){
                        if(80>sqrt(sq(this.balls[i].x-this.balls[j].x)+sq(this.balls[i].y-this.balls[j].y))){
                            sketch.fill(200,0,0)
                            sketch.circle(260,300,100)
                            sketch.circle(this.balls[i].x,this.balls[i].y, 30)
                            pianoA4.play()
                        }
                    }
                }
            }
        }
    }

    impactmur(sketch, pianoC4){
        this.impactwallwidth(sketch, pianoC4)
        this.impactwallheight(sketch, pianoC4)
    }

    impactwallwidth(sketch, pianoC4){
        for(let i = 0; i < this.ball_nb; i++){
            if(this.ballmoving[i] == 'true'){
                if(this.balls[i].x > 1830 || this.balls[i].x < 90){
                    sketch.fill(0,200,0)
                    sketch.circle(260,300,100)
                    sketch.circle(this.balls[i].x,this.balls[i].y, 60)
                    pianoC4.play()
                }
            }
        }
    }

    impactwallheight(sketch, pianoC4){
        for(let j = 0; j < this.ball_nb; j++){
            if(this.ballmoving[j] == 'true'){
                if(this.balls[j].y > 1000 || this.balls[j].y < 75){
                    sketch.fill(0,200,0)
                    sketch.circle(260,300,100)
                    sketch.circle(this.balls[j].x,this.balls[j].y, 30)
                    pianoC4.play()
                }
            }
        }
    }




}
