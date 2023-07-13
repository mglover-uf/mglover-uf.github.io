// Created by Alex Garcia, 2022-23
// ALEX Labs

// Checks for button press (or release) and does associate hot keys task (hotKeys.js)
document.onkeydown = checkKey;
document.onkeyup   = checkKeyUp;

var CHANGE_INT_OPEN = false;

function hover(element) {
  /* Hovering over an element turns it white

  Inputs:
  element - hovered over element

  */
  element.style.backgroundColor = 'white';
}

function unhover(element) {
  /* "un-Hovering" an element turns it dark gray again

  Inputs:
  element - hovered over element

  */
  element.style.backgroundColor = 'darkgray';
}

function checkKeyUp(e) {
  /* When you stop pressing a key, return it to its original color

  Inputs:
  e - used to find the key user pressed

  */
  e = e || window.event;

 if (e.keyCode == '87' || e.keyCode == "38") { // W or Up - move image north
    unhover(northButton);
 } else if (e.keyCode == '83' || e.keyCode == "40") { // S or Down - move image south
    unhover(southButton);
 } else if (e.keyCode == '65' || e.keyCode == "37") { // A or Left - move image east
    unhover(eastButton);
 } else if (e.keyCode == '68' || e.keyCode == "39") { // D or Right - move image west
    unhover(westButton);
 }
}

function blur_() {
  /* Unfocus from integration time element (only potential active element in script)

  */
  document.activeElement.blur();
}

function checkKey(e) {
  /* Perform a specific action based on the key the user pressed

  Inputs:
  e - used to find the key user pressed
  */
  e = e || window.event;
  if (e.keyCode == '87' || e.keyCode == "38") { // W or Up - move image north
    e.preventDefault();
    blur_();
    hover(northButton);
    north();
  } else if (e.keyCode == '83' || e.keyCode == "40") { // S or Down - move image south
    e.preventDefault();
    blur_();
    hover(southButton);
    south();
  } else if (e.keyCode == '65' || e.keyCode == "37") { // A or Left - move image east
    e.preventDefault();
    blur_();
    hover(eastButton);
    east();
  } else if (e.keyCode == '68' || e.keyCode == "39") { // D or Right - move image west
    e.preventDefault();
    blur_();
    hover(westButton);
    west();
  } else if (e.keyCode == '192') { //` ~ - toggle increment button
    blur_();
    changeIncrement();
  } else if (e.keyCode == '219') { // [ - rapid slew
    blur_();
    if (!changingInt) {
      inc(RAPID);
    }
  } else if (e.keyCode == '221') { // ] - nominal slew
    blur_();
    if (!changingInt) {
      inc(NOMINAL);
    }
  } else if (e.keyCode == '220') { // \ - slow slew
    blur_();
    if (!changingInt) {
      inc(SLOW);
    }
  } else if (e.keyCode == '13') { // Enter - Take Spectrum
    e.preventDefault();
    blur_();
    if ( (zoomOutBool) && (!takingSpectrum) ) {
      buttonPress();
    }
  } else if (e.keyCode == '70') { // F - show all Fields
    blur_();
    showAll();
  } else if (e.shiftKey && e.keyCode == '9') { // Shift+Tab - switch between fields backwards
    blur_();
    e.preventDefault();
    autoSwitch('backward');
  } else if (e.keyCode == '9') { // Tab - switch between fields forwards
    blur_();
    e.preventDefault();
    autoSwitch('forward');
  } else if (e.keyCode == '79') { // O - open/close dome
    blur_();
    if ((close) && (!move)) {
      animateDoorsOpen();
    } else if ((open) && (move)) {
      animateDoorsClose();
    }
  } else if (e.keyCode == '90') { // Z - zoom In/Out as appropriate
    blur_();
    if (zoomOutBool) {
      zoomOut();
    } else {
      zoomIn();
    }
  } else if (e.keyCode == '84') { // T - Change integration time
    if (!CHANGE_INT_OPEN) {
      intToggle();
      CHANGE_INT_OPEN = true;
    } else {
      document.getElementById('intTime').focus();
    }
  } else if (e.keyCode == '191') { // / ? - show hot keys
    blur_();
    if (!takingSpectrum) {
      hotKeysDiv();
    }
  } else if (
      e.keyCode == '48' || e.keyCode == '49' || e.keyCode == '50' ||
      e.keyCode == '51' || e.keyCode == '52' || e.keyCode == '53' ||
      e.keyCode == '54' || e.keyCode == '55' || e.keyCode == '56' ||
      e.keyCode == '57' || e.keyCode == '8'
    ) { // Any Number or backspace - focus on the intTime, if that box is open
      if (CHANGE_INT_OPEN) {
        document.getElementById('intTime').focus();
      }
  }
}

var hotKeysModal = document.getElementById("hotKeys");

function hotKeysDiv() {
  /* Display the div containing all of the hot keys information

  */
  hkDiv                          = document.getElementById("hotKeys")
  hkDiv.style.display            = hkDiv.style.display != 'none' ? 'none' : 'block';
  hkButton                       = document.getElementById('hotKeysButton')
  hkButton.innerHTML             = hkButton.innerHTML != 'Hide Hot Keys' ? 'Hide Hot Keys' : 'Show Hot Keys';
  hkButton.style.backgroundColor = hkButton.style.backgroundColor != 'white' ? 'white' : 'darkgray';
}