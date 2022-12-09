import {Ball} from "./ball.js"

let max_ball = 20; //Min 9


export class Balls {
    constructor()
    {
        this.balls = []
        this.ball_nb = 0
        this.previous_ball_nb = max_ball;

        for(let i=0; i<max_ball; i++)
        {
            let ball=new Ball(-500,-500)
            this.balls.push(ball)
        }
    }

    show(sketch, pianoA4, pianoC4) {
        this.impactDetection(sketch, pianoA4, pianoC4)
        this.impactmur(sketch, pianoA4, pianoC4)
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

    impactDetection(sketch, pianoA4, pianoC4){
        for(let i = 0; i < this.ball_nb; i++){
            for(let j = 0; j < this.ball_nb; j++){
                if(i!=j){
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

    impactmur(sketch, pianoA4, pianoC4){
        this.impactwallwidth(sketch, pianoA4, pianoC4)
        this.impactwallheight(sketch, pianoA4, pianoC4)
    }

    impactwallwidth(sketch, pianoA4, pianoC4){
        for(let i = 0; i < this.ball_nb; i++){
            if(this.balls[i].x > width || this.balls[i].x < 0){
  
                sketch.fill(0,200,0)
                sketch.circle(260,300,100)
                sketch.circle(this.balls[i].x,this.balls[i].y, 60)
                pianoC4.play()
            }
        }
    }

    impactwallheight(sketch, pianoA4, pianoC4){
        for(let j = 0; j < this.ball_nb; j++){
            if(this.balls[j].y > height || this.balls[j].y < 0){
  
                sketch.fill(0,200,0)
                sketch.circle(260,300,100)
                sketch.circle(this.balls[j].x,this.balls[j].y, 30)
                pianoC4.play()
            }
        }
    }


}
