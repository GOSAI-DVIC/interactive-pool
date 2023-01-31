//fonctions à modifier this.a par this.triangle[i] where i = 0 pour a, 1 pour b, 2 pour c
//calculateAngle
//returnXcenter //ok normalement
//returnYcenter //ok normalement
// calculatePerpendicularBisector //ok normalement

export class Triangle {
    constructor(a, b, c, color = 255) {
        this.triangle = [a, b, c] //a, b, c from class Ball
        this.angle_a = this.calculateAngle(2, 0, 1);
        this.angle_b = this.calculateAngle(0, 1, 2);
        this.angle_c = this.calculateAngle(1, 2, 0);
        this.x = (this.triangle[0].x + this.triangle[1].x + this.triangle[2].x) / 3; //Gravity Center X (or centroid x)
        this.y = (this.triangle[0].y + this.triangle[1].y + this.triangle[2].y) / 3; //Gravity Center Y (or centroid y)
        this.color = this.IsRightTriangle() ? [0, 170, 255] : color;

        //FOR PERPENDICULAR BIJECTOR
        this.middle1 = createVector(this.returnXCenter(0, 1), this.returnYCenter(0, 1))
        this.extremity1_1 = this.calculatePerpendicularBisector(this.middle1, 1)
        this.extremity1_2 = createVector(this.middle1.x - (this.extremity1_1.x - this.middle1.x), this.middle1.y - (this.extremity1_1.y - this.middle1.y))

        this.middle2 = createVector(this.returnXCenter(1, 2), this.returnYCenter(1, 2))
        this.extremity2_1 = this.calculatePerpendicularBisector(this.middle2, 2)
        this.extremity2_2 = createVector(this.middle2.x - (this.extremity2_1.x - this.middle2.x), this.middle2.y - (this.extremity2_1.y - this.middle2.y))

        this.middle3 = createVector(this.returnXCenter(2, 0), this.returnYCenter(2, 0))
        this.extremity3_1 = this.calculatePerpendicularBisector(this.middle3, 0)
        this.extremity3_2 = createVector(this.middle3.x - (this.extremity3_1.x - this.middle3.x), this.middle3.y - (this.extremity3_1.y - this.middle3.y))

        this.circumcenter = this.intersectPoint(this.extremity1_1, this.extremity1_2, this.extremity2_1, this.extremity2_2)

        this.calculateEqualSymbols()
        this.calculateRightSymbols()
    }

    updateTriangleInfos(color = 255) {
        this.angle_a = this.calculateAngle(2, 0, 1);
        this.angle_b = this.calculateAngle(0, 1, 2);
        this.angle_c = this.calculateAngle(1, 2, 0);
        this.x = (this.triangle[0].x + this.triangle[1].x + this.triangle[2].x) / 3; //Gravity Center X (or centroid x)
        this.y = (this.triangle[0].y + this.triangle[1].y + this.triangle[2].y) / 3; //Gravity Center Y (or centroid y)
        this.color = this.IsRightTriangle() ? [0, 170, 255] : color;

        //FOR PERPENDICULAR BIJECTOR
        this.middle1 = createVector(this.returnXCenter(0, 1), this.returnYCenter(0, 1))
        this.extremity1_1 = this.calculatePerpendicularBisector(this.middle1, 1)
        this.extremity1_2 = createVector(this.middle1.x - (this.extremity1_1.x - this.middle1.x), this.middle1.y - (this.extremity1_1.y - this.middle1.y))

        this.middle2 = createVector(this.returnXCenter(1, 2), this.returnYCenter(1, 2))
        this.extremity2_1 = this.calculatePerpendicularBisector(this.middle2, 2)
        this.extremity2_2 = createVector(this.middle2.x - (this.extremity2_1.x - this.middle2.x), this.middle2.y - (this.extremity2_1.y - this.middle2.y))

        this.middle3 = createVector(this.returnXCenter(2, 0), this.returnYCenter(2, 0))
        this.extremity3_1 = this.calculatePerpendicularBisector(this.middle3, 0)
        this.extremity3_2 = createVector(this.middle3.x - (this.extremity3_1.x - this.middle3.x), this.middle3.y - (this.extremity3_1.y - this.middle3.y))

        this.circumcenter = this.intersectPoint(this.extremity1_1, this.extremity1_2, this.extremity2_1, this.extremity2_2)

        this.calculateEqualSymbols()
        this.calculateRightSymbols()
    }

