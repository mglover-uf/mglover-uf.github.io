// Created by Alex Garcia, 2022-23
// ALEX Labs

// Note that this is all depricated, as such documentation is likely lacking

function init() {
    /* Initialize the animation

    */
    animation = window.requestAnimationFrame(draw);
}

function draw() {
    /* Draw the photon path

    */
    number++;
    counter.textContext = number;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const disp = document.getElementById('display');
    document.getElementById("display").innerHTML = number;

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(375, 250, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.arc(375, 250, 150, 0, 2 * Math.PI);
    ctx.stroke();

    var wavelength = parseInt(random(350, 700));
    var color = wavelengthToColor(wavelength);

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (((x - 375) ** 2 + (y - 250) ** 2) ** (1 / 2) < 15) {
        pertx = random(-2.5, 2.5);
        perty = random(-2.5, 2.5);
    } else if (((x - 375) ** 2 + (y - 250) ** 2) ** (1 / 2) < 150) {
        pertx = random(-10, 10);
        perty = random(-10, 10);
    } 

    ctx.lineWidth = 2;
    ctx.lineTo(x + pertx, y + perty);
    ctx.stroke();

    x += pertx;
    y += perty;
    if (((x - 375) ** 2 + (y - 250) ** 2) ** (1 / 2) > 150) {
        document.getElementById("display").innerHTML = number;
        document.getElementById("finish").innerHTML = "The photon entered the atmosphere with wavelength:";
        document.getElementById("WL").innerHTML = String(wavelength) + " nm";
        document.getElementById("WL").style.color = color;

    }
    else {
        animation = window.requestAnimationFrame(draw);
    }
}

function start() {
    /* Button press
    
    Perform the animations
    */
    if (animation) {
        window.cancelAnimationFrame(animation)
    }
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    x = 375;
    y = 250;
    number = 0;
    document.getElementById("display").innerHTML = 0;
    document.getElementById("finish").innerHTML = "";
    document.getElementById("WL").innerHTML = "";
    init();
}