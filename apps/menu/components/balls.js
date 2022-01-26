import {Ball} from "./ball.js"
import {Triangle} from "./triangle.js"

// let rectangle_box1 = [360, 850, 55, 55]

export class Balls {
    constructor()
    {
        this.balls = []
        this.triangles = []
        this.boxes = []
    }

    show(sketch) {
        sketch.push();
        if(this.boxes[3]==true)
        {
            for (let triangle of this.triangles)
            {
                triangle.showCircumCircle(sketch)
            } 
        }
        if(this.boxes[0]==true)
        {
            for (let triangle of this.triangles)
            {
                triangle.show(sketch);
                triangle.showAngle(sketch);
            }
        }
        if(this.boxes[1]==true)
        {
            for (let triangle of this.triangles)
            {
                triangle.showCentroid(sketch);
                triangle.showMediane(sketch);

            } 
        }
        if(this.boxes[2]==true)
        {
            for (let triangle of this.triangles)
            {
                triangle.showPerpendicularBisector(sketch)
            } 
        }
        for (let ball of this.balls)
        {
            ball.show(sketch)
        }
        this.show_menu(sketch)
        sketch.pop();
    }

    show_menu(sketch) {
        sketch.push();
        sketch.strokeWeight(5)
        sketch.noFill()
        let t = 0;
        for(let i=0; i < 4; i++) {
            if(this.boxes[i] == true) {
                sketch.stroke(0,255,0)
            }
            else
            {
                sketch.stroke(255)
            }
            sketch.rect(370, 850-t, 55, 55);
            t += 125;
        }
        sketch.pop();
    }

    update_data(data) {
        if (data != undefined) {
            this.balls=[]
            this.boxes=[false,false,false,false]
            for (let b of data){
                if(this.RectContainCoords(370, 850, 55, 55,b[0],b[1]))
                {
                    this.boxes[0] = true
                }
                else if(this.RectContainCoords(370, 725, 55, 55,b[0],b[1]))
                {
                    this.boxes[1] = true;
                }
                else if(this.RectContainCoords(370, 600, 55, 55,b[0],b[1]))
                {
                    this.boxes[2] = true;
                }
                else if(this.RectContainCoords(370, 475, 55, 55,b[0],b[1]))
                {
                    this.boxes[3] = true;
                }
                else
                {
                    b=new Ball(b[0],b[1])
                    this.balls.push(b)
                }
            }
        }       

        this.createTriangles()
    }

    RectContainCoords(x, y, w, h,a,b) {
        return x <= a && a <= x + w && y <= b && b <= y + h;
    }

    update(){
        
    }

    get numberOfBalls() {
        return this.balls.length
    }

    createTriangles() {
        this.triangles = [];
        let n = this.numberOfBalls;
        if(n>=3)
        {
            this.triangles.push(new Triangle(this.balls[0],this.balls[1],this.balls[2]));
        }
        if(n>=6)
        {
            this.triangles.push(new Triangle(this.balls[3],this.balls[4],this.balls[5]));
        }
        if(n>=9)
        {
            this.triangles.push(new Triangle(this.balls[6],this.balls[7],this.balls[8]));
        }

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