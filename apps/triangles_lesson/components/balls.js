import {Ball} from "./ball.js";
import {Triangle} from "./triangle.js"

let max_ball = 20; //Min 9

export class Balls {
    constructor()
    {
        this.balls = []
        this.triangles = []
        this.ball_nb = 0
        this.previous_ball_nb = max_ball;
        this.triangle_nb = 0;

        for(let i=0; i<max_ball; i++)
        {
            let b=new Ball(-500,-500)
            this.balls.push(b)
        }
        this.triangles.push(new Triangle(this.balls[0],this.balls[1],this.balls[2]));
    }

    show(sketch, f) {

    }

    update_data(data) {
        if (data == undefined)  return;
        this.data = data;
    }

    RectContainCoords(x, y, w, h,a,b) {
        return x <= a && a <= x + w && y <= b && b <= y + h;
    }

    update(){
        if (this.data == undefined) return;
        this.ball_nb = 0

        for (let b of this.data){
            if (this.ball_nb >= max_ball) break
            this.balls[this.ball_nb].x = b[0]
            this.balls[this.ball_nb].y = b[1]
            this.ball_nb += 1
        }
        for (let i = this.ball_nb; i<this.previous_ball_nb; i++)
        {
            this.balls[i].x = -500;
            this.balls[i].y = -500;
        }
        this.previous_ball_nb = this.ball_nb
        this.triangle_nb = floor(this.ball_nb/3)

    }

    distanceOf2Balls(index_ball_1,index_ball_2){
        return round(dist(this.balls[index_ball_1].x,
                    this.balls[index_ball_1].y,
                    this.balls[index_ball_2].x,
                    this.balls[index_ball_2].y,),3)
    }

    calculateAngle(index_ball_1,index_ball_2,index_ball_3) { //angle around balls_index_2
        return round(acos(this.distanceOf2Balls(index_ball_2,index_ball_3)
                        / this.distanceOf2Balls(index_ball_1,index_ball_2)) * 180 / PI)
    }
}
