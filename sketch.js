var balloon, balloonAnimation,balloonAnimation2;
var backgroundimg, database;
var height;
function preload() {
  backgroundimg = loadImage("images/bg.png");
  balloonAnimation = loadImage("images/Balloon1.png");
  balloonAnimation2 = loadAnimation("images/Balloon1.png","images/Balloon2.png","images/Balloon3.png",)
}
function setup() {
  database = firebase.database()
  createCanvas(1000,700);
  balloon = createSprite(100, 400, 50, 50);
  balloon.addImage("Hot Air Balloon", balloonAnimation);
  balloon.addAnimation("ba",balloonAnimation2);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value", readHeight)

 // var balloonPosition = database.ref('balloon/height');
 // balloonPosition.on("value",showError)
}


function draw() {
  background(backgroundimg);
  textSize(20);
  fill("green")
  text("USE ARROW KEYS TO MOVE HOT AIR BALLOON!!",5,50)

  if(keyDown(LEFT_ARROW)){
    writeHeight(-5,0);
    balloon.changeAnimation("ba",balloonAnimation2)
  } 
  
  if(keyDown(RIGHT_ARROW)){
    writeHeight(5,0);
    balloon.changeAnimation("ba",balloonAnimation2)
  }
  if(keyDown(UP_ARROW)){
    writeHeight(0,-5);
    balloon.scale=balloon.scale+-0.01;
    balloon.changeAnimation("ba",balloonAnimation2)

  }
   if(keyDown(DOWN_ARROW)){
    writeHeight(0,5);
    balloon.scale = balloon.scale+0.01;
    balloon.changeAnimation("ba",balloonAnimation2)
  }
  else{
balloon.addImage("bj",balloonAnimation)
  }

  showError();
  
  drawSprites();
}

function writeHeight(x,y){
  database.ref('balloon/height').set(
    {
      'x' : height.x +x,
      'y' : height.y + y
    }
  )
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y' :height.y + y
  })
}

function readHeight(data){
  height= data.val();
  balloon.x= height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}