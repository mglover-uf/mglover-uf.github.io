// Created by Alex Garcia, 2022-23
// ALEX Labs
// Code taken and modified from: https://scienceprimer.com/javascript-code-convert-light-wavelength-color

function wavelengthToColor(wavelength, counts=2) {
    /* Convert a specific wavelength (in nm) to an actual color

    Inputs:
    wavelength - wavelength in nm
    counts - number of photons detected of that wavelength, important for setting opacity, default is (2/2)

    Outputs:
    String - rgba color
    */
    var r,
        g,
        b,
        alpha,
        colorSpace,
        wl = wavelength,
        gamma = 1;

    if (wl >= 350 && wl < 440) {
        R = -1 * (wl - 440) / (440 - 350);
        G = 0;
        B = 1;
    } else if (wl >= 440 && wl < 490) {
        R = 0;
        G = (wl - 440) / (490 - 440);
        B = 1;
    } else if (wl >= 490 && wl < 510) {
        R = 0;
        G = 1;
        B = -1 * (wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
        R = (wl - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (wl >= 580 && wl < 645) {
        R = 1;
        G = -1 * (wl - 645) / (645 - 580);
        B = 0.0;
    } else if (wl >= 645 && wl <= 780) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        R = 0;
        G = 0;
        B = 0;
    }


    alpha = 0 + counts / 2;
    colorSpace = "rgba(" + (R * 100) + "%," + (G * 100) + "%," + (B * 100) + "%, " + alpha + ")"; 

    return colorSpace;
}

function wavelengthToColorAlpha(wavelength) {
    /* Convert a specific wavelength (in nm) to an actual color, scales opacity of the color based on its wavelength

    Inputs:
    wavelength - wavelength in nm

    Outputs:
    String - rgba color
    */
    var r,
        g,
        b,
        alpha,
        colorSpace,
        wl = wavelength,
        gamma = 1;


    if (wl >= 350 && wl < 440) {
        R = -1 * (wl - 440) / (440 - 350);
        G = 0;
        B = 1;
    } else if (wl >= 440 && wl < 490) {
        R = 0;
        G = (wl - 440) / (490 - 440);
        B = 1;
    } else if (wl >= 490 && wl < 510) {
        R = 0;
        G = 1;
        B = -1 * (wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
        R = (wl - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (wl >= 580 && wl < 645) {
        R = 1;
        G = -1 * (wl - 645) / (645 - 580);
        B = 0.0;
    } else if (wl >= 645 && wl <= 780) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        R = 0;
        G = 0;
        B = 0;
    }

    // intensty is lower at the edges of the visible spectrum.
    if (wl > 780 || wl < 350) {
        alpha = 0;
    } else if (wl > 700) {
        alpha = (780 - wl) / (780 - 700);
    } else if (wl < 420) {
        alpha = (wl - 350) / (420 - 350);
    } else {
        alpha = 1;
    }

    colorSpace = "rgba(" + (R * 100) + "%," + (G * 100) + "%," + (B * 100) + "%, " + alpha + ")"; 

    return colorSpace;

}