// Created by Alex Garcia, 2022-23
// ALEX Labs

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

function generateGaussian(mean, std) {
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

function wavelengtheVConverter(energy) {
    /* Convert an energy in eV to a wavelength in nm

    Inputs:
    energy - in eV

    Output:
    float - wavelength in nm
    */
    h = 6.626e-34;
    c = 3e8;

    joules     = energy * 1.602e-19;
    wavelength = parseInt((h * c) / (joules) * 1e9);

    return wavelength;
}

function sleep(milliseconds) {
    /* Pause everything for a certain amount of time

    Inputs:
    milliseconds - time to pause for
    */
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
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