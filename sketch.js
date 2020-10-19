var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground= createSprite(400,350,1400,10);
  ground.velocityX = -4;
  ground.x= ground.width/2;
  console.log(ground.x);
   
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
  if(gameState === PLAY)
  {
  
  if(keyDown("space")&& monkey.y >= 160 )  
    {
    monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8; 
    
  
  if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
  if(FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach();
      score=score+2;
    }
  spawnBananas();
  
  spawnObstacle();
  }  
  monkey.collide(ground);
    stroke("white");
    textSize(20);
    fill("black");
    text("score: "+ score,450,50);
    
    stroke("white");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time :" + survivalTime,100,50)
  
  
  if(obstacleGroup.isTouching(monkey)) 
  {
   gameState = END;
    // monkey.velocityY = 0;
    
  }
    if(gameState == END)
      {
        ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
      }

  
    
  
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 200 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,330));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime =300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
    FoodGroup.add(banana);
    }
}

function spawnObstacle()
{
  if(frameCount % 150 === 0)
  {
    obstacle = createSprite(400,327 ,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}






