//var death = loadImage('./platform/home/apps/sandtable/components/death.png');
export class Crab{
  constructor(x,y,r,stateLife){
    this.x = x;
    this.y = y;
    this.r = r;
    //let speed = [-1.5,-1.2,-1,1,1.2,1.5];
    let speed = [-2.5,-2.2,-1,1,2.2,2.5];

    //this.xspeed = random(1,1.5);
    //this.yspeed = random(speed);

    this.xspeed = random(2,2.5);
    this.yspeed = random(speed);
    
    this.image = loadImage('./platform/home/apps/sandtable/components/crabe.png');
    this.stateLife = stateLife;
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

  
  show(sketch){
    if(this.stateLife == true){
      sketch.fill(255,0,0);
      sketch.noStroke();
      sketch.push();
      sketch.translate(this.x,this.y);
      sketch.circle(0,0,30);
      sketch.push();
      sketch.rotate(PI/6);
      sketch.ellipse(-20,-3,30,15);
      sketch.fill(0);
      sketch.circle(-23,-7,7);
      sketch.pop();
      sketch.push();
      sketch.rotate(-PI/6);
      sketch.ellipse(+20,-3,30,15);
      sketch.fill(0);
      sketch.circle(23,-7,7);
      sketch.pop();
      sketch.fill(0);
      sketch.rect(-3,-5,2,7);
      sketch.rect(3,-5,2,7);
      sketch.noFill();
      sketch.stroke(0);
      sketch.arc(1, 5, .6*10, .6*10, .1*PI, .9*PI);
      sketch.fill(255,0,0);
      sketch.pop();

    }
    else{
      sketch.fill(211,211,211);
      sketch.noStroke();
      sketch.rect(this.x-10,this.y+11,20,15);
      sketch.circle(this.x, this.y, 40);
      sketch.fill(0);
      sketch.circle(this.x - 7, this.y - 1, this.w/6);
      sketch.circle(this.x + 7, this.y - 1, this.w/6);
      
      sketch.fill(0);
      sketch.rect(this.x-4,this.y+18,3,9);
      sketch.rect(this.x+2,this.y+18,3,9);
      this.xspeed = 0; 
      this.yspeed = 0;
    }
  }
  
  

  

  
  
}
