import {Particles} from "./Particles.js"

export class Fireworks{
    constructor(x,y){
      this.pos = createVector(x,y);
      this.particles = [];
      for(let i=0; i<100;i++){
        let particle = new Particles(this.pos.x,this.pos.y);
        this.particles.push(particle);
      }
    }
    
    showFirework(sketch){
        // console.log(this.particles[1].pos);
        // console.log("HERE");
        console.log("point 2 : ", this.particles[2].pos);
      for(let i=0; i<this.particles.length;i++){
        this.particles[i].show(sketch);
        this.particles[i].displayParticle();
      }
    }
    
   
  }