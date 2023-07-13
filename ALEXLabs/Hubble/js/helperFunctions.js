// Created by Alex Garcia, 2022-23
// ALEX Labs

var changingInt = false; // are we changing the integration time? If so don't allow changing slew speed

var increment = RAPID; // Default Slewing Speed of the telescope is Rapid (variables in constants.js)

// Used for warning message trying to change fields while the telescope is open
var BLINKING = false;
var blinkInterval = '';

// document elements for different increments
var bigInc   = document.getElementById('bigInc');
var smallInc = document.getElementById('smallInc');
var tinyInc  = document.getElementById('tinyInc');

bigInc.onclick   = function() {inc(RAPID)};
smallInc.onclick = function() {inc(NOMINAL)};
tinyInc.onclick  = function() {inc(SLOW)};

bigInc.style.backgroundColor   = "white"; // default to fastest slew speed
smallInc.style.backgroundColor = "darkgray";
tinyInc.style.backgroundColor  = "darkgray";

function inc(newIncrement) {
  /* Change the slew speed of the telescope and update the colors

  Note that the only increments that this works for are RAPID, NOMINAL, and SLOW

  Inputs:
  newIncrement - increment to update to
  */
  newIncrement = parseInt(newIncrement);

  increment = newIncrement;

  if (newIncrement == RAPID) {
    bigInc.style.backgroundColor   = 'white';
    smallInc.style.backgroundColor = 'darkgray';
    tinyInc.style.backgroundColor  = 'darkgray';
  } else if (newIncrement == NOMINAL) {
    bigInc.style.backgroundColor   = 'darkgray';
    smallInc.style.backgroundColor = 'white';
    tinyInc.style.backgroundColor  = 'darkgray';
  } else if (newIncrement == SLOW) {
    bigInc.style.backgroundColor   = 'darkgray';
    smallInc.style.backgroundColor = 'darkgray';
    tinyInc.style.backgroundColor  = 'white';
  }
}

function changeIncrement() {
  /* Hide or show the options for changing the slew speed

  Note that you can change the slew speed without this menu being open
  */
  var changeSlewButton = document.getElementById("changeSlew");

  changeSlewButton.style.backgroundColor = changeSlewButton.style.backgroundColor === "darkgray" ? 'white':'darkgray'; 

  bigInc.style.display   = bigInc.style.display   != 'none'? 'none' : 'block';
  smallInc.style.display = smallInc.style.display != 'none'? 'none' : 'block';
  tinyInc.style.display  = tinyInc.style.display  != 'none'? 'none' : 'block';
}

function intToggle() {
  /* Hide or show the integration time menu

  */
  if (changingInt) {
    changingInt = false;
  } else if (!changingInt) {
    changingInt = true;
  }

  var intInput = document.getElementById("intTime");
  intInput.style.display = intInput.style.display != 'none' ? 'none' : 'block';

  var intToggleButton = document.getElementById("intToggleButton");

  if (intToggleButton.style.backgroundColor === 'darkgray') {
    intToggleButton.style.backgroundColor = 'white';
  } else {
    intToggleButton.style.backgroundColor = 'darkgray';
    CHANGE_INT_OPEN = false;
  }
  document.getElementById('intTime').focus();
}

function onGalaxyChecker() {
  /* Check if the use is over the correct galaxy in the field

  If the user is over the correct galaxy, allow the option to zoom in

  */
  var extent = allGalExtent[currentField];
  var xmin = extent[0];
  var xmax = extent[1];
  var ymin = extent[2];
  var ymax = extent[3];
  if ((xpos > xmin) && (xpos < xmax) && (ypos > ymin) && (ypos < ymax)) {
    zoomInBool = true;
    overGalaxy = true;
    document.getElementById("zoomIn").style.backgroundColor  = "white";
  } else {
    zoomInBool = false;
    overGalaxy = false;
    document.getElementById("zoomIn").style.backgroundColor  = "darkgray";
  }
}

function showAll() {
  /* Show all of the possible fields you can change to

  */
  var changeFieldButton = document.getElementById("changeField")

  if (changeFieldButton.style.backgroundColor === 'darkgray') {
    changeFieldButton.style.backgroundColor = 'white';
  } else {
    changeFieldButton.style.backgroundColor = 'darkgray';
  }

  field1 = document.getElementById("Field1");
  field1.style.display = field1.style.display != 'none'? 'none' : 'block';
  
  field2 = document.getElementById("Field2");
  field2.style.display = field2.style.display != 'none'? 'none' : 'block';
  
  field3 = document.getElementById("Field3");
  field3.style.display = field3.style.display != 'none'? 'none' : 'block';

  field4 = document.getElementById("Field4");
  field4.style.display = field4.style.display != 'none'? 'none' : 'block';

  field5 = document.getElementById("Field5");
  field5.style.display = field5.style.display != 'none'? 'none' : 'block';
}

