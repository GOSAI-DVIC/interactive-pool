export class Can{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.canette = loadImage('./platform/home/apps/sandtable/components/can.png');
  }
  
  
  show(sketch){
    sketch.push();
    sketch.image(this.canette,this.x,this.y,this.r,this.r);
    //stroke(255);
    //fill(255);
    //ellipse(this.x, this.y,this.r);
    sketch.pop();
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
  
}