    IsRightTriangle() {
        if ((this.angle_a == 90) || (this.angle_b == 90) || (this.angle_c == 90)) {
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
        sketch.line(this.triangle[0].x, this.triangle[0].y, this.triangle[1].x, this.triangle[1].y)
        sketch.line(this.triangle[0].x, this.triangle[0].y, this.triangle[2].x, this.triangle[2].y)
        sketch.line(this.triangle[2].x, this.triangle[2].y, this.triangle[1].x, this.triangle[1].y)
        sketch.pop();
    }

    showAngle(sketch, f) {
        sketch.textFont(f, 48);
        // textSize(48);
        sketch.noStroke();
        sketch.fill(255);
        let distance = 60;
        let angle_text = 180
        sketch.textAlign(CENTER, CENTER);

        sketch.push();
        sketch.translate(
            (this.triangle[0].x < this.x) ? this.triangle[0].x - distance : this.triangle[0].x + distance,
            (this.triangle[0].y < this.y) ? this.triangle[0].y - distance : this.triangle[0].y + distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text(this.angle_a + "°", 0, 0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.triangle[1].x < this.x) ? this.triangle[1].x - distance : this.triangle[1].x + distance,
            (this.triangle[1].y < this.y) ? this.triangle[1].y - distance : this.triangle[1].y + distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text(this.angle_b + "°", 0, 0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.triangle[2].x < this.x) ? this.triangle[2].x - distance : this.triangle[2].x + distance,
            (this.triangle[2].y < this.y) ? this.triangle[2].y - distance : this.triangle[2].y + distance
        );
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text(this.angle_c + "°", 0, 0);
        sketch.pop();
    }

    distanceOf2Balls(p1, p2) {
        return round(dist(p1.x, p1.y, p2.x, p2.y), 5)
    }

    calculateAngle(p1, p2, p3) {
        // console.log(this.triangle[p1])
        let AB = this.distanceOf2Balls(this.triangle[p1], this.triangle[p2]);
        let BC = this.distanceOf2Balls(this.triangle[p2], this.triangle[p3]);
        let AC = this.distanceOf2Balls(this.triangle[p1], this.triangle[p3]);
        return round(acos((BC ** 2 + AB ** 2 - AC ** 2) / (2 * BC * AB)) * 180 / PI)
    }

    calculatePerpendicularBisector(i, p1) {
        let u = createVector(this.triangle[p1].x - i.x, this.triangle[p1].y - i.y)
        let v = createVector(-u.y, u.x)
        return createVector(v.x + i.x, v.y + i.y)
        // let v = createVector(p2.x-p3.x,p2.y-2*p3.y)
        // let w = u.cross(v)
        // v = u.cross(w)
    }

    calculatePerpendicularBisector2(i, j) {
        let u = createVector(j.x - i.x, j.y - i.y)
        let v = createVector(-u.y, u.x)
        return createVector(v.x + i.x, v.y + i.y)
    }

    calculateEqualSymbols() {

        let k = 0.1
        //COMPUTE | coordinnates between this.triangle[0] and this.triangle[2] (middle3)
        let D1 = createVector((this.triangle[0].x + this.middle3.x) / 2, (this.triangle[0].y + this.middle3.y) / 2)
        let D2 = createVector((this.triangle[2].x + this.middle3.x) / 2, (this.triangle[2].y + this.middle3.y) / 2)

        let extremityD1_1 = this.calculatePerpendicularBisector(D1, 0)
        let extremityD1_2 = createVector(D1.x - (extremityD1_1.x - D1.x), D1.y - (extremityD1_1.y - D1.y))

        let extremityD2_1 = this.calculatePerpendicularBisector(D2, 2)
        let extremityD2_2 = createVector(D2.x - (extremityD2_1.x - D2.x), D2.y - (extremityD2_1.y - D2.y))

        this.M1 = createVector(D1.x + k * (extremityD1_1.x - D1.x), D1.y + k * (extremityD1_1.y - D1.y))
        this.M2 = createVector(D1.x + k * (extremityD1_2.x - D1.x), D1.y + k * (extremityD1_2.y - D1.y))

        this.N1 = createVector(D2.x + k * (extremityD2_1.x - D2.x), D2.y + k * (extremityD2_1.y - D2.y))
        this.N2 = createVector(D2.x + k * (extremityD2_2.x - D2.x), D2.y + k * (extremityD2_2.y - D2.y))

        //COMPUTE || coordinnates between this.triangle[0] and this.triangle[2] (middle3)

        // 1st double line
        let E1 = createVector((this.triangle[2].x + this.middle2.x) / 2, (this.triangle[2].y + this.middle2.y) / 2)

        let F1 = createVector(E1.x + k * (this.triangle[2].x - E1.x), E1.y + k * (this.triangle[2].y - E1.y))
        let G1 = createVector(E1.x - k * (this.triangle[2].x - E1.x), E1.y - k * (this.triangle[2].y - E1.y))

        let extremityF1_1 = this.calculatePerpendicularBisector(F1, 2)
        let extremityF1_2 = createVector(F1.x - (extremityF1_1.x - F1.x), F1.y - (extremityF1_1.y - F1.y))

        let extremityG1_1 = this.calculatePerpendicularBisector2(G1, this.middle2)
        let extremityG1_2 = createVector(G1.x - (extremityG1_1.x - G1.x), G1.y - (extremityG1_1.y - G1.y))

        this.H1 = createVector(F1.x + k * (extremityF1_1.x - F1.x), F1.y + k * (extremityF1_1.y - F1.y))
        this.H2 = createVector(F1.x + k * (extremityF1_2.x - F1.x), F1.y + k * (extremityF1_2.y - F1.y))

        this.I1 = createVector(G1.x + k * (extremityG1_1.x - G1.x), G1.y + k * (extremityG1_1.y - G1.y))
        this.I2 = createVector(G1.x + k * (extremityG1_2.x - G1.x), G1.y + k * (extremityG1_2.y - G1.y))

        // 2nd double line
        let E2 = createVector((this.triangle[1].x + this.middle2.x) / 2, (this.triangle[1].y + this.middle2.y) / 2)
        
        let F2 = createVector(E2.x + k * (this.triangle[1].x - E2.x), E2.y + k * (this.triangle[1].y - E2.y))
        let G2 = createVector(E2.x - k * (this.triangle[1].x - E2.x), E2.y - k * (this.triangle[1].y - E2.y))

        let extremityF2_1 = this.calculatePerpendicularBisector(F2, 1)
        let extremityF2_2 = createVector(F2.x - (extremityF2_1.x - F2.x), F2.y - (extremityF2_1.y - F2.y))

        let extremityG2_1 = this.calculatePerpendicularBisector2(G2, this.middle2)
        let extremityG2_2 = createVector(G2.x - (extremityG2_1.x - G2.x), G2.y - (extremityG2_1.y - G2.y))

        this.J1 = createVector(F2.x + k * (extremityF2_1.x - F2.x), F2.y + k * (extremityF2_1.y - F2.y))
        this.J2 = createVector(F2.x + k * (extremityF2_2.x - F2.x), F2.y + k * (extremityF2_2.y - F2.y))

        this.K1 = createVector(G2.x + k * (extremityG2_1.x - G2.x), G2.y + k * (extremityG2_1.y - G2.y))
        this.K2 = createVector(G2.x + k * (extremityG2_2.x - G2.x), G2.y + k * (extremityG2_2.y - G2.y))
    }

    showLetter(sketch, f) {
        sketch.textFont(f, 48);
        // textSize(48);
        sketch.noStroke();
        sketch.fill(255);
        let distance = 28;
        let angle_text = 180
        sketch.textAlign(CENTER, CENTER);

        sketch.push();
        sketch.translate(
            (this.triangle[0].x < this.x) ? this.triangle[0].x - distance : this.triangle[0].x + distance,
            (this.triangle[0].y < this.y) ? this.triangle[0].y - distance : this.triangle[0].y + distance
        );
        sketch.rotate(radians(angle_text));
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text("A", 0, 0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.triangle[1].x < this.x) ? this.triangle[1].x - distance : this.triangle[1].x + distance,
            (this.triangle[1].y < this.y) ? this.triangle[1].y - distance : this.triangle[1].y + distance
        );
        sketch.rotate(radians(angle_text));
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text("B", 0, 0);
        sketch.pop();

        sketch.push();
        sketch.translate(
            (this.triangle[2].x < this.x) ? this.triangle[2].x - distance : this.triangle[2].x + distance,
            (this.triangle[2].y < this.y) ? this.triangle[2].y - distance : this.triangle[2].y + distance
        );
        sketch.rotate(radians(angle_text));
        sketch.textAlign(CENTER, CENTER);
        sketch.rotate(radians(angle_text));
        sketch.text("C", 0, 0);
        sketch.pop();
    }

