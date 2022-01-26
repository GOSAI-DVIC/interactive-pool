export class Triangle {
    constructor(a,b,c,color=255)
    {
        this.a = a; //from class Ball
        this.b = b;
        this.c = c;
        this.angle_a = this.calculateAngle(this.c,this.a,this.b);
        this.angle_b = this.calculateAngle(this.a,this.b,this.c);
        this.angle_c = this.calculateAngle(this.b,this.c,this.a);
        this.x = (a.x+b.x+c.x)/3; //Gravity Center X (or centroid x)
        this.y = (a.y+b.y+c.y)/3; //Gravity Center Y (or centroid y)
        this.color = this.IsRightTriangle() ? [0,170,255] : color;

        //FOR PERPENDICULAR BIJECTOR
        this.middle1 = createVector(this.returnXCenter(this.a,this.b), this.returnYCenter(this.a,this.b))
        this.extremity1_1 = this.calculatePerpendicularBisector(this.middle1,this.b)
        this.extremity1_2 = createVector(this.middle1.x-(this.extremity1_1.x-this.middle1.x),this.middle1.y-(this.extremity1_1.y-this.middle1.y))

        this.middle2 = createVector(this.returnXCenter(this.b,this.c), this.returnYCenter(this.b,this.c))
        this.extremity2_1 = this.calculatePerpendicularBisector(this.middle2,this.c)
        this.extremity2_2 = createVector(this.middle2.x-(this.extremity2_1.x-this.middle2.x),this.middle2.y-(this.extremity2_1.y-this.middle2.y))

        this.middle3 = createVector(this.returnXCenter(this.c,this.a), this.returnYCenter(this.c,this.a))
        this.extremity3_1 = this.calculatePerpendicularBisector(this.middle3,this.a)
        this.extremity3_2 = createVector(this.middle3.x-(this.extremity3_1.x-this.middle3.x),this.middle3.y-(this.extremity3_1.y-this.middle3.y))

        this.circumcenter = this.intersect_point(this.extremity1_1,this.extremity1_2,this.extremity2_1,this.extremity2_2)

    }

    IsRightTriangle() {
        if((this.angle_a==90) || (this.angle_b==90) || (this.angle_c==90)) {
            return true;
        }
        return false;
    }

    changeColor(rgb) {
        this.color = rgb; //example : (255,141,92) or 255 for gray shades
    }

    show(sketch) {
        sketch.push();
        sketch.stroke(this.color)
        sketch.strokeWeight(5)
        sketch.line(this.a.x,this.a.y,this.b.x,this.b.y)
        sketch.line(this.a.x,this.a.y,this.c.x,this.c.y)
        sketch.line(this.c.x,this.c.y,this.b.x,this.b.y)
        sketch.pop();
    }

    showAngle(sketch){
        sketch.push();
        sketch.textSize(48);
        sketch.noStroke();
        sketch.fill(255);
        let distance = 60;
        let angle_text = 180
        sketch.textAlign(CENTER, CENTER);

        sketch.push();
        sketch.translate(
            (this.a.x<this.x) ? this.a.x-distance : this.a.x +distance, 
            (this.a.y<this.y) ? this.a.y-distance : this.a.y +distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate( radians(angle_text) );
        sketch.text(this.angle_a+"°", 0,0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.b.x<this.x) ? this.b.x-distance : this.b.x +distance,
            (this.b.y<this.y) ? this.b.y-distance : this.b.y +distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate( radians(angle_text) );
        sketch.text(this.angle_b+"°", 0,0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.c.x<this.x) ? this.c.x-distance : this.c.x +distance,
            (this.c.y<this.y) ? this.c.y-distance : this.c.y +distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate( radians(angle_text) );
        sketch.text(this.angle_b+"°", 0,0);
        sketch.pop();
    }

    distanceOf2Balls(p1,p2){
        return round(dist(p1.x,p1.y,p2.x,p2.y),5)
    }

    calculateAngle(p1,p2,p3) { //angle around balls_index_2
        // return round(acos(this.distanceOf2Balls(p2,p3)
        //                 / this.distanceOf2Balls(p1,p2)) * 180 / PI)
        let AB = this.distanceOf2Balls(p1,p2);
        let BC = this.distanceOf2Balls(p2,p3);
        let AC = this.distanceOf2Balls(p1,p3);
        return round(acos((BC**2 + AB**2 - AC**2)/(2*BC*AB)) * 180 / PI)
    }

    calculatePerpendicularBisector(i,p1) {
        let u = createVector(p1.x-i.x,p1.y-i.y)
        let v = createVector(-u.y,u.x)
        return createVector(v.x+i.x,v.y+i.y)
        // let v = createVector(p2.x-p3.x,p2.y-2*p3.y)
        // let w = u.cross(v)
        // v = u.cross(w)
    }

    intersect_point(point1, point2, point3, point4) {
        let ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
                  (point4.y - point3.y) * (point1.x - point3.x)) /
                 ((point4.y - point3.y) * (point2.x - point1.x) - 
                  (point4.x - point3.x) * (point2.y - point1.y));
       
       let ub = ((point2.x - point1.x) * (point1.y - point3.y) - 
                  (point2.y - point1.y) * (point1.x - point3.x)) /
                 ((point4.y - point3.y) * (point2.x - point1.x) - 
                  (point4.x - point3.x) * (point2.y - point1.y));
       
       let x = point1.x + ua * (point2.x - point1.x);
       let y = point1.y + ua * (point2.y - point1.y);
       
       return createVector(x, y)
    }

    returnXCenter(p1,p2) {
        return int((p1.x+p2.x)/2)
    }

    returnYCenter(p1,p2) {
        return int((p1.y+p2.y)/2)
    }


    showCentroid(sketch) {
      sketch.push();
      sketch.strokeWeight(5)
      sketch.fill(255,255,0);
      sketch.circle(this.x,this.y,15);
      sketch.pop();
    }

    showMediane(sketch) {
        sketch.push();
        sketch.stroke(255,255,0)
        sketch.strokeWeight(5)
        sketch.line(this.a.x,this.a.y,this.returnXCenter(this.b,this.c),this.returnYCenter(this.b, this.c))
        sketch.line(this.b.x,this.b.y,this.returnXCenter(this.a,this.c),this.returnYCenter(this.a, this.c))
        sketch.line(this.c.x,this.c.y,this.returnXCenter(this.b,this.a),this.returnYCenter(this.b, this.a))
        sketch.pop();
    }

    showPerpendicularBisector(sketch) {
        sketch.push();
        sketch.strokeWeight(5)
        sketch.fill(255,0,255);
        sketch.circle(this.circumcenter.x,this.circumcenter.y,15);
        sketch.noFill();
        sketch.stroke(255,0,255)
        sketch.line(this.extremity1_1.x,this.extremity1_1.y, this.extremity1_2.x,this.extremity1_2.y)
        sketch.line(this.extremity2_1.x,this.extremity2_1.y, this.extremity2_2.x,this.extremity2_2.y)
        sketch.line(this.extremity3_1.x,this.extremity3_1.y, this.extremity3_2.x,this.extremity3_2.y)
        
        sketch.pop();
    }

    showCircumCircle(sketch) {
      sketch.push();
      sketch.stroke(255,0,255)
      sketch.strokeWeight(8)
      sketch.fill(0)
      sketch.circle(this.circumcenter.x,this.circumcenter.y,(this.distanceOf2Balls(this.circumcenter,this.a))*2)
      sketch.pop();
    }
}