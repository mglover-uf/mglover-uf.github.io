// Created by Alex Garcia, 2022-23
// ALEX Labs

var APP_MAGS = {
  "Perseus":14.3,
  "UrsaMinor":12.1,
  "UrsaMajor":10.8,
  "LeoMinor":11.6,
  "Draco":13.2
}; // No units

var DISTS   = {
  "Perseus":76.7,
  "UrsaMinor":33.0,
  "UrsaMajor":25.6,
  "LeoMinor":30.1,
  "Draco":52.5
}; //Mpc 
// Numbers from web -- I altered the redshifts slightly to get a cleaner H_0

var TRUE_REDSHIFTS = {
  "Perseus":0.01688, 
  "UrsaMinor":0.006891,
  "UrsaMajor":0.003496,
  "LeoMinor":0.00523,
  "Draco":0.009807
}; // No units 

var CALCIUM_H = 3969; // Angstroms
var CALCIUM_K = 3934; 

var RAPID = 15; // Three different slew speeds for telescope
var NOMINAL = 5;
var SLOW = 1;

var CLICK_FROM_CENTER = 1; // Multiplier used in readibilty of spectrum

// Below are the Objects used to flip through galaxies/fields.
//
// If fields are changed these will need to be updated

// Extent of the galaxies on the image: xmin, xmax, ymin, ymax
var allGalExtent = {
  "Perseus": [323, 346, 158, 183],
  "UrsaMinor": [245, 312, 52, 93],
  "UrsaMajor": [506, 535, 270, 320],
  "LeoMinor": [215, 250, 192, 209],
  "Draco": [556, 596, 300, 337]
};

var whichZoomIn = {
  "Perseus": "NGC1260",
  "UrsaMinor": "NGC5452",
  "UrsaMajor": "M109",
  "LeoMinor": "NGC3294",
  "Draco": "NGC6143"
}

var whichZoomOut = {
  "Perseus": "zoomImageField1",
  "UrsaMinor": "zoomImageField2",
  "UrsaMajor": "zoomImageField3",
  "LeoMinor": "zoomImageField4",
  "Draco": "zoomImageField5"
}

var imageCreditsObj = {
  "Perseus": "https://en.wikipedia.org/wiki/NGC_1260#/media/File:NGC_1260-HST10877_38R814GB555.png",
  "UrsaMinor": "https://cseligman.com/text/atlas/ngc54a.htm#5452",
  "UrsaMajor": "http://annesastronomynews.com/photo-gallery-ii/galaxies-clusters/messier-109-ngc-3992/",
  "LeoMinor": "http://www.caelumobservatory.com/gallery/n3294.shtml",
  "Draco": "http://skyserver.sdss.org/dr14/SkyServerWS/ImgCutout/getjpeg?TaskName=Skyserver.Chart.Image&ra=245.426146&dec=+55.086131&scale=0.3&width=800&height=800&opt=&query="
}

// Center of galaxy: xcenter, ycenter, rough extent
var zoomGalaxyCenters = {  
  "Perseus": [150, 238, 20],
  "UrsaMinor": [224, 270, 40],
  "UrsaMajor": [420, 342, 50],
  "LeoMinor": [405, 389, 40],
  "Draco": [169, 215, 50]
};

// Which field corresponds to which constellation
// zoom image -> Constellation
var whichIsWhich = {
  "zoomImageField1":"Perseus",
  "zoomImageField2":"UrsaMinor",
  "zoomImageField3":"UrsaMajor",
  "zoomImageField4":"LeoMinor",
  "zoomImageField5":"Draco"
};

// Which constellation corresponds to which field
// Constellation -> zoom image
var whichIsWhichBackward = {
  "Perseus":"zoomImageField1",
  "UrsaMinor":"zoomImageField2",
  "UrsaMajor":"zoomImageField3",
  "LeoMinor":"zoomImageField4",
  "Draco":"zoomImageField5"
};

// Which zoom image corresponds to which Field
// zoom image -> Field
var colorHelper = {
  "zoomImageField1":"Field1",
  "zoomImageField2":"Field2",
  "zoomImageField3":"Field3",
  "zoomImageField4":"Field4",
  "zoomImageField5":"Field5"
};