function switchImage(which2switch) {
  /* Change the field image you're looking at

  This includes updating the parameters of the target galaxy and resetting zoom parameters

  If the dome is still open when this function is called, a pop-up warning will appear to warn the user

  Inputs:
  which2switch - name of new field that user has selected
  */
  if ((!move) && (close)) {
    image = document.getElementById(which2switch);
  
    currentField = whichIsWhich[which2switch];
    TRUE_REDSHIFT = TRUE_REDSHIFTS[currentField];
    APP_MAG       = APP_MAGS[currentField];
    DIST          = DISTS[currentField];

    CALCIUM_H_REDSHIFTED = CALCIUM_H + CALCIUM_H * TRUE_REDSHIFT;
    CALCIUM_K_REDSHIFTED = CALCIUM_K + CALCIUM_K * TRUE_REDSHIFT;

    document.getElementById("appMag").innerHTML       = APP_MAG;
    document.getElementById("galaxyName").innerHTML   = whichZoomIn[currentField];
    document.getElementById("fieldDisplay").innerHTML = 'Target: ' + whichZoomIn[currentField];

    zoomOutBool = false;

    document.getElementById('intTime').value = '';

    imgName = which2switch;
    xpos = 60;
    ypox = 40;
    document.getElementById('domeWarning').style.display = 'none';
    document.getElementById('domeWarning').innerHTML = '';
    BLINKING = false;
    window.clearInterval(blinkInterval);
    cHelp = colorHelper[which2switch]

    document.getElementById(cHelp).style.backgroundColor = 'white';    

    keys = Object.keys(colorHelper);
    for (var i = 0; i < keys.length; ++i) {
      if (keys[i] != which2switch) {
        document.getElementById(colorHelper[keys[i]]).style.backgroundColor = 'darkgray';
      }
    }

  } else {
    document.getElementById('domeWarning').style.display = 'block';
    document.getElementById('domeWarning').innerHTML = 'You must close the dome before you can change fields (click this to close this pop-up)';
    if (!BLINKING) {
      blinkInterval = setInterval(function() {
        flashtext('domeWarning', 'red');
        flashbackground('domeWarning', 'white');
      }, 750 );
      BLINKING = true;
    }
  }
}

function closeBlinker() {
  /* Get rid of the blinking warning message

  */
  document.getElementById('domeWarning').style.display = 'none';
  document.getElementById('domeWarning').innerHTML = '';
  BLINKING = false;
  window.clearInterval(blinkInterval);
}

function flashtext(ele, col) {
  /* Flash text of element a certain color

  Inputs:
  ele - desired element whose text to flash
  col - desired color to flash

  */
  var colCheck = document.getElementById(ele).style.color;

  if (colCheck === 'white') {
    document.getElementById(ele).style.color = col;
  } else {
    document.getElementById(ele).style.color = 'white';
  }
}

function flashbackground(ele, col) {
  /* Flash element a certain color

  Inputs:
  ele - desired element to flash
  col - desired color to flash

  */
  var colCheck = document.getElementById(ele).style.backgroundColor;

  if (colCheck === 'red') {
    document.getElementById(ele).style.backgroundColor = col;
  } else {
    document.getElementById(ele).style.backgroundColor = 'red';
  }
}

function autoSwitch(direction) {
  /* Helper function for pressing Tab (or Shift+Tab) to switch to new field

  Inputs:
  direction - String "forward" or "backward" to switch up or down the list
  */
  keys = Object.keys(whichIsWhichBackward);

  var currentIndex = keys.indexOf(currentField);
  var nextIndex    = -1;  


  if (direction === 'forward') {
    nextIndex = currentIndex + 1;
    if (nextIndex > keys.length - 1) {
      nextIndex = 0;
    }
  } else if (direction = 'backward') {
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = keys.length - 1;
    }
  }

  switchImage(whichIsWhichBackward[keys[nextIndex]]);
}

function random(min, max) {
  /* Return a random number

  Inputs:
  min - minimum number to return
  max - maximum number to return

  Output:
  float - random number between min and max

  */
  return Math.random() * (max - min) + min;
}

function generateGaussian(mean,std){
  /* Generate a single number drawn from a Gaussian distribution

  Input:
  mean - mean of distribution
  std - standard deviation of distribution

  Output:
  float - number randomly drawn from Gaussian distribution
  */
  var _2PI = Math.PI * 2;
  var u1 = Math.random();
  var u2 = Math.random();
  
  var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
  var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

  return z1 * std + mean;
}

function updateClickFromCenter() {
  /* Measure how far the user is from the center of the galaxy

  Update the CLICK_FROM_CENTER variable, which scales the height of the distribution

  If the user clicks very far from center, the absorption line will be very weak
  */
  currentGalaxyCenter = zoomGalaxyCenters[currentField];
  var xcenter = currentGalaxyCenter[0];
  var ycenter = currentGalaxyCenter[1];
  var roughExtent = currentGalaxyCenter[2];

  var distance = ( (xpos - xcenter) ** 2 + (ypos - ycenter) ** 2 ) ** (1/2);

  if (emptyField) {
    CLICK_FROM_CENTER = 0.0;
  } else if (distance < roughExtent) {
    CLICK_FROM_CENTER = 1;
  } else if (distance < roughExtent*1.15) {
    CLICK_FROM_CENTER = 0.25;
  } else if (distance < roughExtent*1.5) {
    CLICK_FROM_CENTER = 0.1;
  } else {
    CLICK_FROM_CENTER = 0.01;
  }
}