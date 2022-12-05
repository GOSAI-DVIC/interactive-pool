//let grain1;
//let grain2;

let grains = [];
let crabs = [];
let cans = [];
let bubbles = [];
let deaths = [];

function setup() {
  createCanvas(400, 400);
  crabe = loadImage('crabe.png');
  canette = loadImage('can.png');
  death= loadImage('death.png');
  sable = loadImage('sable.jpg');

  //testBubble = new Bubble(0,0,10,0,0);

  for (var a = 0; a<6; a++) {
    let x = 0;
    let y = random(height);
    let r = random(20, 30);

    let crab = new Crab(x, y, r);
    crabs.push(crab);
  }

  for (var b = 0; b<6; b++) {
    let x = width;
    let y = random(height);
    let r = random(10, 15);


    let bubble = new Bubble(x, y, r);
    bubbles.push(bubble);
  }

  //bubbles.push(testBubble);


  for (var j=0; j<8; j++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 30);

    let can = new Can(x, y, r);
    cans.push(can);
  }



  for (var i=0; i<10000; i++) {
    let x= random(width);
    let y = random(height);
    let r = 1.5;
    //let brightness = (249,228,183) ;
    let grain = new Grain(x, y, r);
    grains.push(grain);
  }
}


function draw() {
  imageMode(CORNER);
  background(sable);

  for (let grain of grains) {
    grain.show();
  }

  for (let can of cans) {
    can.show();
  }


  for (let d of deaths) {
    d.show();
  }

  for (let bubble of bubbles) {
    bubble.show();
    bubble.move();
  }

  for (let crab of crabs) {
    crab.show();
    crab.move();
  }



  for (let grain of grains) {
    for (let crab of crabs) {
      //if(crab.x > grain.x - 5  && crab.x < grain.x + 5 ){
      //if(crab.y > grain.y - 5  && crab.y < grain.y + 5){
      if (dist(grain.x, grain.y, crab.x, crab.y)<(crab.getR()/2) + (grain.getR()/2)-1) {
        grain.move();
      }
    }
    //}
  }
  let crabASuppr = [];
  for (var i = 0; i<crabs.length; i++) {
    for (let bubble of bubbles) {
      if (dist(bubble.x, bubble.y, crabs[i].x, crabs[i].y)<(crabs[i].getR()/2) + (bubble.getR()/2)) {
        crabASuppr.push(i);
        crabs[i].death();
        deaths.push(crabs[i]);
      }
    }

  }
}




function mousePressed() {
  for (var i=cans.length-1; i>=0; i--) {
    if (cans[i].contains(mouseX, mouseY)) {
      cans.splice(i, 1);
    }
  }
}