    calculateRightSymbols() {
        let k = 0.07
        // let A1 = createVector(this.triangle[0].x + k * (this.middle1.x - this.triangle[0].x), this.triangle[0].y + k * (this.middle1.y - this.triangle[0].y))
        this.A1 = createVector(this.middle1.x + k * (this.triangle[0].x - this.middle1.x), this.middle1.y + k * (this.triangle[0].y - this.middle1.y))
        this.A2 = createVector(this.middle1.x + k * (this.extremity1_2.x - this.middle1.x), this.middle1.y + k * (this.extremity1_2.y - this.middle1.y))
        this.A3 = createVector(this.A2.x + (this.A1.x - this.middle1.x), this.A2.y + (this.A1.y - this.middle1.y))

        this.B1 = createVector(this.middle2.x + k * (this.triangle[1].x - this.middle2.x), this.middle2.y + k * (this.triangle[1].y - this.middle2.y))
        this.B2 = createVector(this.middle2.x + k * (this.extremity2_2.x - this.middle2.x), this.middle2.y + k * (this.extremity2_2.y - this.middle2.y))
        this.B3 = createVector(this.B2.x + (this.B1.x - this.middle2.x), this.B2.y + (this.B1.y - this.middle2.y))
        
        this.C1 = createVector(this.middle3.x + k * (this.triangle[2].x - this.middle3.x), this.middle3.y + k * (this.triangle[2].y - this.middle3.y))
        this.C2 = createVector(this.middle3.x + k * (this.extremity3_2.x - this.middle3.x), this.middle3.y + k * (this.extremity3_2.y - this.middle3.y))
        this.C3 = createVector(this.C2.x + (this.C1.x - this.middle3.x), this.C2.y + (this.C1.y - this.middle3.y))

    }

