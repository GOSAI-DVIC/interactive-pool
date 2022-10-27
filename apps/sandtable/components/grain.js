export class Grain{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    //this.brightness = brightness;
    //this.xspeed = xspeed;
    //this.yspeed = yspeed;
  }
  getR(){
    return this.r;
  }
  
  move(){
    this.x = this.x + random(-3,3);
    this.y = this.y + random(-3,3);
  }
  
  show(sketch){
    sketch.push();
    sketch.noStroke();
    //stroke(255);
    sketch.fill(88,41,0);
    //fill(this.brightness);
    sketch.ellipse(this.x,this.y,this.r,this.r);
    sketch.pop();
  }
  
  
  
  

}
