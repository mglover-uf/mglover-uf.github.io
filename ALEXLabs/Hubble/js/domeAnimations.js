// Created by Alex Garcia, 2022-23
// ALEX Labs
//
// DOME ANIMATIONS
//
// Dome is default closed (called by closedDome()
//
// Animation is created by "animateDoorsOpen()" which calls "openDome()" iteratively
//
// "telescopeFrame()" is called on any movement (i.e. east/west, zoomIn/Out) to draw the Canvas
//
// Animation for closing the dome is in "animateDoorsClose()" which calles "closeDome()" iteratively

var interval_tracker = "";
var fps = 10; // throttles animation speed

var changeAnimation = 5; // how far the doors move in each frame of animation

var domeLocLeft  = 375; // location of center of doors -- starts closed at 375
var domeLocRight = 375;
var width = 125; // door width

// Image Height and Width Ratio is 4/3
// If you change these you will have to change the galaxy positions in constants.js
var imgWidth  = 300; 
var imgHeight = 225;

// Default positions of the image
var xpos = 60;
var ypos = 80;

function animateDoorsOpen() {
  /* Opens the doors

  */
  interval_tracker = setInterval(function(){ //throttle requestAnimationFrame to 20fps
       requestAnimationFrame(openDome);
  }, 1000/fps)
}

function animateDoorsClose() {
  /* Closes the doors

  */
  interval_tracker = setInterval(function(){ //throttle requestAnimationFrame to 20fps
       requestAnimationFrame(closeDome);
  }, 1000/fps)
  ctx.fillStyle="darkgray";
  ctx.strokeRect(250, 50, 250, 350);
}

function closedDome() {
  /* default behavior of the dome -- hides the Canvas element

  Not to be confused with closeDome(), which actively closes the dome
  */
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 200, 500);
  ctx.fillRect(550, 0, 200, 500);

  ctx.fillStyle = 'darkgray';
  ctx.fillRect(200, 0, 350, 500);

  ctx.strokeStyle = 'black';
  ctx.linewidth = 10;
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(550, 0);
  ctx.lineTo(550, 500);
  ctx.stroke();

  // dome doors
  
  ctx.strokeRect(250, 50, 125, 350);
  ctx.strokeRect(375, 50, 125, 350);

  ctx.strokeStyle = 'darkgray';
  ctx.beginPath(); 
  ctx.moveTo(375, 50);
  ctx.lineTo(375, 400);
  ctx.stroke();
}

function openDome() {
  /* Creates animation for opening the dome

  */
  document.getElementById("fieldDisplay").innerHTML = 'Target: ' + whichZoomIn[currentField];
  close = false;
  move  = true;
  document.getElementById("openButton").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 200, 500);
  ctx.fillRect(550, 0, 200, 500);

  ctx.fillStyle = 'darkgray';
  ctx.fillRect(200, 0, 350, 500);
  
  ctx.strokeStyle = 'black';
  ctx.linewidth = 10;
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(550, 0);
  ctx.lineTo(550, 500);
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.fillRect(250, 50, 250, 350);

  ctx.drawImage(image, xpos, ypos, imgWidth, imgHeight, 250, 50, 250, 350);

  if (domeLocLeft < 250) {
    window.clearInterval(interval_tracker);
    ctx.fillStyle = 'black';
    ctx.fillRect(250, 50, 250, 350);
    telescopeFrame();
    open = true;

    document.getElementById("closeButton").style.display = "block";
    if (zoomOutBool) {
      document.getElementById("zoomOut").style.display = "block";
      document.getElementById("takeSpectrum").style.display = "block";
    } 
    if (zoomInBool) {
      document.getElementById("zoomIn").style.display = "block";
    }
  }

  domeLocLeft  = domeLocLeft - changeAnimation;
  domeLocRight = domeLocRight + changeAnimation;
  width = width - changeAnimation;
 
  // dome doors
  ctx.strokeRect(250, 50, 250, 350);  
  ctx.fillStyle="darkgray";
  ctx.fillRect(domeLocLeft , 50, -width, 350);
  ctx.fillRect(domeLocRight, 50, width, 350);

  ctx.strokeStyle = 'darkgray';
  ctx.beginPath(); 
  ctx.moveTo(domeLocLeft, 50);
  ctx.lineTo(domeLocLeft, 400);
  ctx.stroke();
  ctx.beginPath(); 
  ctx.moveTo(domeLocRight, 50);
  ctx.lineTo(domeLocRight, 400);
  ctx.stroke();
}

