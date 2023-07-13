// Created by Alex Garcia, 2022-23
// ALEX Labs

function init() {
    /* Initialize the animation

    */
    animation = window.requestAnimationFrame(draw);
}

function draw() {
    /* Create the photon path

    This function is designed to be called iteratively and performs a series of checks to see if the photon is absorbed/deflected

    It makes additional checks on whether the photon is still on screen or at the height of the detector

    See detailed documentation below for specific details
    */
    var SLIDER_HIDDEN = document.getElementById('myRange');
    const canvas      = document.getElementById('canvas');
    const ctx         = canvas.getContext('2d');

    // Fill in gas
    ctx.fillStyle = medium_color[values];
    ctx.globalAlpha = 0.025;
    ctx.beginPath();
    ctx.fillRect(0, 100, 750, 200);
    ctx.stroke();
    // Create boundary of gas
    ctx.strokeStyle = medium_color[values];
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.lineWidth = 5;
    ctx.moveTo(0, 300);
    ctx.lineTo(750, 300);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(0, 100);
    ctx.lineTo(750, 100);
    ctx.stroke();

    // Create detector
    var detector_height = 25;
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(250, detector_height);
    ctx.lineTo(500, detector_height);
    ctx.stroke();

    var WL    = wavelengtheVConverter(document.getElementById("energy").innerHTML); // get wavelength from energy slider
    var color = wavelengthToColor(WL); // get color of wavelength
    var repeats = parseInt(document.getElementById("repeats").value) // Number of photons to shoot

    if (isNaN(repeats)) {
        // Pretty sure this is unnecessary
        repeats = 1;
    }

    document.getElementById("energy").style.color = color; // Change the color of all the elements

    // start the photon path
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);

    // helpers for the next "timestep"
    var pertx = 0;
    var perty = 0;

    // Gas limits
    var gas_limit_low  = 115;
    var gas_limit_high = 300;

    // Detector limits
    var detector_limit_low  = 235;
    var detector_limit_high = 515;

    // Screen limits
    var screen_low  = 0;
    var screen_high = 750;

    if (y > gas_limit_high || y < gas_limit_low) {
        // If outside the gas
        if (y < (detector_height + 5)) {
            // If the photon reached the height of the detector (+5)

            var np1 = number + 1;
            document.getElementById("number").innerHTML = np1 + ".";

            if (x > detector_limit_low && x < detector_limit_high) {
                // If hit the detector
                document.getElementById("finish").innerHTML = "Photon Observed";
                TOTAL_OBS += 1;
            } else {
                // If didn't hit the detector
                document.getElementById("finish").innerHTML = "No Photon Observed";
            }

            if (number < repeats - 1) {
                // If still have more photons
                sleep(sleeptime);
                restart();
            } else {
                // If out of photons
                SLIDER_HIDDEN.style.display = 'block';
                document.getElementById("numEmit").innerHTML = TOTAL_EMIT;
                document.getElementById("numObs").innerHTML = TOTAL_OBS;
                if (animation) {
                    window.cancelAnimationFrame(animation)
                }
                going = false;
                return;
            }

        }

        // Unless animation ends, update the location of the photon
        pertx =  25 * Math.sin(theta);
        perty = -25 * Math.abs(Math.cos(theta));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineTo(x + pertx, y + perty);
        ctx.stroke();

        animation = window.requestAnimationFrame(draw);

        x += pertx;
        y += perty;
    } else {
        // If inside the gas
        pertx =  10 * Math.sin(theta);
        perty = -10 * Math.abs(2 * Math.cos(theta));

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        // Draw a probaility of deflection and absorption
        if (Math.random() < pDef) {
            // if deflected
            pDef = pDef / 2;
            var np1 = number + 1;
            theta = random(0, 2 * Math.PI);
            animation = window.requestAnimationFrame(draw);
        } else if (Math.random() < pAbs) {
            // if absorbed
            var np1 = number + 1;
            document.getElementById("number").innerHTML = np1 + ".";
            document.getElementById("finish").innerHTML = "No Photon Observed";
            if (number < repeats - 1) {
                sleep(sleeptime);
                restart();
            } else {
                sleep(sleeptime)
                SLIDER_HIDDEN.style.display = 'block';
                going = false;
            }
        } else if (x + pertx < screen_low || x - pertx > screen_high) {
            // if not deflected, not absorbed and off the screen
            var np1 = number + 1;
            document.getElementById("number").innerHTML = np1 + ".";
            document.getElementById("finish").innerHTML = "No Photon Observed";
            if (number < repeats - 1) {
                sleep(sleeptime);
                restart();
            } else {
                SLIDER_HIDDEN.style.display = 'block';
                document.getElementById("numEmit").innerHTML = TOTAL_EMIT;
                document.getElementById("numObs").innerHTML = TOTAL_OBS;
                if (animation) {
                    window.cancelAnimationFrame(animation)
                }
                going = false;
                return;
            }
        } else {
            // if not deflected, nor absorbed but is still on teh screen
            x += pertx;
            y += perty;
            animation = window.requestAnimationFrame(draw);
        }
        ctx.lineTo(x + pertx, y + perty)
        x += pertx;
        y += perty;
        ctx.stroke();
    }
    document.getElementById("numEmit").innerHTML = TOTAL_EMIT;
    document.getElementById("numObs").innerHTML = TOTAL_OBS;
}

