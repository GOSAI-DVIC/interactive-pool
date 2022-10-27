var death = loadImage('./platform/home/apps/sandtable/components/death.png');

export class Crab{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    let speed = [-1.5,-1.2,-1,1,1.2,1.5];

    this.xspeed = random(1,1.5);
    this.yspeed = random(speed);
    
    this.image = loadImage('./platform/home/apps/sandtable/components/crabe.png');
  }
  
  move(){
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
    if(this.x>width){
      this.x = 0;
    }
    if(this.y>height){
     this.y = 0;
    }
    if(this.y<0){
    this.y = height;
  }
  if(this.x<0){
    this.x=width;
  }  
  }
  
  getR(){
    return this.r;
  }
  death(){
    this.image = death;
    this.xspeed = 0; 
    this.yspeed = 0;
  }
  
  show(sketch){
    sketch.push();
    sketch.imageMode(CENTER);
    sketch.image(this.image,this.x,this.y,this.r,this.r);
    //stroke(255);
    //fill(255);
    //ellipse(this.x, this.y,this.diameter);
    sketch.pop();
  }
  

  

  
  
}
