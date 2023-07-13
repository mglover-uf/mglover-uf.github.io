// Created by Alex Garcia, 2022-23
// ALEX Labs

function random(min, max) {
    /* Generate a random number within some range

    Inputs:
    min - minimum of range
    max - maximum of range

    Outputs:
    float - random number
    */
    return Math.random() * (max - min) + min;
}

function generateGaussian(mean, std) {
    /* Draw a single number from a gaussian distribution

    Inputs:
    mean - mean of Gaussian
    std  - standard deviation of Gaussian

    Outputs:
    float - number drawn from Gaussian distribution
    */
    var _2PI = Math.PI * 2;
    var u1   = Math.random();
    var u2   = Math.random();

    var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
    var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

    return z1 * std + mean;
}

function wavelengtheVConverter(energy) {
    /* Convert energy in electron volts to wavelength in nanometers

    Inputs:
    energy - assumed in eV

    Outputs:
    int - wavelength in nm
    */
    h = 6.626e-34;
    c = 3e8;
    joules = energy * 1.602e-19;
    wavelength = parseInt((h * c) / (joules) * 1e9);
    return wavelength;
}

function sleep(milliseconds) {
    /* Makes the system pause for a certain amount of time

    Inputs:
    milliseconds - number of millisections you want the system to pause
    */
    var start = new Date().getTime();

    for (var i = 0; i < 1e7; i++) {
        if ( (new Date().getTime() - start) > milliseconds ) {
            break;
        }
    }
}
