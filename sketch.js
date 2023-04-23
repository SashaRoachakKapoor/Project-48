var horseTrack , horseTrackImg
var horse , horseImg , horseRun
var obstaclesGroup
var rewardsGroup
var score 
var opponentScore
var opponentHorse , oppenentHorseImg , opponentHorseRun

function preload(){
  horseTrackImg = loadImage("track.jpg");
 horseImg = loadAnimation("horse.png");
 opponentHorseImg = loadAnimation("h3.png")
 horseRunning=loadAnimation("horse.png","h.png")
 opponentHorseRun = loadAnimation("h3.png" , "h2.png");
 obstacleImage = loadImage("muddyPuddle.png");
 obstacleImage2 = loadImage("roadCone.png")
 rewardImage = loadImage ("apple.png");
 rewardImage2 = loadImage("hayBale.png");

}

function setup() {
  createCanvas(windowWidth , windowHeight);
  //horseTrack = createSprite(width,height)
  //horseTrack.addImage("track" , horseTrackImg)
  horse = createSprite(150 , height/2)
  horse.addAnimation("horse",horseImg);
  horse.addAnimation("h",horseRunning);
  horse.scale = 1
  opponentHorse = createSprite(150,255)
  opponentHorse.addAnimation("h3",opponentHorseImg);
 opponentHorse.addAnimation("h2" , opponentHorseRun);
  opponentHorse.scale = 1
obstaclesGroup = new Group()
rewardsGroup = new Group()
 score = 0
 opponentScore = 0
//horse.debug = true
//opponentHorse.debug = true
rewardsGroup.debug = true
obstaclesGroup.debug = true
horse.setCollider("rectangle",0,0,150,50)
opponentHorse.setCollider("rectangle",0,0,150,50)
}

function draw() {
  background(255,255,255);  
  image(horseTrackImg,0,0,width*6,height)

  console.log(horse.x)
  console.log(horse.y)

  textSize(30)
fill ("black")
  text(" Your score (Black Horse) : "+score,camera.position.x-200,100)
  text(" Opponent's score (Light Brown Horse) : "+opponentScore,camera.position.x-200,150)

  if(keyDown("right")){
   horse.changeAnimation("h",horseRunning)
   opponentHorse.changeAnimation("h2" , opponentHorseRun)
   horse.x+=11
   opponentHorse.x+=11
spawnObstacles()
rewards()

  }
 
  if(keyDown("up")&& horse.position.y>height-500 ){
    horse.changeAnimation("h",horseRunning)
    opponentHorse.changeAnimation("h2" , opponentHorseRun)
    horse.y-=8
   opponentHorse.y-=8
   }


   if(keyDown("down")&& horse.position.y<height/2+90){
    horse.changeAnimation("h",horseRunning)
    opponentHorse.changeAnimation("h2" , opponentHorseRun)
    horse.y+=8
   opponentHorse.y+=8
   }
  

if(rewardsGroup.isTouching(horse)){
  rewardsGroup[0].destroy()
 score = score+1
 horse.velocityX = 4
}

if(rewardsGroup.isTouching(opponentHorse)){
  rewardsGroup[0].destroy()
 opponentHorse.velocityX = 4
 opponentScore = opponentScore+1
}


if(obstaclesGroup.isTouching(horse)){
  score = score-1
  obstaclesGroup[0].destroy()
  horse.velocityX = -1
}

if(obstaclesGroup.isTouching(opponentHorse)){
  obstaclesGroup[0].destroy()
  opponentHorse.velocityX = -1
  opponentScore = opponentScore-1
}

  camera.position.x= horse.x+600

  drawSprites();
if(horse.x > 8750){
  rewardsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  horse.velocityX = 0
  horse.velocityY = 0
  horse.changeAnimation("horse",horseImg);
  gameOver();
} 
//gameStart();
//gameStart.remove()

//if(mouseClicked){
//  gameStart.remove()
//}
}

if(opponentHorse.x > 8750){
  rewardsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  opponentHorse.velocityX = 0
  opponentHorse.velocityY = 0
  opponentHorse.changeAnimation("h3",opponentHorseImg);
  gameOver();
} 


function spawnObstacles(){
if(frameCount %50 === 0){
var obstacle = createSprite(camera.position.x+100,130,40,40)
obstacle.velocityX = -4.5
obstacle.y=Math.round(random(height-500,height/2+70))
obstacle.scale = 0.15
var rand = Math.round(random(1,2))
switch(rand){
  case 1:  obstacle.addImage(obstacleImage)
  break
  case 2: obstacle.addImage(obstacleImage2)
  break
}
obstaclesGroup.add(obstacle)
obstacle.lifetime = 300
}

}

function rewards(){
  if(frameCount %30 === 0){
    var reward = createSprite(camera.position.x+600,600,40,40)
    reward.velocityX = -4.5
    reward.y = Math.round(random(height-500,height/2+70))
   reward.scale = 0.2
   var rand = Math.round(random(1,2))
   switch(rand){
    case 1: reward.addImage(rewardImage);
    break
    case 2: reward.addImage(rewardImage2);
    break
  }
  rewardsGroup.add(reward)
  reward.lifetime = 300
}
}
function gameOver(){
    swal({
      title: `Game Over`,
      text: "Congratulations!!! You did great during the race!",
      imageUrl:
        "https://th.bing.com/th/id/R.e4ff4360872f5d471123f93ca01b3a4d?rik=4HcsG3ru8pJrzg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftrophy-clipart-transparent%2ftrophy-clipart-transparent-15.png&ehk=LYh855tVtmYr1mcppjiiJS6aG5tHsA3RJ6frI%2fX7f44%3d&risl=&pid=ImgRaw&r=0",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
      }
  

  /*function gameStart(){
    swal({
      title: `Welcome to Horse Rider!`,
      text: "To start the game, click on the right arrow key to move.",
      imageUrl: "https://th.bing.com/th/id/OIP.mYkoLTpda6m2A6gM3VC-4wHaET?pid=ImgDet&rs=1"
     /// imageSize: "100x100",
      //confirmButtonText: "Let's get Riding!",
    })
    .then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
  }*/