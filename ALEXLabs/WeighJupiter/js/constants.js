// Created by Alex Garcia, 2022-23
// ALEX Labs

var NUMBER_OF_FRAMES = 71; // in gif

var start = 0; // Starting time (in hours)
var startString = String(start); // Convert hours to string

var SCALE = 5; // Scale of view -- zooming in changes this

var JUPITER_DAY = 10; // Hours

var TIME_PER_FRAME = JUPITER_DAY / NUMBER_OF_FRAMES;

var DESIRED_TIME = 0.75; // Get desired number of hours from slider
var NUM_ITER = Math.round(DESIRED_TIME / TIME_PER_FRAME); // how many frames to advance by

// Slider for the timestep
var slider = document.getElementById("myRange");
var output = document.getElementById("desired");
output.innerHTML = slider.value;

var TIMING = TIME_PER_FRAME; // Default to individual frames
var DESIRED_TIME = parseInt(slider.value); // Get desired number of hours from slider
var NUM_ITER = Math.round(DESIRED_TIME / TIME_PER_FRAME); // how many frames to advance by

slider.oninput = function () {
    output.innerHTML = slider.value;
    DESIRED_TIME = parseInt(slider.value);
    changeTiming();
}

// Slider for the zoom in/out
var slider2 = document.getElementById("zoomRange");
var output2 = document.getElementById("zoom");
output2.innerHTML = String( parseInt( 600 / parseFloat(slider2.value) ) ) + "x";

slider2.oninput = function() {
  output2.innerHTML = String( parseInt( 600 / parseFloat(slider2.value) ) ) + "x";
  SCALE = parseFloat(slider2.value);
  changeScale();
}

var yStart = 0;
var yHeight = 0;

// Variables for each moon's initial position
var IOx = 0;
var IOy = 0;

var EUROPAx = 0;
var EUROPAy = 0;

var GANYMEDEx = 0;
var GANYMEDEy = 0;

var CALLISTOx = 0;
var CALLISTOy = 0;

var JW = 105/SCALE;

var COLOR_BLIND = false;