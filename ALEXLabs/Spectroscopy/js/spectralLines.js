// Created by Alex Garcia, 2022-23
// ALEX Labs

function start() {
    /* On button press make the element visible and generate the chart
    */
    document.getElementById("hidden1").style.display = "block";
    for (var i = 0; i < wavelengths.length; ++i) {
        var WL = wavelengths[i];
        WLChecker(WL, Lines);
    }
    plot("myPlot");
}

function plot(which) {
    /* Create a plot with all of the lines generated

    Inputs:
    which - which element to populate with the chart
    */
    for (var i = 0; i < WLlength; ++i) {
        colors[i] = wavelengthToColor(wavelengths[i], counts[i]);
    };
    Plotly.newPlot(which, data, layout, config);
}

function whichLines() {
    /* Used to switch line configurations

    Changes variable `Lines` in place
    */
    var values = Array.from(options).map(({ value }) => value);
    whichLine = String(values);
    Lines = configs[whichLine];
}

function WLChecker(WL, Lines2Omit) {
    /* Check to see if a wavelength is in an array that we omit or not

    Modifies `counts` in place

    Inputs:
    WL - wavelength to check
    Lines2Omit - wavelengths to omit
    */
    let index = wavelengths.indexOf(WL);
    if (Lines2Omit.includes(WL)) {
        counts[index] = 0;
    } else {
        counts[index] = 2;
    }
}

function randomWavelength(min, max) {
    /* Return a random number (corresponding to a wavelength in nm)

    This function also checks to see if the generated wavelength is one of the Fraunhofer lines

    If a line is a Fraunhofer line, regenerate

    Inputs:
    min - minimum number to return
    max - maximum number to return

    Output:
    float - random number between min and max (but not a Fraunhofer line)
    */
    var lambda = parseInt(Math.random() * (max - min) + min);
    if (Lines.includes(lambda)) {
        lambda = randomWavelength(min, max)
    }
    return lambda;
}