    showRightSymbols(sketch) {
        // show right symbols
        sketch.stroke(255, 0, 255)
        sketch.fill(0, 0, 255)
        sketch.strokeWeight(5)
        
        sketch.line(this.A2.x, this.A2.y, this.A3.x, this.A3.y)
        sketch.line(this.A3.x, this.A3.y, this.A1.x, this.A1.y)
        sketch.line(this.B2.x, this.B2.y, this.B3.x, this.B3.y)
        sketch.line(this.B3.x, this.B3.y, this.B1.x, this.B1.y)
        sketch.line(this.C2.x, this.C2.y, this.C3.x, this.C3.y)
        sketch.line(this.C3.x, this.C3.y, this.C1.x, this.C1.y)
    }

    intersectPoint(point1, point2, point3, point4) {
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

    returnXCenter(p1, p2) {
        // console.log(this.triangle[p1].x)
        return int((this.triangle[p1].x + this.triangle[p2].x) / 2)
    }

    returnYCenter(p1, p2) {
        return int((this.triangle[p1].y + this.triangle[p2].y) / 2)
    }

    showCentroid(sketch) {
        sketch.push();
        sketch.strokeWeight(5)
        sketch.fill(255, 255, 0);
        sketch.circle(this.x, this.y, 15);
        sketch.pop();
    }

    showMediane(sketch) {
        sketch.push();
        sketch.stroke(255, 255, 0)
        sketch.strokeWeight(5)
        sketch.line(this.triangle[0].x, this.triangle[0].y, this.returnXCenter(1, 2), this.returnYCenter(1, 2))
        sketch.line(this.triangle[1].x, this.triangle[1].y, this.returnXCenter(0, 2), this.returnYCenter(0, 2))
        sketch.line(this.triangle[2].x, this.triangle[2].y, this.returnXCenter(1, 0), this.returnYCenter(1, 0))
        sketch.pop();
    }

    showPerpendicularBisector(sketch) {
        sketch.push();
        sketch.strokeWeight(5)
        sketch.stroke(255, 0, 255)
        sketch.fill(255, 0, 255);
        sketch.circle(this.circumcenter.x, this.circumcenter.y, 15);
        sketch.noFill();
        sketch.line(this.extremity1_1.x, this.extremity1_1.y, this.extremity1_2.x, this.extremity1_2.y)
        sketch.line(this.extremity2_1.x, this.extremity2_1.y, this.extremity2_2.x, this.extremity2_2.y)
        sketch.line(this.extremity3_1.x, this.extremity3_1.y, this.extremity3_2.x, this.extremity3_2.y)
        sketch.pop();
    }

    showEqualSymbols(sketch) {
        sketch.push();

        //DRAW EQUAL SYMBOLS
        sketch.stroke(255, 0, 255)
        sketch.strokeWeight(5)
        sketch.noFill()
        // Equal symbol : Single Line
        sketch.line(this.M1.x, this.M1.y, this.M2.x, this.M2.y)
        sketch.line(this.N1.x, this.N1.y, this.N2.x, this.N2.y)
        // Equal symbol : Double Lines
        sketch.line(this.H1.x, this.H1.y, this.H2.x, this.H2.y)
        sketch.line(this.I1.x, this.I1.y, this.I2.x, this.I2.y)
        sketch.line(this.J1.x, this.J1.y, this.J2.x, this.J2.y)
        sketch.line(this.K1.x, this.K1.y, this.K2.x, this.K2.y)
        // Equal symbol : Circles
        sketch.circle((this.triangle[0].x + this.middle1.x) / 2, (this.triangle[0].y + this.middle1.y) / 2, 30);
        sketch.circle((this.triangle[1].x + this.middle1.x) / 2, (this.triangle[1].y + this.middle1.y) / 2, 30);
        sketch.pop();
    }

    showCircumCircle(sketch) {
        sketch.push();
        sketch.stroke(255, 0, 255)
        sketch.strokeWeight(8)
        sketch.fill(0)
        sketch.noFill();
        sketch.circle(this.circumcenter.x, this.circumcenter.y, (this.distanceOf2Balls(this.circumcenter, this.triangle[0])) * 2)
        sketch.pop();
    }
}