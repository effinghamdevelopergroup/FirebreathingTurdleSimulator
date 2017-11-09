var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;
var player = {
  x: width / 2,
  y: height - 5,
  width: 5,
  height: 5,
  speed: 2,
  velocityX: 0,
  velocityY: 0,
  jumping: false};
var keys = [];
var friction = 0.8;
var gravity = 0.3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "blue";
ctx.fillRect(player.x, player.y, player.width, player.height);
/*
  var c = canvas.getContext(2d);
  c.fillRect(100, 100, 100, 100);
*/
console.log(canvas);

function update(){
  // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velocityY = -player.speed*2;
      }
    }
    if (keys[39]) {
        // right arrow
        if (player.velocityX < player.speed) {
            player.velocityX++;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velocityX > -player.speed) {
            player.velocityX--;
        }
    }

    player.velocityX *= friction;

    player.velocityY += gravity;

    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }

  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
}
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    update();
});