function closeDome() {
  /* Creates animation for closing the dome

  */
  open = false;
  move = false;
  document.getElementById("closeButton").style.display = "none";
  document.getElementById("openButton").style.display = "none";
  document.getElementById("zoomIn").style.display = "block";
  document.getElementById("zoomOut").style.display = "none";
  document.getElementById("takeSpectrum").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 200, 500);
  ctx.fillRect(550, 0, 200, 500);

  ctx.fillStyle = 'darkgray';
  ctx.fillRect(200, 0, 350, 500);
  
  ctx.strokeStyle = 'black';
  ctx.linewidth = 10;
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(550, 0);
  ctx.lineTo(550, 500);
  ctx.stroke();

  domeLocLeft  = domeLocLeft + changeAnimation;
  domeLocRight = domeLocRight - changeAnimation;
  width = width + changeAnimation;

  if (domeLocLeft > 375) {
    document.getElementById("openButton").style.display = "block";
    zoomOut();
    ctx.fillStyle = 'black';
    ctx.linewidth = 10;
    ctx.fillRect(250, 50, 250, 350);    
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(375,50);
    ctx.lineTo(375,400);
    ctx.stroke();
  
    // dome doors
    ctx.fillStyle="darkgray";
    ctx.strokeRect(250, 50, 250, 350);  
    ctx.fillRect(domeLocLeft , 50, -width, 350);
    ctx.fillRect(domeLocRight, 50, width, 350);
    
    ctx.strokeStyle = 'black';
    ctx.linewidth = 10;
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 500);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(550, 0);
    ctx.lineTo(550, 500);
    ctx.stroke();

    close = true;
    
    window.clearInterval(interval_tracker);

  } else {
    
 
    ctx.fillStyle = 'black';
    ctx.fillRect(250, 50, 250, 350);  
    ctx.drawImage(image, xpos, ypos, imgWidth, imgHeight, 250, 50, 250, 350);
 
    // dome doors
    ctx.strokeRect(250, 50, 250, 350);  
    ctx.fillStyle="darkgray";
    ctx.fillRect(domeLocLeft , 50, -width, 350);
    ctx.fillRect(domeLocRight, 50, width, 350);

    ctx.strokeStyle = 'darkgray';
    ctx.beginPath(); 
    ctx.moveTo(domeLocLeft, 50);
    ctx.lineTo(domeLocLeft, 400);
    ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(domeLocRight, 50);
    ctx.lineTo(domeLocRight, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(domeLocLeft,50);
    ctx.lineTo(domeLocLeft,400);
    ctx.stroke();
  }
  // if blinking warning is open, close it
  closeBlinker();
}

function telescopeFrame() {
  /* inverse of "closeDome()" this adds everything back when called upon and doesn't hide the Canvas element

  */
  onGalaxyChecker();
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, 200, 500);
  ctx.fillRect(550, 0, 200, 500);

  ctx.fillStyle = 'darkgray';
  ctx.fillRect(200, 0, 350, 500);
  
  ctx.strokeStyle = 'black';
  ctx.linewidth = 10;
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 500);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(550, 0);
  ctx.lineTo(550, 500);
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.fillRect(250, 50, 250, 350);

  ctx.drawImage(image, xpos, ypos, imgWidth, imgHeight, 250, 50, 250, 350);

  ctx.strokeRect(250, 50, 250, 350);

  ctx.beginPath();
  ctx.strokeStyle = 'red';

  var topSpec    = 200;
  var bottomSpec = 230;

  ctx.moveTo(370, topSpec);
  ctx.lineTo(370, bottomSpec);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(380, topSpec);
  ctx.lineTo(380, bottomSpec);
  ctx.stroke();
}