export class Bubble{
  constructor(x,y,r=80)  {
    this.x = x;
    this.y = y;
    this.r = r;

    this.speed = [-1.5,-1.2,-1,1,1.2,1.5];

    this.xspeed =  random(1,1.5);
    this.yspeed = random(this.speed);
    
  }
  
  setXY(x,y){
    this.x = x;
    this.y = y;
  }
  
  contains(x,y){
    let d = dist(x,y,this.x,this.y);
    if(d<this.r){
      return true;
    }
    else{
      return false;
    }
  }
  
  getR(){
    return this.r;
  }
  
  move(){
    this.x = this.x - this.xspeed;
    this.y = this.y + this.yspeed;
    if(this.x<0 || this.x>width){
      this.x = width;
      this.y = random(height);
      this.xspeed =  random(1,1.5);
      this.yspeed = random(this.speed);
    }
    if(this.y<0 || this.y>height){
      this.x = width;
      this.y = random(height);
      this.xspeed = random(1,1.5);
      this.yspeed = random(this.speed);
    }

  }
  
  
  show(sketch){
    // sketch.push();
    // sketch.stroke(0,0,255)
    //   sketch.strokeWeight(8)
    //   sketch.noFill()
    //   // sketch.fill(0)
    //   sketch.circle(this.x,this.y,this.r)
    // sketch.pop();
  }
  
  
  
}
