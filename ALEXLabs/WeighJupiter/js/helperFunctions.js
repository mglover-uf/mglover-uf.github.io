// Created by Alex Garcia, 2022-23
// ALEX Labs

function changeTiming() {
    /* Change timestep in "Timestep" mode

    */
    NUM_ITER = Math.round(DESIRED_TIME / TIME_PER_FRAME);
}

function changeScale() {
    /* Change scale of image (zoom in or out centered on Jupiter)

    */
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    animate();
}

function calcIoPos(JW) {
    /* Calculate the position of Io

    All calculations done in terms of Jupiter radii (pixels)

    Inputs:
    JW - Jupiter width, changes with scale of image

    Outputs:
    array - contains x, y positions of Io
    */
    var time          = parseInt(document.getElementById("demo").innerHTML); // current time of animation
    IO_PERIOD         = 42;                                                  // hours
    IO_A_TO_JUPITER_R = 5.898;                                               // ratio of jupiter radius to orbit of moon

    a = (JW * IO_A_TO_JUPITER_R);

    var canvasXcenter = canvas.width / 2

    x = a * Math.cos((2 * Math.PI) * time / IO_PERIOD + 7 * Math.PI / 4) + canvasXcenter;
    y = a * Math.sin((2 * Math.PI) * time / IO_PERIOD + 7 * Math.PI / 4);
    return [x, y];
}
function calcEuropaPos(JW) {
    /* Calculate the position of Europa

    All calculations done in terms of Jupiter radii (pixels)

    Inputs:
    JW - Jupiter width, changes with scale of image

    Outputs:
    array - contains x, y positions of Europa
    */
    var time              = parseInt(document.getElementById("demo").innerHTML); // curent time of animation
    EUROPA_PERIOD         = 85;                                                  // hours
    EUROPA_A_TO_JUPITER_R = 9.384;                                               // ratio of jupiter radius to orbit of moon

    a = (JW * EUROPA_A_TO_JUPITER_R);

    var canvasXcenter = canvas.width / 2

    x = a * Math.cos((2 * Math.PI) * time / EUROPA_PERIOD + 2 * Math.PI / 3) + canvasXcenter;
    y = a * Math.sin((2 * Math.PI) * time / EUROPA_PERIOD + 2 * Math.PI / 3);
    return [x, y];
}
function calcGanymedePos(JW) {
    /* Calculate the position of Ganymede

    All calculations done in terms of Jupiter radii (pixels)

    Inputs:
    JW - Jupiter width, changes with scale of image

    Outputs:
    array - contains x, y positions of Ganymede
    */
    var time                = parseInt(document.getElementById("demo").innerHTML); // current time of animation
    GANYMEDE_PERIOD         = 172;                                                 // hours
    GANYMEDE_A_TO_JUPITER_R = 14.972;                                              // ratio of jupiter radius to orbit of moon

    a = (JW * GANYMEDE_A_TO_JUPITER_R);

    var canvasXcenter = canvas.width / 2

    x = a * Math.cos((2 * Math.PI) * time / GANYMEDE_PERIOD + Math.PI / 3) + canvasXcenter;
    y = a * Math.sin((2 * Math.PI) * time / GANYMEDE_PERIOD + Math.PI / 3);
    return [x, y];
}
function calcCallistoPos(JW) {
    /* Calculate the position of Callisto

    All calculations done in terms of Jupiter radii (pixels)

    Inputs:
    JW - Jupiter width, changes with scale of image

    Outputs:
    array - contains x, y positions of Callisto
    */
    var time                = parseInt(document.getElementById("demo").innerHTML); // current time of animation
    CALLISTO_PERIOD         = 400;                                                 // hours
    CALLISTO_A_TO_JUPITER_R = 26.334;                                              // ratio of jupiter radius to orbit of moon

    a = (JW * CALLISTO_A_TO_JUPITER_R);

    var canvasXcenter = canvas.width / 2

    x = a * Math.cos((2 * Math.PI) * time / CALLISTO_PERIOD) + canvasXcenter;
    y = a * Math.sin((2 * Math.PI) * time / CALLISTO_PERIOD);
    return [x, y];
}

function whichIsWhich() {
    /* Displays modal showing which moon is which

    */
    document.getElementById("myModal").style.display = "block";
}

window.onclick = function (event) {
    /* Clicking off the modal closes the modal

    */
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none"
    }
}

function colorBlindToggle() {
    /* Toggle colorblind mode

    */
    COLOR_BLIND = COLOR_BLIND == true ? false : true;
    flipVisibility(document.getElementById('IOLabel'));
    flipVisibility(document.getElementById('EUROPALabel'));
    flipVisibility(document.getElementById('GANYMEDELabel'));
    flipVisibility(document.getElementById('CALLISTOLabel'));
    animate();
}

function flipVisibility(element) {
    /* Change whether or not you can see and element

    */
    element.style.display = element.style.display == "none" ? "block" : "none";
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