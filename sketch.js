var PLAY = 1;
var END = 0;
var gameStates = PLAY;


var backgroundImage,background;
var monkey , monkey_running;
var ground,groundImage;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage;

var gameOver;
var score = 0;



function preload(){
  
  backgroundImage = loadImage("jungle.webp");
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyImage = loadAnimation("sprite_3.png");
  
  
  
}



function setup() {
  createCanvas(600,400);

  background = createSprite(300,200,600,400);
  background.addImage(backgroundImage);
  background.scale = 4;
  background.x = background.width/2;
  background.velocityX = -4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.addAnimation("player",monkeyImage)
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,380,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false;
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  

  
  score = 0;
  
  
  stroke("black");
  textSize(20);
  fill("white");
}


function draw() {
  
  //background(225);
  
  drawSprites();
    if(gameStates === PLAY)
     {
       
        if(ground.x<0) 
        {
          ground.x=ground.width/2;
        }
       
        if(background.x<0)
        {
          background.x=background.width/2;
        }

        if(FoodGroup.isTouching(monkey))
        {
          FoodGroup.destroyEach();
          score= score + 2;
        }
  
 if(keyDown("space") ) 
        {
          monkey.velocityY = -12;
        }

       monkey.velocityY = monkey.velocityY + 0.8;

        if(obstaclesGroup.isTouching(monkey))
          {
            gameStates=END;
          }
    spawnFood();
        spawnObstacles();
 
    }
  else
    if(gameStates===END)
   { 
      
        monkey.velocityY=0;
        ground.velocityX=0;
        background.velocityX=0;
     
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
     
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
     
        monkey.changeAnimation("player",monkeyImage)
     text("GAME OVER! BETTER LUCK NEXT TIME.", 100,100)
      
    }
  
  monkey.collide(ground);
  
  text("score :"+ score,500,50);

  
}


function spawnFood(){
  
  if(frameCount % 80 === 0){
    
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth +1;
    
    FoodGroup.add(banana);
  }
}
  

function spawnObstacles(){
  if(frameCount % 300===0){
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.2;
    obstacle.lifetime  = 300;
    
    obstaclesGroup.add(obstacle);

    
    
  }
}
 



  












