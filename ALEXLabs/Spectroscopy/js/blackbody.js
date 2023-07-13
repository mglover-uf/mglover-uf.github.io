// Created by Alex Garcia, 2022-23
// ALEX Labs

// NOTE THAT THIS LAB IS NOW "HOT HOW IS THE SUN?"

function TfromLM(LambdaMax) {
    /* Return a temperature (in Kelvin) given some peak wavelength

    This does not compute the blackbody peak, rather we compare against solar values (assumed T_sun = 5800 K and lambda_max = 500 nm)

    Inputs:
    LambdaMax - maximum wavelength of the blackbody (in nm)

    Outputs:
    float - Temperature (Kelvin) of the blackbody with corresponding peak wavelength
    */
    LambdaMax    = LambdaMax * 1e-9;
    Tsun         = 5800;
    lambdaMaxSun = 500 * 1e-9;
    var constant = Tsun * lambdaMaxSun;
    T            = constant / LambdaMax;
    return T;
}

function planck(p, T, step) {
    /* Generate a Planck spectrum

    Only generates from 100 nm to 1000 nm

    Inputs:
    p - array - where to save the spectrum
    T - temperature of the blackbody (assumed Kelvin)
    step - (unused; not removing for possible dependencies)
    
    Output:
    array - inputted array p, now with full Planck spectrum as a function of wavelength
    */
    var lambda0 = 100e-9;
    var lambdaf = 100e-8;
    var lam     = lambda0;

    step = (lambdaf - lambda0) / 1000;
    
    h = 6.6260701e-34;
    c = 2.9979246e8;
    k = 1.380649e-23;

    for (var i = 0; lam < lambdaf - step; ++i) {
        lam    = lam + step;
        exp    = h * c / (lam * k * T);
        factor = 2 * h * c ** 2 / (lam ** 5);

        p[i]      = factor / (Math.pow(Math.E, exp) - 1);
        lamArr[i] = lam.toPrecision(4);
        colors[i] = wavelengthToColorAlpha(lam * 1e9);
    }
    return p;
}

function pNorm(p, norm=1) {
    /* Given an array, normalize it to its maximum value and scale

    First, loop over array and find max, then divide each element by the max (likely not the most efficient way to do this)

    Input:
    p - array containing planck spectrum
    norm - scale the maximum value of your normalized spectrum (default 1)

    Output:
    array - array containing normalized and scaled planck spectrum
    */

    var pMax = 0;

    for (var i = 0; i < 1000; ++i) {
        if (p[i] > pMax) {
            pMax = p[i];
        }
    }
    for (var i = 0; i < 1000; ++i) {
        p[i] = p[i] * norm / pMax;
    }
    return p;
}

function pNoise(p, scale=0.925) {
    /* Given an already normalized array, return an array that is scaled down and has noise

    Inputs:
    p - array containing normalized planck spectrum
    scale - decrease the maximum planck by this value

    Outputs:
    array - array containing scaled planck spectrum with noise
    */
    for (var i = 0; i < 1000; ++i) {
        var toCheck = p[i] * scale - generateGaussian(0, 0.25);
        if (toCheck < 0) {
            toCheck = toCheck*-1;
        }
        p[i] = toCheck;
    }
    return p;
}

function addAbsorptionLine(p) {
    /* Add absorption lines to normalized, noisy Planck spectrum

    Inputs:
    p - array containing normalized, noisy planck spectrum
    */
    // Fraunofer lines
    var lines = [393e-9, 397e-9, 410e-9, 423e-9, 431e-9, 434e-9, 486e-9, 517e-9, 527e-9, 590e-9, 656e-9, 686e-9];
    for (var i = 0; i < lines.length; ++i) {
        for (var j = 0; j < lamArr.length; ++j) {
            diff = Math.abs(lines[i] - lamArr[j])
            if (diff == 0) {
                // Emperically derived
                p[j] = p[j] * 0.75;
            } else if (diff < 4e-9) {
                // Emperically derived
                p[j] = p[j] * Math.abs(1 - (Math.abs(4 - diff * 1e9) / 12));
            }
        }
    }
}

function changeTemp() {
    /* Pull the temperature from the slider and update the plot
    */
    LambdaMax = parseInt(document.getElementById("MaxLambda").value);

    temperatureCurve = planck(temperatureCurve, parseInt(output.innerHTML), 0.1e-9);
    temperatureCurve = pNorm(temperatureCurve, 10);

    // Orange Planck Curve
    var trace1 = {
        x: lamArr,
        y: temperatureCurve,
        marker: { color: 'orange' },
        type: 'scatter',
        showlegend: false
    }
    // Colored Planck Curve
    var trace3 = {
        x: lamArr,
        y: wavelengthCurve,
        marker: { color: colors },
        type: 'bar',
        showlegend: false,
        bargap: 0
    }

    var data = [trace1, trace3]
    Plotly.newPlot("myPlot", data, layout, config);
}

function plot() {
    /* Pull the temperature from the slider and plot it 
    */
    LambdaMax = parseInt(document.getElementById("MaxLambda").value);

    temperatureCurve = planck(temperatureCurve, parseInt(output.innerHTML), 0.1e-9);
    temperatureCurve = pNorm(temperatureCurve, 10);

    T = TfromLM(LambdaMax);

    wavelengthCurve = planck(wavelengthCurve, T, 1e-10);
    wavelengthCurve = pNorm(wavelengthCurve, 10);
    wavelengthCurve = pNoise(wavelengthCurve);

    addAbsorptionLine(wavelengthCurve);

    newlamArr = lamArr * 1e9

    // Orange Planck Curve
    var trace1 = {
        x: lamArr,
        y: temperatureCurve,
        marker: { color: 'orange' },
        type: 'scatter',
        showlegend: false
    }
    // Colored Planck Histogram
    var trace3 = {
        x: lamArr,
        y: wavelengthCurve,
        marker: { color: colors },
        type: 'bar',
        showlegend: false,
        bargap: 0
    }

    var data = [trace1, trace3]
    Plotly.newPlot("myPlot", data, layout, config);
}
