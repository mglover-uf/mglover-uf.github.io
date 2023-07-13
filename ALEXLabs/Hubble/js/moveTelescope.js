// Created by Alex Garcia, 2022-23
// ALEX Labs

var b4zoomx = 0; // positions before zooming (used to zoom out to the same location)
var b4zoomy = 0;

function zoomIn() {
  /* Zoom in on a galaxy

  Note that this only works if you're near the correct galaxy in the field image

  */
  if (open) {
    b4zoomx = xpos;
    b4zoomy = ypos;
    xpos = 40;
    ypox = 60;
    if (zoomInBool) {
      zoomOutBool = true;
      which = whichZoomIn[currentField];
      image = document.getElementById(which);
      document.getElementById("zoomOut").style.display = "block";
      document.getElementById("zoomIn").style.display  = "none";
      document.getElementById("takeSpectrum").style.display = "block";
      zoomInBool = false;
      emptyField = false;
    } else {
      image = document.getElementById("emptyField");
      document.getElementById("zoomOut").style.display = "block";
      document.getElementById("zoomIn").style.display  = "none";
      document.getElementById("takeSpectrum").style.display = "block";
      zoomOutBool = true;
      emptyField = true;
    }
    telescopeFrame();
  }
}

function zoomOut() {
  /* Return back to the field image after looking at the target galaxy close-up

  */
  xpos = b4zoomx;
  ypos = b4zoomy;
  zoomOutBool = false;
  which = whichZoomOut[currentField];
  image = document.getElementById(which);
  telescopeFrame();
  document.getElementById("zoomOut").style.display = "none";
  document.getElementById("zoomIn").style.display  = "block";
  document.getElementById("takeSpectrum").style.display = "none";
  onGalaxyChecker();
}

function west() {
  /* Move the image west (right) if you're allowed to move

  */
  if ((move) && (open)) {
    if (xpos + increment < image.width - imgWidth) {
      xpos = xpos + increment;
      telescopeFrame();
    }
  }
}

function east() {
  /* Move the image east (left) if you're allowed to move

  */
  if ((move) && (open)) {
    if (xpos - increment > 0) {
      xpos = xpos - increment;
      telescopeFrame();
    }
  }
}

function north() {
  /* Move the image north (up) if you're allowed to move

  */
  if ((move) && (open)) {
    if (ypos - increment > 0) {
      ypos = ypos - increment;
      telescopeFrame();
    }
  }
}

function south() {
  /* Move the image south (down) if you're allowed to move

  */
  if ((move) && (open) ) {
    if (ypos + increment < image.height - imgHeight) {
      ypos = ypos + increment;
      telescopeFrame();
    }
  }
}
