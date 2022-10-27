export class Death{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    
  }
  
  
  show(){
    image(death,this.x,this.y,this.r,this.r);
    //stroke(255);
    //fill(255);
    //ellipse(this.x, this.y,this.r);
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
