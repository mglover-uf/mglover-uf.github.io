// Created by Alex Garcia, 2022-23
// ALEX Labs

var BLINKING = false;
var blinkInterval = '';

function animate() {
    /* Create and clear canvas element for animations.

    After create and clear, add the image of Jupiter with the correct scaling

    This function is specifically for the non-continuous "Timestep" version of this lab
    */
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    Jupiter = new Image();
    Jupiter.src = 'JupiterRotating/spinning_jupiter-' + startString + '.png';

    Jupiter.onload = function () {
        var wrh       = Jupiter.width / Jupiter.height; // width ratio height
        var newWidth  = canvas.width / SCALE;
        var newHeight = newWidth / wrh;

        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth  = newHeight * wrh;
        }
        var xOffset = newWidth  < canvas.width  ? ((canvas.width  - newWidth)  / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

        context.drawImage(Jupiter, xOffset, yOffset, newWidth, newHeight);
        drawMoonsInit(yOffset, newHeight);
    }
}

function animate_continuous() {
    /* Create and clear canvas element for animations.

    After create and clear, add the image of Jupiter with the correct scaling

    This function is specifically for the continuous version of this lab
    */
    var JW = 105 / SCALE;

    context.clearRect(0, 0, canvas.width / 2 - JW, canvas.height); // clear canvas
    context.clearRect(canvas.width / 2 + JW, 0, canvas.width, canvas.height); // clear canvas
    Jupiter = new Image();
    Jupiter.src = 'JupiterRotating/spinning_jupiter-' + startString + '.png';

    Jupiter.onload = function () {
        var wrh       = Jupiter.width / Jupiter.height;
        var newWidth  = canvas.width / SCALE;
        var newHeight = newWidth / wrh;

        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth  = newHeight * wrh;
        }

        var xOffset = newWidth  < canvas.width  ? ((canvas.width  - newWidth)  / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

        context.drawImage(Jupiter, xOffset, yOffset, newWidth, newHeight);
        drawMoonsWShadow(yOffset, newHeight);
    }
}