function start() {
    /* Button press

    Set the hyper parameters of the photons and remove option to switch gas

    */
    going = true;
    document.getElementById('myRangeTitle').style.display   = "none";
    document.getElementById('myRange').style.display        = "none";
    document.getElementById('whichGas').style.display       = "none";
    document.getElementById('whichGasChoose').style.display = "none";

    document.getElementById('displayResult').style.display  = "block";
    document.getElementById('resultsText').style.display    = "block";
    document.getElementById('whichGasChosen').style.display = "block";

    TOTAL_EMIT = 1;
    TOTAL_OBS = 0;

    theta = 0;
    if (animation) {
        window.cancelAnimationFrame(animation)
    }
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 1; i < parseInt(document.getElementById("repeats").value); ++i) {
        s1 = "prev" + String(i);
        s2 = "prevNum" + String(i);
        document.getElementById(s1).innerHTML = "";
        document.getElementById(s2).innerHTML = "";
    }

    var slider = document.getElementById("myRange");
    if (unlikelyEnergies.includes(parseFloat(slider.value))) {
        pAbs = pAbsHigh;
        pDef = pDefAbsorber;
    } else if (weakUnlikelyEnergies.includes(parseFloat(slider.value))) {
        pAbs = pAbsMedium;
        pDef = pDefAbsWeak;
    } else {
        pAbs = pAbsLow;
        pDef = pDefElse;
    }

    x = 375;
    y = 500;
    number = 0;
    document.getElementById("number").innerHTML = "";
    document.getElementById("finish").innerHTML = "";
    init();
}

function restart() {
    /* Same as start(), but ignores all of the checks required at the beginning

    */
    TOTAL_EMIT += 1;
    if (animation) {
        window.cancelAnimationFrame(animation)
    }
    theta = 0;
    number++;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 1; i < parseInt(document.getElementById("repeats").value); ++i) {
        k = parseInt(document.getElementById("repeats").value) - i;
        j = k + 1;
        s1 = "prev" + String(j);
        s2 = "prev" + String(k);
        s3 = "prevNum" + String(j);
        s4 = "prevNum" + String(k);
        document.getElementById(s1).innerHTML = document.getElementById(s2).innerHTML;
        document.getElementById(s3).innerHTML = document.getElementById(s4).innerHTML;
    }

    if (unlikelyEnergies.includes(parseFloat(slider.value))) {
        pAbs = pAbsHigh;
        pDef = pDefAbsorber;
    } else if (weakUnlikelyEnergies.includes(parseFloat(slider.value))) {
        pAbs = pAbsMedium;
        pDef = pDefAbsWeak;
    } else {
        pAbs = pAbsLow;
        pDef = pDefElse;
    }

    document.getElementById("prev1").innerHTML    = document.getElementById("finish").innerHTML;
    document.getElementById("prevNum1").innerHTML = String(number) + ".";
    x = 375;
    y = 500;
    draw();
}