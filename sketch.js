
var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  //Creating the Canvas
  createCanvas(400,400);

  //Creating the monkey
  monkey = createSprite(50,335,10,10);
  monkey.addAnimation('monkeyrun',monkey_running)
  monkey.scale = 0.14
  
  monkey.setCollider("circle",0,0,300);
  //monkey.debug = true;      
   
  //Creating the Ground
  ground = createSprite(300,380,800,10);
  
  //setting ground infinite
  ground.velocityX = -6;
  
  //creating Group
  obstacleGroup = new Group(); 
  FoodGroup = new Group();
}

function draw() {
  background('white');
 
  if ( ground.x<0 ){
    ground.x = ground.width/2;
  }
  
  if (keyDown('space') && monkey.y > 250){
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY+0.7;
  monkey.collide(ground);
  
  if (monkey.collide(obstacleGroup)){
    FoodGroup.lifetime = -1;
    FoodGroup.setVelocityEach = 0;
    ground.velocity = 0;
  }
  
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
  textSize(18);
  fill('black');
  text('Score = '+ score, 40,40);
  
  
  
  survivalTime = Math.ceil(frameCount/frameRate());
  text('Survival Time = '+ survivalTime, 200,40)
  
  
  obstacles();
  banana();
  
  drawSprites();
}

//function for obstacles
function obstacles(){
  if (frameCount % 200 === 0){
    var obs = createSprite( 600, 340, 20, 20)
    obs.addImage(obstaceImage);
    obs.scale = 0.2;
    obs.velocityX = -(6 + score / 10);
    obs.lifetime = 200;
    obs.setCollider("circle",0,0,200)
    //obs.debug = true;
    obstacleGroup.add(obs);
  }  
}

//function for food
function banana(){
  if ( frameCount % 100 === 0 ){
    var banana = createSprite( 600, 150, 10, 10);
    banana.velocityX = -(6 + score / 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  } 
}