function drawMoonsInit(y, h) {
    /* Draw the moons

    Inputs: // These are vague... I did this a long time ago
    y - vertical offset of the moons orbit
    h - height of Jupiter

    */
    var dispY = y + h / 2;

    JupiterWidth = 105 / SCALE;

    //////// Io ////////
    context.strokeStyle = 'orange';
    context.beginPath();
    context.lineWidth = 2.5;
    var I = calcIoPos(JupiterWidth);
    IOx = I[0];
    IOy = I[1];
    if ((IOx > (canvas.width / 2 - JupiterWidth) && IOx < (canvas.width / 2 + JupiterWidth)) && (IOy > 0)) {
        // do nothing if moon is behind Jupiter!
    } else {
        // Draw the moon, check if we're in colorblind mode
        if (COLOR_BLIND) {
            context.moveTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.moveTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
        } else {
            context.arc(IOx, dispY + 2, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Europa ////////
    context.strokeStyle = 'red';
    context.beginPath();
    context.lineWidth = 2.5;
    var E = calcEuropaPos(JupiterWidth);
    EUROPAx = E[0];
    EUROPAy = E[1];
    if ((EUROPAx > (canvas.width / 2 - JupiterWidth) && EUROPAx < (canvas.width / 2 + JupiterWidth)) && (EUROPAy > 0)) {
        // do nothing if moon is behind Jupiter!
    } else {
        // Draw the moon, check if we're in colorblind mode
        if (COLOR_BLIND) {
            context.moveTo(EUROPAx - 1, dispY + 1);
            context.lineTo(EUROPAx, dispY + 2);
            context.lineTo(EUROPAx + 1, dispY + 1);
            context.lineTo(EUROPAx, dispY);
            context.closePath();
        } else {
            context.arc(EUROPAx, dispY - 1, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Ganymede ////////
    context.strokeStyle = 'green';
    context.beginPath();
    context.lineWidth = 2.5;
    var G = calcGanymedePos(JupiterWidth);
    GANYMEDEx = G[0];
    GANYMEDEy = G[1];
    if ((GANYMEDEx > (canvas.width / 2 - JupiterWidth) && GANYMEDEx < (canvas.width / 2 + JupiterWidth)) && (GANYMEDEy > 0)) {
        // do nothing if moon is behind Jupiter!
    } else {
        // Draw the moon, check if we're in colorblind mode
        if (COLOR_BLIND) {
            context.moveTo(GANYMEDEx, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 4);
            context.closePath();
        } else {
            context.arc(GANYMEDEx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Callisto ////////
    context.strokeStyle = 'blue';
    context.beginPath();
    context.lineWidth = 2.5;
    var C = calcCallistoPos(JupiterWidth);
    CALLISTOx = C[0];
    CALLISTOy = C[1];
    if ((CALLISTOx > (canvas.width / 2 - JupiterWidth) && CALLISTOx < (canvas.width / 2 + JupiterWidth)) && (CALLISTOy > 0)) {
        // do nothing if moon is behind Jupiter!
    } else {
        // Draw the moon, check if we're in colorblind mode
        if (COLOR_BLIND) {
            context.moveTo(CALLISTOx - 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 3);
            context.lineTo(CALLISTOx - 2, dispY + 3);
            context.closePath();
        } else {
            context.arc(CALLISTOx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////
}

function drawMoonsWShadow(y, h) {
    /* Draw the moons with a trailing shadow

    Same as drawMoonsInit(y, h), but draws the previous timestep as a black outline

    (If you're an enterprising young JS developer, you could probably make this code much cleaner)

    Inputs: // These are vague... I did this a long time ago
    y - vertical offset of the moons orbit
    h - height of Jupiter

    */
    var dispY = y + h / 2;

    JupiterWidth = 105 / SCALE;

    //////// Io ////////
    // Shadow
    context.strokeStyle = 'black';
    context.beginPath();
    context.lineWidth = 2.5;
    if ((IOx > (canvas.width / 2 - JupiterWidth) && IOx < (canvas.width / 2 + JupiterWidth)) && (IOy > 0)) {
        // do nothing if the moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.moveTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
        } else {
            context.arc(IOx, dispY + 2, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }

    // Io itself
    context.strokeStyle = 'orange';
    context.beginPath();
    context.lineWidth = 2.5;
    var I = calcIoPos(JupiterWidth);
    IOx = I[0];
    IOy = I[1];
    if ((IOx > (canvas.width / 2 - JupiterWidth) && IOx < (canvas.width / 2 + JupiterWidth)) && (IOy > 0)) {
        // do nothing if the moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY + 4*2.5/3 + 1);
            context.moveTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx - 2.5, dispY - 4*2.5/3 + 1);
            context.lineTo(IOx + 2.5, dispY + 4*2.5/3 + 1);
        } else {
            context.arc(IOx, dispY + 2, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Europa ////////
    // Shadow
    context.strokeStyle = 'black';
    context.beginPath();
    context.lineWidth = 2.5;
    if ((EUROPAx > (canvas.width / 2 - JupiterWidth) && EUROPAx < (canvas.width / 2 + JupiterWidth)) && (EUROPAy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(EUROPAx - 1, dispY + 1);
            context.lineTo(EUROPAx, dispY + 2);
            context.lineTo(EUROPAx + 1, dispY + 1);
            context.lineTo(EUROPAx, dispY);
            context.closePath();
        } else {
            context.arc(EUROPAx, dispY - 1, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }

    // Europa itself
    context.strokeStyle = 'red';
    context.beginPath();
    context.lineWidth = 2.5;
    var E = calcEuropaPos(JupiterWidth);
    EUROPAx = E[0];
    EUROPAy = E[1];
    if ((EUROPAx > (canvas.width / 2 - JupiterWidth) && EUROPAx < (canvas.width / 2 + JupiterWidth)) && (EUROPAy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(EUROPAx - 1, dispY + 1);
            context.lineTo(EUROPAx, dispY + 2);
            context.lineTo(EUROPAx + 1, dispY + 1);
            context.lineTo(EUROPAx, dispY);
            context.closePath();
        } else {
            context.arc(EUROPAx, dispY - 1, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Ganymede ////////
    // Shadow
    context.strokeStyle = 'black';
    context.beginPath();
    context.lineWidth = 0;
    if ((GANYMEDEx > (canvas.width / 2 - JupiterWidth) && GANYMEDEx < (canvas.width / 2 + JupiterWidth)) && (GANYMEDEy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(GANYMEDEx, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 4);
            context.closePath();
        } else {
            context.arc(GANYMEDEx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }

    // Ganymede itself
    context.strokeStyle = 'green';
    context.beginPath();
    context.lineWidth = 2.5;
    var G = calcGanymedePos(JupiterWidth);
    GANYMEDEx = G[0];
    GANYMEDEy = G[1];
    if ((GANYMEDEx > (canvas.width / 2 - JupiterWidth) && GANYMEDEx < (canvas.width / 2 + JupiterWidth)) && (GANYMEDEy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(GANYMEDEx, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 5);
            context.lineTo(GANYMEDEx + 1, dispY + 4);
            context.closePath();
        } else {
            context.arc(GANYMEDEx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////

    //////// Callisto ////////
    // Shadow
    context.strokeStyle = 'black';
    context.beginPath();
    context.lineWidth = 2.5;
    if ((CALLISTOx > (canvas.width / 2 - JupiterWidth) && CALLISTOx < (canvas.width / 2 + JupiterWidth)) && (CALLISTOy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(CALLISTOx - 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 3);
            context.lineTo(CALLISTOx - 2, dispY + 3);
            context.closePath();
        } else {
            context.arc(CALLISTOx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }

    // Callisto itself
    context.strokeStyle = 'blue';
    context.beginPath();
    context.lineWidth = 2.5;
    var C = calcCallistoPos(JupiterWidth);
    CALLISTOx = C[0];
    CALLISTOy = C[1];
    if ((CALLISTOx > (canvas.width / 2 - JupiterWidth) && CALLISTOx < (canvas.width / 2 + JupiterWidth)) && (CALLISTOy > 0)) {
        // do nothing if moon is behind Jupiter
    } else {
        if (COLOR_BLIND) {
            context.moveTo(CALLISTOx - 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 6);
            context.lineTo(CALLISTOx + 2, dispY + 3);
            context.lineTo(CALLISTOx - 2, dispY + 3);
            context.closePath();
        } else {
            context.arc(CALLISTOx, dispY + 5, 0.75, 0, 2 * Math.PI, true);
        }
        context.stroke();
    }
    ////////////////////
}

function Next() {
    /* Set the next timestep in "Timestep" mode

    Clear the clickLocation and potential warning messages

    Find the next image and animate the new frame. Additionally, update the timing in the display

    */
    document.getElementById("warning").style.display = 'none';

    start = start + NUM_ITER;
    if (start > NUMBER_OF_FRAMES) {
        var diff = start % NUMBER_OF_FRAMES;
        start = diff;
    }

    startString = String(start);
    var counter = parseInt(document.getElementById("counter").innerHTML);
    counter     = counter + 1;
    document.getElementById("counter").innerHTML = counter;

    var time_so_far = parseInt(document.getElementById("demo").innerHTML);

    document.getElementById("demo").innerHTML = time_so_far + DESIRED_TIME;

    animate();
}

function next_continuous() {
    /* Set the next timestep in "Continuous" mode

    Clear the potential warning messages

    Find the next image and animate the new frame. Additionally, update the timing in the display

    */
    document.getElementById("warning").innerHTML = ""

    start = start + NUM_ITER;
    if (start > NUMBER_OF_FRAMES) {
        var diff = start % NUMBER_OF_FRAMES;
        start = diff;
    }

    startString = String(start);

    var time_so_far = parseFloat(document.getElementById("demo").innerHTML);

    document.getElementById("demo").innerHTML = (time_so_far + DESIRED_TIME).toFixed(1);

    animate_continuous();
}

function Back() {
    /* Go back to the previous timestep in "Timestep" mode

    Clear the clickLocation 

    Find the previous image and animate the new frame. Additionally, update the timing in the display

    If you go back to 0 hours, do not update the position!

    */
    document.getElementById("clickLocation").innerHTML = "";

    var time_so_far = parseInt(document.getElementById("demo").innerHTML);
    if ((time_so_far - DESIRED_TIME) <= 0) {
        // Do not allow the user to go less than 0 hours
        // Display warning message if they do this!
        start = 0;
        startString = String(start);
        if (!BLINKING) {
            blinkInterval = setInterval(function() {
                flashtext('warning', 'red');
                flashbackground('warning', 'white');
            }, 750 );
            BLINKING = true;
        }
        document.getElementById("demo").innerHTML = 0;
        document.getElementById("warning").style.display = "block";
    } else {
        document.getElementById("demo").innerHTML = time_so_far - DESIRED_TIME;
        if (start - NUM_ITER < 0) {
            var diff = Math.abs(start - NUM_ITER);
            start    = NUMBER_OF_FRAMES - (diff % NUMBER_OF_FRAMES);
        } else {
            start = start - NUM_ITER;
        }

        startString = String(start);
    }

    animate();
}

var interval_tracker = "";
var fps = 24;
function startContinuousAnimation() {
    /* Create continuous animation

    Note that this is throttled to 24 fps, you can make this go faster by changing fps 
    */
    interval_tracker = setInterval(function () { //throttle requestAnimationFrame 
        requestAnimationFrame(next_continuous);
    }, 1000 / fps)
}

function stopContinuousAnimation() {
    /* Stop the continuous animation

    Just clears the animation Object
    */
    window.clearInterval(interval_tracker);
}

function blinker() {
    warningElement = document.getElementById('warning')
    warningElement.style.display = warningElement.style.display == 'block' ? 'none' : 'block';
}