let inputDir={x:0 , y:0};
let foodsound=new Audio('music/food.mp3');
let gameOverSound=new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let musicsound=new Audio('music/music.mp3');
let speed=10;
let lastPainttime=0;
let snakeArr=[{x:13,y:15}];
let score=0;

let food={x:6,y:7};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPainttime)/1000<1/speed){   //everyy 0.5 sec it will paint
          return;
    }
    else{
        lastPainttime=ctime;
    }
    gameEngine();
    //console.log(ctime);
}

function isCollapse(sarr){
    for(let i=1;i<sarr.length;i++){
        const element=sarr[i];
        if(sarr[0].x==sarr[i].x && sarr[0].y==sarr[i].y){
            return true;
        }
    }
    if(sarr[0].x>=18 || sarr[0].x<0 || sarr[0].y>=18 || sarr[0].y<0){
        return true;
    }
    return false;
}



function gameEngine(){
//Part1 :Updating Snake array
musicsound.play();
if(isCollapse(snakeArr)){
  gameOverSound.play();
  musicsound.pause();
  inputDir={ x:0, y:0}; 
  alert('Press Any Key To Play Again');
  snakeArr=[{x:13,y:15}];
  musicsound.play();
  score = 0;
}

//if u have eaten the food increment and regenerate the food
if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
    foodsound.play();
    score++;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    //unshifts appends to the start of the array
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    // to generate random numbers between a and b 
}

// moving the snake
for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]}; // we dont want referencing issues  hence... is added
}
snakeArr[0]={x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y};



//Part2: Render Snake and Food
//Display Snake
document.querySelector('#board').innerHTML="";
snakeArr.forEach((element,index)=>{
  snakeElement=document.createElement('div');
  snakeElement.style.gridRowStart=element.y;
  snakeElement.style.gridColumnStart=element.x;
  
  if(index==0){
    snakeElement.classList.add('head');
  }
  else{
    snakeElement.classList.add('snake');
  }
  board.appendChild(snakeElement);
})

//Display the food
FoodElement=document.createElement('div');
FoodElement.style.gridRowStart=food.y;
FoodElement.style.gridColumnStart=food.x;
FoodElement.classList.add('food');
board.appendChild(FoodElement);
}












//Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir={x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
           console.log("ArrowUp");
        break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            console.log("ArrowDown");
        break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            console.log("ArrowLeft");
        break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            console.log("ArrowRight");
        break;
        default:
        break;
    }
})