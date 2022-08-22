let myBubble = [];
let mySpotlight = [];
let myAnswer = [];
let text01 = "What do you see?";
let text02 = "Playful Digital Experiences + Cultural Heritage"
let text03 = ['Curiosity','Creativity','Engaging','Innovation','Sustainability'];

function setup() {
  createCanvas(windowWidth, 600);
  //initiating data for bubbbles in grid
  nRow = int(height/50); nCol = (width/50);
  for (let j = 0; j < nRow; j++) {
	myBubble[j] = []
    for (let i = 0; i < nCol; i++) {
      myBubble[j][i] = new Bubble(
        i * 50, j * 50,10,Math.round(random(-2, 2)),Math.round(random(-2, 2)),color(227,189,88));
    }
  }

  //initiating data for spotlight
  spotNum = 8;
   for (let m = 0; m < spotNum; m++) {
    mySpotlight[m] = new Spotlight(random(width/2-50,width/2+50),random(height/2),200,random(-1,1),random(-1,1))
  }

   //initiating data for spotlight
  ansNum = 5;
   for (let h = 0; h < ansNum; h++) {
  myAnswer[h] = new Answer((h+1)*(width-200)/5, random(height*0.6,height*0.9), color(227,189,88), h);
   }

  textAlign(CENTER,CENTER);
  textSize(24);
}

function draw() {
  background(255,255,255);
  push();
  fill(227,189,88);
  text(text01, width/2, height*0.25);
  //random keywords display
  for (let h = 0; h < myAnswer.length; h++) {
    myAnswer[h].display();
  }
  pop();
  for (let j = 0; j < myBubble.length; j++) {
    for (let i = 0; i < myBubble[j].length; i++) {
      // print(myBubble[0]);   
      myBubble[j][i].jitter();//animate bubbles
      myBubble[j][i].display();//drawing bubbles
    }
  }
  
  for (let m = 0; m < mySpotlight.length; m++) {
    // mySpotlight[m].canvas();
    mySpotlight[0].move();//animate spotlight
    mySpotlight[0].erasor();//drawing spotlight
  }
  push();
  fill(227,189,88);
  text(text02, width/2, height/2);
  pop();
}

class Spotlight {
  constructor(x, y, diameter, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.img = createGraphics(windowWidth,600);//creating another canvas on top
  }
  
  move(){
    if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
      this.x = mouseX;
      this.y = mouseY;      
    }
    else{
      this.x += this.xSpeed*0.5;
      if(this.x <= 0 || this.x >= width){
        this.xSpeed *= -1;
      }
        this.y += this.ySpeed*0.5;
      if(this.y <= 0 || this.y >= height){
        this.ySpeed *= -1;
      }
    }
  }
  
  erasor(){
  this.img.background(0,1);//black in color for the top canvas
  //erase a spotlight circle
  this.img.erase();
  //this.img.fill(0);
  this.img.ellipse(this.x,this.y,this.diameter);
  image(this.img, 0,0,windowWidth,600);//display the top canvas
  }
}

class Bubble {
  constructor(x, y, diameter, xSpeed, ySpeed, myColor) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = myColor;
  }

  jitter() {
    this.x += random(-this.xSpeed, this.xSpeed);
    this.y += random(-this.ySpeed, this.ySpeed);
  }
  
  display() {
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.diameter);
  }
}

class Answer {
  constructor(x, y, myColor, num) {
    this.x = x;
    this.y = y;
    this.color = myColor;
    this.num = num;
  }
  
  display() {
    push();
    stroke(this.color);
    noFill();
    text(text03[this.num], this.x, this.y);
    pop();
  }
}
