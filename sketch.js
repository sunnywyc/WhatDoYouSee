let myBubble = [];
let mySpotlight = [];
let myAnswer = [];
let text01 = "What do you see?";
let text02 = "Playful Digital Experiences + Cultural Heritage"
let text03 = ['Curiosity','Creativity','Engaging','Innovation','Sustainability'];

function preload() {
  font = loadFont("Inter-Black.ttf");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //initiating data for bubbbles in grid
  nRow = int(windowHeight/50); nCol = (windowWidth/50);
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
    mySpotlight[m] = new Spotlight(random(windowWidth/2-50,windowWidth/2+50),random(windowHeight/2),200,random(-1,1),random(-1,1),createGraphics(windowWidth, windowHeight))
  }

   //initiating data for answer
  ansNum = 5;
   for (let h = 0; h < ansNum; h++) {
  myAnswer[h] = new Answer((h+1)*(windowWidth-200)/5, random(windowHeight*0.6,windowHeight*0.9), color(227,189,88), h);
   }
  textFont(font);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(255,255,255);
  push();
  textSize(24);
  fill(227,189,88);
  text(text01, windowWidth/2, windowHeight*0.25);
	
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
  if(windowWidth<=809){
  textSize(16);
  textWrap(WORD);
  text("Playful Digital Experiences + Cultural Heritage", windowWidth/2, windowHeight/2);  
  }
  else if(windowWidth>809 && windowWidth<=1199){
  textSize(28);
  text("Playful Digital Experiences + Cultural Heritage", windowWidth/2, windowHeight/2);
  }
  else if(windowWidth>1199 && windowWidth<=1799){
  textSize(36);
  text("Playful Digital Experiences + Cultural Heritage", windowWidth/2, windowHeight/2);
  }
  else if(windowWidth>1799){
  textSize(36);
  text("Playful Digital Experiences + Cultural Heritage", windowWidth/2, windowHeight/2);
  }
  pop();
}

class Spotlight {
  constructor(x, y, diameter, xSpeed, ySpeed,img) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.img = img;//creating another canvas on top
  }
  
  move(){
    if(mouseX>50 && mouseX<windowWidth-50 && mouseY>50 && mouseY<windowHeight-50){
      this.x = mouseX;
      this.y = mouseY;      
    }
    else{
      this.x += this.xSpeed*0.5;
      if(this.x <= 0 || this.x >= windowHeight){
        this.xSpeed *= -1;
      }
        this.y += this.ySpeed*0.5;
      if(this.y <= 0 || this.y >= windowHeight){
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
  image(this.img, 0,0,width,height);//display the top canvas
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
    strokeWeight(2);
    stroke(this.color);
    noFill();
    text(text03[this.num], this.x, this.y);
    pop();
  }
}
