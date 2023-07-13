// Created by Alex Garcia, 2022-23
// ALEX Labs

/*
    Mystery 1 -- Hydrogen
    Mystery 2 -- Mercury
    Mystery 3 -- Helium
    Mystery 4 -- Sodium
*/

// Absorbing values for different elements
//
// Highly Likely
var allGasEnergy = {
    "mystery1": [1.9, 2.6, 2.9],
    "mystery2": [2.3, 2.8],
    "mystery3": [1.9, 2.1, 2.5, 2.8],
    "mystery4": [2.1]
}
// Weakly Likely 
var allGasWeak = {
    "mystery1": [3.3],
    "mystery2": [2.1, 3.1],
    "mystery3": [1.8, 2.9, 3.3],
    "mystery4": [2.4]
}

var animation = false;
var sleeptime = 500; // Wait 500ms after each photon
var theta = 0; // Default to straigh-line path

var x = 375; // initial x
var y = 250; // initial y

// Probabilty of absorption
var pAbs = 0;
var pAbsLow = 0;
var pAbsMedium = 0.275;
var pAbsHigh = 0.55;

// Probability of deflection
var pDef = 0;
var pDefAbsorber = 0;
var pDefAbsWeak = 0.1;
var pDefElse = 0.075;

// Catch and iterate how many photons hit the screen
var TOTAL_OBS = 0;
var TOTAL_EMIT = 0;

var going = false;

var BLINKING = false;
var blinkInterval = '';

// Colors corresponding to each energy
// Used for color blind mode
var COLORS = {
    1.6:"Dark Red",
    1.7:"Red",
    1.8:"Red",
    1.9:"Light Red",
    2.0:"Dark Orange",
    2.1:"Light Orange",
    2.2:"Yellow",
    2.3:"Bright Green",
    2.4:"Green",
    2.5:"Cyan",
    2.6:"Light Blue",
    2.7:"Blue",
    2.8:"Dark Blue",
    2.9:"Dark Blue",
    3.0:"Light Purple",
    3.1:"Purple",
    3.2:"Purple",
    3.3:"Violet",
    3.4:"Violet",
    3.5:"Violet"
}

// Different colored mediums
var medium_color = {
    "mystery1": 'green',
    "mystery2": 'blue' ,
    "mystery3": 'red'  ,
    "mystery4": 'white'
}